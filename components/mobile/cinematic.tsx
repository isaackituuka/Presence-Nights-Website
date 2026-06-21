"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

/* Shared mobile cinematic primitives. */

export type MarqueeItem = {
  src: string
  caption?: string
  year?: string
}

/**
 * Drift engine — auto-scrolls a horizontal-overflow element continuously
 * while leaving it fully swipeable by hand. rAF nudges scrollLeft forward;
 * touch / drag / wheel pauses the drift and it resumes a moment after you
 * let go. Content must be duplicated (rendered twice) so the seamless loop
 * works — we wrap scrollLeft by exactly one copy's width. Honors
 * prefers-reduced-motion (no auto-drift; still swipeable).
 */
function useDrift(ref: React.RefObject<HTMLDivElement | null>, speed: number) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let paused = false
    let resumeTimer: ReturnType<typeof setTimeout> | undefined

    const pause = () => {
      paused = true
      if (resumeTimer) clearTimeout(resumeTimer)
    }
    const resumeSoon = () => {
      if (resumeTimer) clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => { paused = false }, 1600)
    }

    el.addEventListener("pointerdown", pause)
    el.addEventListener("pointerup", resumeSoon)
    el.addEventListener("pointercancel", resumeSoon)
    el.addEventListener("touchstart", pause, { passive: true })
    el.addEventListener("touchend", resumeSoon, { passive: true })
    el.addEventListener("wheel", () => { pause(); resumeSoon() }, { passive: true })

    const tick = () => {
      const half = el.scrollWidth / 2
      if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half
      if (!paused && half > 0) el.scrollLeft += speed
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      if (resumeTimer) clearTimeout(resumeTimer)
      el.removeEventListener("pointerdown", pause)
      el.removeEventListener("pointerup", resumeSoon)
      el.removeEventListener("pointercancel", resumeSoon)
      el.removeEventListener("touchstart", pause)
      el.removeEventListener("touchend", resumeSoon)
    }
  }, [ref, speed])
}

/** Generic auto-drifting + swipeable row. Pass already-duplicated children. */
export function DriftRow({
  children,
  speed = 0.4,
  className = "",
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useDrift(ref, speed)
  return (
    <div ref={ref} className={`sd-drift sd-marquee-mask flex gap-4 pl-4 pr-4 pb-2 ${className}`}>
      {children}
    </div>
  )
}

/** Image/scripture drift gallery built on the same engine. */
export function MarqueeGallery({
  items,
  speed = 0.45,
}: {
  items: MarqueeItem[]
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useDrift(ref, speed)

  const track = [...items, ...items]
  return (
    <div ref={ref} className="sd-drift sd-marquee-mask flex gap-4 pl-4 pr-4 pb-2" aria-label="Gallery">
      {track.map((it, i) => (
        <figure
          key={i}
          className="relative m-0 flex-shrink-0 w-[66vw] max-w-[290px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#EBE6E2]/8"
          style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.5)" }}
        >
          <Image
            src={it.src}
            alt={it.caption ?? ""}
            fill
            sizes="66vw"
            quality={70}
            loading="lazy"
            className="object-cover pointer-events-none select-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/85 via-transparent to-transparent" />
          {it.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 p-4">
              {it.year && (
                <span
                  className="block text-[9px] tracking-[0.4em] uppercase text-[#E26721] mb-1.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {it.year}
                </span>
              )}
              <span
                className="block text-[#EBE6E2] text-[15px] italic leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {it.caption}
              </span>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

/**
 * Cinematic section bridge — a centered phrase that rises in, holds, then
 * lifts away as you scroll through it (scroll-driven). Falls back to a
 * static centered phrase where scroll timelines aren't supported.
 */
export function Bridge({
  eyebrow,
  children,
}: {
  eyebrow?: string
  children: React.ReactNode
}) {
  return (
    <section className="px-7 py-24 text-center">
      <div className="sd-bridge mx-auto max-w-md">
        {eyebrow && (
          <span
            className="block text-[10px] tracking-[0.5em] uppercase text-[#8A8280] mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {eyebrow}
          </span>
        )}
        <p
          className="text-[1.9rem] leading-[1.25] italic text-[#EBE6E2]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {children}
        </p>
        <span className="sd-bridge-line mt-8 mx-auto block h-px w-32 bg-gradient-to-r from-transparent via-[#E26721] to-transparent" />
      </div>
    </section>
  )
}
