"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"

type Glimpse = { src: string; caption: string; year: string }

const glimpses: Glimpse[] = [
  { src: "/curated/glimpses/7N2A1794.jpg", caption: "If my people, who are called by my name.", year: "ACTIVATE 2025" },
  { src: "/curated/glimpses/7N2A0151.jpg", caption: "Will humble themselves and pray, and seek my face.", year: "DAY 1" },
  { src: "/curated/glimpses/IMG_4570.JPG", caption: "And turn from their wicked ways.", year: "DAY 1" },
  { src: "/curated/glimpses/7N2A0072.jpg", caption: "Then I will hear from heaven.", year: "DAY 2" },
  { src: "/curated/glimpses/7N2A1708.jpg", caption: "And I will forgive their sin.", year: "6-WEEK PATH" },
  { src: "/curated/glimpses/7N2A0647.JPG", caption: "And heal their land.", year: "REVIVAL" },
  { src: "/curated/glimpses/after-prayer.jpg", caption: "We are the generation.", year: "TULSA" },
  { src: "/curated/glimpses/IMG_4569.JPG", caption: "That seeks his face, O God of Jacob.", year: "2025" },
]

function GlimpseLayer({
  g, index, total, scrollYProgress,
}: {
  g: Glimpse
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const seg = 1 / total
  const start = index * seg
  const end = start + seg

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.04, start + 0.03, end - 0.03, end + 0.04],
    [0, 1, 1, 0],
  )
  const scale = useTransform(scrollYProgress, [start - 0.04, end + 0.04], [1.03, 1.0])
  const y = useTransform(scrollYProgress, [start, end], ["-1%", "1%"])

  // Ken Burns drift — slow continuous pan/zoom on top of the scroll-driven scale.
  // Each photo gets a unique direction based on its index for visual variety.
  const dir = index % 4
  const driftX = dir === 0 ? ["-1.5%", "1%", "-1.5%"]
    : dir === 1 ? ["1.5%", "-1%", "1.5%"]
      : dir === 2 ? ["0%", "1.2%", "0%"]
        : ["0%", "-1.2%", "0%"]
  const driftY = dir < 2 ? ["1%", "-1.2%", "1%"]
    : ["-1%", "1.2%", "-1%"]

  return (
    <motion.div className="absolute inset-0" style={{ opacity, scale, y }}>
      <motion.div
        className="absolute inset-0"
        animate={{ x: driftX, y: driftY }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={g.src} alt={g.caption} fill className="object-cover brightness-[1.08] saturate-[0.92] contrast-[1.04]" sizes="100vw" loading="lazy" />
      </motion.div>
      {/* Cinematic vignette so caption stays legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,7,10,0.0)_0%,rgba(12,7,10,0.52)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/76 via-[#0C070A]/10 to-[#0C070A]/24" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,103,33,0.08),transparent_42%,rgba(214,42,95,0.08))] mix-blend-screen" />
    </motion.div>
  )
}

function GlimpseCaption({
  g, index, total, scrollYProgress,
}: {
  g: Glimpse
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const seg = 1 / total
  const start = index * seg
  const end = start + seg
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.05, end - 0.05, end + 0.02],
    [0, 1, 1, 0],
  )
  const y = useTransform(scrollYProgress, [start, end], ["1.2rem", "-1.2rem"])
  return (
    <motion.div
      className="absolute inset-x-0 bottom-16 md:bottom-20 flex flex-col items-center text-center px-6"
      style={{ opacity, y }}
    >
      <span
        className="text-[#E26721] text-[10px] tracking-[0.5em] uppercase mb-3"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {g.year}
      </span>
      <p
        className="text-2xl md:text-4xl lg:text-5xl italic text-[#EBE6E2] leading-tight tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {g.caption}
      </p>
    </motion.div>
  )
}

function ProgressDots({
  total, scrollYProgress,
}: { total: number; scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute top-20 right-4 md:top-8 md:right-8 z-30 flex flex-col gap-2 pointer-events-none">
      {Array.from({ length: total }).map((_, i) => {
        const seg = 1 / total
        const start = i * seg
        const end = start + seg
        return <Dot key={i} start={start} end={end} scrollYProgress={scrollYProgress} />
      })}
    </div>
  )
}

function Dot({
  start, end, scrollYProgress,
}: { start: number; end: number; scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.02, end - 0.02, end + 0.02],
    [0.18, 1, 1, 0.18],
  )
  const scaleY = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.05, end - 0.05, end + 0.02],
    [0.6, 1, 1, 0.6],
  )
  return (
    <motion.div
      className="w-1 h-5 rounded-full bg-[#E26721]"
      style={{ opacity, scaleY }}
    />
  )
}

export function SceneGlimpses() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <section
      id="glimpses"
      ref={ref}
      className="relative"
      style={{ ["--stage-vh" as string]: "88vh", height: `calc(${glimpses.length} * var(--stage-vh))` }}
      data-scene="glimpses"
      aria-label="Glimpses"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layered photo backdrop — one visible at a time */}
        <div className="absolute inset-0">
          {glimpses.map((g, i) => (
            <GlimpseLayer
              key={i}
              g={g}
              index={i}
              total={glimpses.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Static eyebrow */}
        <div className="absolute top-20 md:top-8 left-4 md:left-8 z-30 pointer-events-none">
          <span
            className="text-[#E26721] text-[10px] tracking-[0.5em]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            05 — GLIMPSES
          </span>
        </div>

        {/* Right-side progress rail */}
        <ProgressDots total={glimpses.length} scrollYProgress={scrollYProgress} />

        {/* Captions, scroll-driven crossfade */}
        {glimpses.map((g, i) => (
          <GlimpseCaption
            key={i}
            g={g}
            index={i}
            total={glimpses.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
