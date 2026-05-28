"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { motion, useInView } from "framer-motion"
import { Globe2, MapPin } from "lucide-react"
import type { GlobePin, GlobeArc } from "@/components/ui/wireframe-dotted-globe"

const GlobeCanvas = dynamic(() => import("@/components/ui/wireframe-dotted-globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-[#E26721]/40 animate-pulse-glow" />
    </div>
  ),
})

const PINS: GlobePin[] = [
  { name: "Tulsa, OK",     lat: 36.15,  lng: -95.99, src: "/curated/globe/pin-tulsa.jpg" },
  { name: "Congo",         lat: -2.88,  lng: 23.66,  src: "/curated/main/conviction-transform.jpg" },
  { name: "Uganda",        lat: 1.37,   lng: 32.29,  src: "/curated/globe/pin-uganda.jpg" },
  { name: "Kenya",         lat: -0.02,  lng: 37.91,  src: "/curated/globe/pin-kenya.jpg" },
  { name: "Tanzania",      lat: -6.37,  lng: 34.89,  src: "/curated/globe/pin-tanzania.jpg" },
  { name: "Nigeria",       lat: 9.08,   lng: 8.68,   src: "/curated/main/pillar-prayer.jpg" },
  { name: "Angola",        lat: -11.20, lng: 17.87,  src: "/curated/main/pillar-community.jpg" },
  { name: "Brazil",        lat: -14.24, lng: -51.93, src: "/curated/globe/pin-brazil.jpg" },
  { name: "Honduras",      lat: 15.20,  lng: -86.24, src: "/curated/main/we-young-adults.jpg" },
  { name: "Mexico",        lat: 23.63,  lng: -102.55, src: "/curated/glimpses/activated-family.jpg" },
  { name: "Germany",       lat: 51.17,  lng: 10.45,  src: "/curated/globe/pin-germany.jpg" },
  { name: "India",         lat: 20.59,  lng: 78.96,  src: "/curated/globe/pin-india.jpg" },
  { name: "South Africa",  lat: -30.56, lng: 22.94,  src: "/curated/globe/pin-south-africa.jpg" },
  { name: "Oman",          lat: 21.47,  lng: 55.98,  src: "/curated/main/we-burning-prayer.jpg" },
  { name: "England",       lat: 52.36,  lng: -1.17,  src: "/curated/globe/pin-uk.jpg" },
  { name: "Ghana",         lat: 7.95,   lng: -1.02,  src: "/curated/main/conviction-community.jpg" },
  { name: "Burkina Faso",  lat: 12.24,  lng: -1.56,  src: "/curated/main/conviction-praise.jpg" },
  { name: "Liberia",       lat: 6.43,   lng: -9.43,  src: "/curated/main/pillar-growth.jpg" },
  { name: "China",         lat: 35.86,  lng: 104.20, src: "/curated/main/we-fall-love.jpg" },
  { name: "Singapore",     lat: 1.35,   lng: 103.82, src: "/curated/main/we-generation-worship.jpg" },
  { name: "Canada",        lat: 56.13,  lng: -106.35, src: "/curated/globe/pin-canada.jpg" },
]

const highlights = [
  { region: "East Africa",    countries: "Uganda · Kenya · Tanzania"                },
  { region: "West Africa",    countries: "Nigeria · Ghana · Burkina Faso · Liberia" },
  { region: "Central Africa", countries: "Congo · Angola"                           },
  { region: "Americas",       countries: "Tulsa, OK · Canada · Mexico · Brazil · Honduras" },
  { region: "Europe",         countries: "Germany · England"                        },
  { region: "Asia + South",   countries: "India · China · Singapore · Oman · South Africa" },
]

// Real pin-to-pin great-circle arcs from the Tulsa hub.
// Drawn inside the canvas so they follow rotation + clip to the visible side.
const ARCS: GlobeArc[] = [
  { from: "Tulsa, OK", to: "Congo",        dur: 5.8, delay: 0.0 },
  { from: "Tulsa, OK", to: "Uganda",       dur: 5.6, delay: 0.35 },
  { from: "Tulsa, OK", to: "Kenya",        dur: 5.4, delay: 0.7 },
  { from: "Tulsa, OK", to: "Tanzania",     dur: 5.7, delay: 1.05 },
  { from: "Tulsa, OK", to: "Nigeria",      dur: 5.2, delay: 1.4 },
  { from: "Tulsa, OK", to: "Angola",       dur: 5.9, delay: 1.75 },
  { from: "Tulsa, OK", to: "Brazil",       dur: 5.0, delay: 2.1 },
  { from: "Tulsa, OK", to: "Honduras",     dur: 4.2, delay: 2.45 },
  { from: "Tulsa, OK", to: "Mexico",       dur: 4.1, delay: 2.65 },
  { from: "Tulsa, OK", to: "Germany",      dur: 4.7, delay: 2.8 },
  { from: "Tulsa, OK", to: "India",        dur: 6.1, delay: 3.15 },
  { from: "Tulsa, OK", to: "South Africa", dur: 5.8, delay: 3.5 },
  { from: "Tulsa, OK", to: "Oman",         dur: 5.9, delay: 3.85 },
  { from: "Tulsa, OK", to: "England",      dur: 4.5, delay: 4.2 },
  { from: "Tulsa, OK", to: "Ghana",        dur: 5.1, delay: 4.55 },
  { from: "Tulsa, OK", to: "Burkina Faso", dur: 5.2, delay: 4.9 },
  { from: "Tulsa, OK", to: "Liberia",      dur: 5.0, delay: 5.25 },
  { from: "Tulsa, OK", to: "China",        dur: 6.2, delay: 5.6 },
  { from: "Tulsa, OK", to: "Singapore",    dur: 6.5, delay: 5.95 },
  { from: "Tulsa, OK", to: "Canada",       dur: 4.0, delay: 6.3 },
]

export function GlobeSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [globeSize, setGlobeSize] = useState(480)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      // Mobile: fit padding + a small margin so it doesn't kiss edges.
      // Desktop: stay at the design's max ~480px.
      const target = w < 768 ? Math.min(w - 56, 360) : 480
      setGlobeSize(Math.max(260, target))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(158,17,148,0.05)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 divider-gradient opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Pulsing aura behind globe */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,103,33,0.18)_0%,transparent_70%)] blur-2xl"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Slow magenta secondary aura */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(158,17,148,0.12)_0%,transparent_60%)] blur-3xl"
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [1.05, 0.95, 1.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <div className="relative aspect-square mx-auto" style={{ width: globeSize, height: globeSize }}>
              <GlobeCanvas
                width={globeSize}
                height={globeSize}
                className="relative z-10 w-full h-full"
                pins={PINS}
                arcs={ARCS}
              />
            </div>

            <motion.p
              className="text-center text-[#8A8280]/50 text-xs mt-4 tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              Drag to explore
            </motion.p>
          </motion.div>

          {/* Text */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="w-8 h-8 rounded-full bg-[#9E1194]/20 flex items-center justify-center">
                <Globe2 size={14} className="text-[#9E1194]" />
              </div>
              <span className="text-[#9E1194] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                A Global Movement
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#EBE6E2] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 40, letterSpacing: "0.04em" }}
              animate={inView ? { opacity: 1, y: 0, letterSpacing: "0em" } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Connecting a Generation{" "}
              <motion.span
                className="gradient-text-brand inline-block"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Across the Earth
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-[#8A8280] leading-relaxed mb-10 text-base md:text-lg"
              style={{ fontFamily: "var(--font-sans)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Presence Nights is not confined to Tulsa. Young adults from every nation, tribe, and
              tongue are burning for the same thing — His Presence.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.region}
                  className="glass rounded-xl p-3 border border-[rgba(255,255,255,0.05)] hover:border-[#E26721]/40 hover:scale-[1.04] transition-all duration-300"
                  initial={{ opacity: 0, y: 30, rotateX: -25, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 600 }}
                >
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-[#E26721] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[#EBE6E2] text-xs font-semibold mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                        {h.region}
                      </div>
                      <div className="text-[#8A8280] text-xs leading-snug" style={{ fontFamily: "var(--font-sans)" }}>
                        {h.countries}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 divider-gradient opacity-20" />
    </section>
  )
}
