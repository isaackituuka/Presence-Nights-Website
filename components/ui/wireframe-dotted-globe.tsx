"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

export interface GlobePin {
  name: string
  lat: number
  lng: number
  src?: string
}

/** Arc connecting two pins by name. Drawn as a great-circle path that
 *  follows the globe rotation, with a glowing packet animating along it. */
export interface GlobeArc {
  from: string
  to: string
  /** seconds for one full packet traversal — defaults to 5 */
  dur?: number
  /** seconds before first packet appears — defaults to 0 */
  delay?: number
}

interface Props {
  width?: number
  height?: number
  className?: string
  pins?: GlobePin[]
  arcs?: GlobeArc[]
}

function inFeaturesCollection(features: d3.GeoPermissibleObjects[], lon: number, lat: number): boolean {
  for (const f of features) {
    if (d3.geoContains(f, [lon, lat])) return true
  }
  return false
}

export default function WireframeDottedGlobe({ width = 500, height = 500, className = "", pins, arcs }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef<[number, number, number]>([0, -20, 0])
  const dragRef = useRef<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 })
  const dotsRef = useRef<[number, number][]>([])
  const timerRef = useRef<d3.Timer | null>(null)
  const [loaded, setLoaded] = useState(false)

  // Use caller-supplied pins or fall back to built-in list
  const PINS: GlobePin[] = pins ?? [
    { name: "Uganda",      lat: 1.37,   lng: 32.29  },
    { name: "Tanzania",    lat: -6.37,  lng: 34.89  },
    { name: "Kenya",       lat: -0.02,  lng: 37.91  },
    { name: "USA",         lat: 37.09,  lng: -95.71 },
    { name: "Canada",      lat: 56.13,  lng: -106.35},
    { name: "Germany",     lat: 51.17,  lng: 10.45  },
    { name: "UK",          lat: 51.51,  lng: -0.13  },
    { name: "Brazil",      lat: -14.24, lng: -51.93 },
    { name: "Australia",   lat: -25.27, lng: 133.78 },
    { name: "India",       lat: 20.59,  lng: 78.96  },
    { name: "Philippines", lat: 12.88,  lng: 121.77 },
    { name: "S. Africa",   lat: -30.56, lng: 22.94  },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return
    const ctx = canvas.getContext("2d")!

    const dpr = window.devicePixelRatio || 1
    canvas.width  = width  * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const projection = d3.geoOrthographic()
      .scale(width * 0.42)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .rotate(rotationRef.current)

    const path = d3.geoPath(projection, ctx)

    // Pre-build per-pin overlay elements so we can mutate them in the draw loop
    const pinEls: HTMLDivElement[] = PINS.map((pin) => {
      const wrap = document.createElement("div")
      wrap.style.cssText = `
        position: absolute; top: 0; left: 0;
        display: flex; flex-direction: column; align-items: center;
        pointer-events: auto; opacity: 0;
        transition: opacity 0.15s;
        will-change: transform, opacity;
        cursor: pointer;
      `
      // avatar ring
      const avatar = document.createElement("div")
      avatar.style.cssText = `
        width: 28px; height: 28px; border-radius: 50%;
        overflow: hidden;
        border: 2px solid #D85325;
        box-shadow: 0 0 10px rgba(216,83,37,0.55);
        background: #000000;
        transition: transform 0.25s ease, box-shadow 0.25s ease, width 0.25s ease, height 0.25s ease;
      `
      if (pin.src) {
        const img = document.createElement("img")
        img.src = pin.src
        img.alt = pin.name
        img.loading = "lazy"
        img.decoding = "async"
        img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;"
        avatar.appendChild(img)
      } else {
        avatar.style.display = "flex"
        avatar.style.alignItems = "center"
        avatar.style.justifyContent = "center"
        const dot = document.createElement("div")
        dot.style.cssText = "width:8px;height:8px;border-radius:50%;background:#D85325;"
        avatar.appendChild(dot)
      }
      // label — appears on hover, hidden by default. Positioned absolutely
      // so it doesn't push the avatar's geographic center off the pin.
      const label = document.createElement("div")
      label.textContent = pin.name
      label.style.cssText = `
        position: absolute;
        top: calc(100% + 6px);
        left: 50%;
        transform: translate(-50%, -4px);
        padding: 3px 10px;
        border-radius: 9999px;
        background: rgba(0,0,0,0.92);
        color: #FFFFED;
        font-size: 10px;
        font-family: monospace;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        white-space: nowrap;
        border: 1px solid rgba(216,83,37,0.55);
        opacity: 0;
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: none;
        box-shadow: 0 6px 20px rgba(216,83,37,0.25);
      `
      wrap.appendChild(avatar)
      wrap.appendChild(label)

      wrap.addEventListener("mouseenter", () => {
        avatar.style.width = "44px"
        avatar.style.height = "44px"
        avatar.style.boxShadow = "0 0 22px rgba(216,83,37,0.85), 0 0 60px rgba(169,192,191,0.4)"
        label.style.opacity = "1"
        label.style.transform = "translate(-50%, 0)"
      })
      wrap.addEventListener("mouseleave", () => {
        avatar.style.width = "28px"
        avatar.style.height = "28px"
        avatar.style.boxShadow = "0 0 10px rgba(216,83,37,0.55)"
        label.style.opacity = "0"
        label.style.transform = "translate(-50%, -4px)"
      })

      overlay.appendChild(wrap)
      return wrap
    })

    // Lookup table for arc endpoints
    const pinByName = new Map(PINS.map((p) => [p.name, p]))
    const drawT0 = performance.now()

    function buildDots(features: d3.GeoPermissibleObjects[]) {
      const pts: [number, number][] = []
      for (let lon = -180; lon <= 180; lon += 2.4) {
        for (let lat = -90; lat <= 90; lat += 2.4) {
          if (inFeaturesCollection(features, lon, lat)) pts.push([lon, lat])
        }
      }
      return pts
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      projection.rotate(rotationRef.current)

      // Ocean
      ctx.beginPath()
      path({ type: "Sphere" })
      ctx.fillStyle = "#030d1a"
      ctx.fill()

      // Graticule
      const graticule = d3.geoGraticule().step([20, 20])()
      ctx.beginPath()
      path(graticule)
      ctx.strokeStyle = "rgba(26,58,92,0.5)"
      ctx.lineWidth = 0.4
      ctx.stroke()

      // Land dots
      for (const [lon, lat] of dotsRef.current) {
        const projected = projection([lon, lat])
        if (!projected) continue
        const [x, y] = projected
        const r = rotationRef.current
        const dlat = (lat * Math.PI) / 180
        const dlon = ((lon + r[0]) * Math.PI) / 180
        if (Math.cos(dlat) * Math.cos(dlon) < 0) continue
        ctx.beginPath()
        ctx.arc(x, y, 1.1, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(58,142,212,0.85)"
        ctx.fill()
      }

      // Sphere border
      ctx.beginPath()
      path({ type: "Sphere" })
      ctx.strokeStyle = "rgba(58,142,212,0.18)"
      ctx.lineWidth = 1
      ctx.stroke()

      // ─── Arcs (great-circle connections that follow rotation) ────────
      if (arcs && arcs.length > 0) {
        const tNow = (performance.now() - drawT0) / 1000

        for (let ai = 0; ai < arcs.length; ai++) {
          const arc = arcs[ai]
          const from = pinByName.get(arc.from)
          const to   = pinByName.get(arc.to)
          if (!from || !to) continue

          const fromLL: [number, number] = [from.lng, from.lat]
          const toLL:   [number, number] = [to.lng,   to.lat]

          // Skip arcs whose midpoint is on the back half — keeps things tidy
          const interp = d3.geoInterpolate(fromLL, toLL)
          const mid = interp(0.5)
          const midProjected = projection(mid)
          if (!midProjected) continue

          // Stroke the great-circle arc. d3 clips to visible side automatically.
          ctx.beginPath()
          path({ type: "LineString", coordinates: [fromLL, toLL] })

          // Soft outer glow
          ctx.strokeStyle = "rgba(216,83,37,0.25)"
          ctx.lineWidth = 3.5
          ctx.lineCap = "round"
          ctx.stroke()

          // Bright inner stroke
          ctx.beginPath()
          path({ type: "LineString", coordinates: [fromLL, toLL] })
          ctx.strokeStyle = "rgba(230,104,57,0.95)"
          ctx.lineWidth = 1.2
          ctx.stroke()

          // Animated packet — position along the arc on a sawtooth.
          const dur   = arc.dur ?? 5
          const delay = arc.delay ?? 0
          const phase = ((tNow - delay) % dur) / dur
          if (phase >= 0) {
            const pos = interp(phase)
            const p = projection(pos)
            if (p) {
              // Visibility check (only draw if on front of sphere)
              const lat = (pos[1] * Math.PI) / 180
              const lon = ((pos[0] + rotationRef.current[0]) * Math.PI) / 180
              if (Math.cos(lat) * Math.cos(lon) >= 0) {
                // Glow
                ctx.beginPath()
                ctx.arc(p[0], p[1], 6, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(216,83,37,0.35)"
                ctx.fill()
                // Core
                ctx.beginPath()
                ctx.arc(p[0], p[1], 2.5, 0, Math.PI * 2)
                ctx.fillStyle = "#F7E0B4"
                ctx.fill()
              }
            }
          }
        }
      }

      // Update avatar overlay positions directly (no React re-render)
      const r = rotationRef.current
      for (let i = 0; i < PINS.length; i++) {
        const pin = PINS[i]
        const el  = pinEls[i]
        const projected = projection([pin.lng, pin.lat])
        if (!projected) { el.style.opacity = "0"; continue }
        const [px, py] = projected
        const plat = (pin.lat * Math.PI) / 180
        const plon = ((pin.lng + r[0]) * Math.PI) / 180
        const pz = Math.cos(plat) * Math.cos(plon)
        if (pz < 0.08) {
          el.style.opacity = "0"
        } else {
          el.style.opacity = "1"
          // Center the avatar exactly on the pin's projected (px, py).
          // The label is absolutely positioned beneath it via CSS, so it
          // doesn't shift the geographic anchor off the country.
          el.style.transform = `translate(calc(${px}px - 50%), calc(${py}px - 50%))`
        }
      }
    }

    const runFrame = () => {
      if (!dragRef.current.active) {
        rotationRef.current = [rotationRef.current[0] + 0.12, rotationRef.current[1], 0]
      }
      draw()
    }

    const startTimer = () => {
      if (timerRef.current) return
      timerRef.current = d3.timer(runFrame)
    }

    const stopTimer = () => {
      timerRef.current?.stop()
      timerRef.current = null
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let inView = true
    let pageVisible = document.visibilityState === "visible"
    const updateTimer = () => {
      if (inView && pageVisible && !motionQuery.matches) {
        startTimer()
      } else {
        stopTimer()
        draw()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        updateTimer()
      },
      { rootMargin: "200px" },
    )
    observer.observe(canvas)

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible"
      updateTimer()
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    motionQuery.addEventListener("change", updateTimer)
    updateTimer()

    fetch("/data/ne_110m_land.json")
      .then((r) => r.json())
      .then((data) => {
        dotsRef.current = buildDots(data.features)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))

    const onMouseDown = (e: MouseEvent) => { dragRef.current = { active: true, x: e.clientX, y: e.clientY } }
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return
      const dx = e.clientX - dragRef.current.x
      const dy = e.clientY - dragRef.current.y
      rotationRef.current = [
        rotationRef.current[0] + dx * 0.3,
        Math.max(-70, Math.min(70, rotationRef.current[1] - dy * 0.3)),
        0,
      ]
      dragRef.current.x = e.clientX
      dragRef.current.y = e.clientY
      draw()
    }
    const onMouseUp = () => { dragRef.current.active = false }

    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      stopTimer()
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      motionQuery.removeEventListener("change", updateTimer)
      pinEls.forEach((el) => el.remove())
      canvas.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <canvas ref={canvasRef} style={{ width, height, cursor: "grab", display: "block" }} />
      {/* Avatar overlay layer — populated imperatively in draw loop */}
      <div ref={overlayRef} className="absolute inset-0" style={{ pointerEvents: "none" }} />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-[#D85325]/40 animate-pulse" />
        </div>
      )}
    </div>
  )
}
