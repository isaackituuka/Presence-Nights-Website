"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Typewriter } from "@/components/ui/typewriter"
import { ChevronDown } from "lucide-react"

/* Stable particle list — computed once, no hydration mismatch */
const PARTICLES = [
  { id: 0,  x: 8,  y: 30, size: 3, dur: 7,  delay: 0,   color: "#E26721" },
  { id: 1,  x: 15, y: 55, size: 2, dur: 9,  delay: 1.2, color: "#F08D28" },
  { id: 2,  x: 22, y: 40, size: 4, dur: 6,  delay: 0.5, color: "#D62A5F" },
  { id: 3,  x: 30, y: 65, size: 2, dur: 11, delay: 2,   color: "#9E1194" },
  { id: 4,  x: 38, y: 25, size: 3, dur: 8,  delay: 0.8, color: "#E26721" },
  { id: 5,  x: 45, y: 70, size: 2, dur: 7,  delay: 3,   color: "#F08D28" },
  { id: 6,  x: 52, y: 45, size: 3, dur: 10, delay: 1.5, color: "#D62A5F" },
  { id: 7,  x: 60, y: 35, size: 2, dur: 9,  delay: 0.3, color: "#E26721" },
  { id: 8,  x: 68, y: 60, size: 4, dur: 6,  delay: 2.5, color: "#9E1194" },
  { id: 9,  x: 75, y: 48, size: 2, dur: 8,  delay: 1,   color: "#F08D28" },
  { id: 10, x: 82, y: 30, size: 3, dur: 12, delay: 0.7, color: "#D62A5F" },
  { id: 11, x: 88, y: 55, size: 2, dur: 7,  delay: 3.5, color: "#E26721" },
  { id: 12, x: 5,  y: 75, size: 3, dur: 9,  delay: 1.8, color: "#9E1194" },
  { id: 13, x: 93, y: 40, size: 2, dur: 8,  delay: 0.4, color: "#F08D28" },
  { id: 14, x: 18, y: 80, size: 3, dur: 6,  delay: 2.2, color: "#E26721" },
  { id: 15, x: 72, y: 20, size: 2, dur: 10, delay: 1.1, color: "#D62A5F" },
]

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            bottom: `${p.y - 20}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -90 - p.id * 3],
            opacity: [0, 0.9, 0.5, 0],
            scale: [0.3, 1.2, 0.8, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  const opacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 0])

  return (
    <section id="home" ref={ref} className="relative h-screen w-full overflow-hidden" style={{ contain: "paint" }}>
      {/* Parallax background — video with poster fallback (no layout swap) */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imageY, willChange: "transform" }}>
        <video
          src="/video/hero-bg.mp4"
          poster="/hero-bg.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ cursor: "default", transform: "translateZ(0)", willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/55 to-[#0C070A]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C070A]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C070A]/40 via-transparent to-[#0C070A]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,7,10,0.65)_100%)]" />
      </motion.div>

      {/* Particles */}
      <ParticleField />

      {/* Ground glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-48 bg-[#E26721]/6 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-1/3 h-32 bg-[#D62A5F]/5 blur-[60px] rounded-full pointer-events-none" />

      {/* Content — uses CSS animations, NOT framer-motion animate */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4"
        style={{ y: contentY, opacity, willChange: "transform, opacity" }}
      >
        {/* PN logo badge — CSS animated */}
        <div className="hero-logo-anim mb-8">
          <div className="relative w-16 h-16 rounded-full border border-[#E26721]/40 flex items-center justify-center animate-pulse-glow">
            <span
              className="text-[#E26721] text-lg font-bold text-glow-orange"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PN
            </span>
            <div className="absolute inset-[-6px] rounded-full border border-dashed border-[#E26721]/20 animate-spin-slow" />
          </div>
        </div>

        {/* PRESENCE */}
        <h1
          aria-label="Presence Nights Tulsa"
          className="mb-3 font-bold text-[#EBE6E2] tracking-[-0.02em] leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 13vw, 10rem)",
          }}
        >
          <span className="block overflow-hidden mb-1">
            <span className="hero-title-1 block">PRESENCE</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-title-2 block">NIGHTS</span>
          </span>
        </h1>

        {/* TULSA */}
        <div className="hero-tulsa flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E26721]" />
          <span
            className="text-[#E26721] tracking-[0.5em] text-sm md:text-base uppercase text-glow-orange"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            TULSA
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#E26721]" />
        </div>

        <p
          className="hero-fade-in mb-5 max-w-xl text-sm md:text-base text-[#EBE6E2]/82 leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Young adults in Tulsa gathering every last Friday for worship, prayer,
          community, and His presence.
        </p>

        {/* Typewriter */}
        <div
          className="hero-typewriter text-base md:text-lg text-[#8A8280] max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Typewriter
            text={[
              "His Presence Changes Everything",
              "His Presence Changes Us",
              "Every last Friday of the month",
              "We gather to worship and be changed by His presence",
              "Young adults burning for HIS PRESENCE.",
            ]}
            speed={55}
            waitTime={2200}
            deleteSpeed={28}
            cursorChar="_"
            cursorClassName="text-[#E26721] ml-0.5"
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[#8A8280]/60 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Scroll
        </span>
        <div className="animate-bounce-down">
          <ChevronDown className="w-4 h-4 text-[#E26721]/70" />
        </div>
      </div>
    </section>
  )
}
