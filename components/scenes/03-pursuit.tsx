"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const pillars = [
  {
    no: "I",
    title: "Prayer",
    italic: "We believe, there's no presence without prayer.",
    verse: '"My house shall be called a house of prayer."',
    cite: "Matthew 21:13",
    photo: "/curated/main/pillar-prayer.jpg",
    color: "#E26721",
  },
  {
    no: "II",
    title: "Worship",
    italic: "We believe that we were created to worship.",
    verse: "He inhabits the praise of His people.",
    cite: "Psalm 22:3",
    photo: "/curated/main/IMG_1827.jpg",
    color: "#D62A5F",
  },
  {
    no: "III",
    title: "Community",
    italic: "We believe that purpose is discovered in community.",
    verse: "Iron sharpens iron.",
    cite: "Proverbs 27:17",
    photo: "/curated/main/pillar-community.jpg",
    color: "#9E1194",
  },
  {
    no: "IV",
    title: "Growth",
    italic: "We believe that he takes us from glory to glory.",
    verse: "But when I grew up, I left those infant ways for good.",
    cite: "1 Corinthians 13:11",
    photo: "/curated/main/7N2A9803.JPG",
    color: "#F08D28",
  },
]

export function ScenePursuit() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Move inner row horizontally. The flex row is `count*100vw` wide, so to shift by
  // one panel (100vw) we apply translateX of (1/count)*100% = 25% per panel.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((pillars.length - 1) / pillars.length) * 100}%`])

  return (
    <section
      id="pillars"
      ref={ref}
      data-scene="pursuit"
      className="relative"
      style={{ ["--stage-vh" as string]: "160vh", height: `calc(${pillars.length} * var(--stage-vh))` }}
      aria-label="The Four Pillars"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Eyebrow + progress (fixed overlay) */}
        <div className="absolute top-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-none">
          <span className="text-[#E26721] text-[10px] tracking-[0.5em]" style={{ fontFamily: "var(--font-mono)" }}>
            02 — THE FOUR PILLARS
          </span>
          <PillarProgress progress={scrollYProgress} count={pillars.length} />
        </div>

        {/* Horizontal row */}
        <motion.div className="flex h-full" style={{ x, width: `${pillars.length * 100}vw` }}>
          {pillars.map((p, i) => (
            <Panel key={p.title} pillar={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PillarProgress({ progress, count }: { progress: ReturnType<typeof useScroll>["scrollYProgress"]; count: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <PillarProgressDot key={i} progress={progress} index={i} count={count} />
      ))}
    </div>
  )
}

function PillarProgressDot({ progress, index, count }: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  index: number
  count: number
}) {
  const segStart = index / count
  const segEnd   = (index + 1) / count
  const opacity = useTransform(progress, [segStart - 0.05, segStart, segEnd - 0.02, segEnd + 0.05], [0.3, 1, 1, 0.3])
  const width   = useTransform(progress, [segStart - 0.05, segStart, segEnd - 0.02, segEnd + 0.05], [16, 32, 32, 16])
  return <motion.div className="h-[2px] rounded-full bg-[#E26721]" style={{ opacity, width }} />
}

function Panel({ pillar, index }: { pillar: (typeof pillars)[0]; index: number }) {
  return (
    <div className="relative w-screen h-full shrink-0 flex items-center justify-center overflow-hidden">
      {/* Photo */}
      <div className="absolute inset-0">
        <Image
          src={pillar.photo}
          alt={pillar.title}
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C070A]/85 via-[#0C070A]/45 to-[#0C070A]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/80 via-transparent to-[#0C070A]/40" />
        <div
          className="absolute inset-0 mix-blend-screen opacity-25 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${pillar.color}, transparent 65%)` }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1100px] w-full px-6 md:px-12 grid lg:grid-cols-[auto_1fr] gap-x-12 gap-y-6 items-end">
        {/* Big roman numeral */}
        <div
          className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[16rem] leading-[0.85] font-bold italic select-none"
          style={{
            fontFamily: "var(--font-display)",
            color: "transparent",
            WebkitTextStroke: `1.5px ${pillar.color}`,
          }}
        >
          {pillar.no}
        </div>

        <div>
          <div
            className="text-[10px] tracking-[0.5em] mb-3"
            style={{ color: pillar.color, fontFamily: "var(--font-mono)" }}
          >
            CORE / 0{index + 1}
          </div>
          <h3
            className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-bold leading-[0.9] tracking-[-0.02em] text-[#EBE6E2]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pillar.title}
          </h3>

          <div className="mt-5 max-w-md">
            <p
              className="text-[#EBE6E2]/85 text-lg md:text-xl italic leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pillar.italic}
            </p>
            <div
              className="mt-5 pt-4 border-t flex items-baseline gap-3 text-[#8A8280]"
              style={{ borderColor: `${pillar.color}40` }}
            >
              <span className="text-xs italic" style={{ fontFamily: "var(--font-display)" }}>
                {pillar.verse}
              </span>
              <span
                className="ml-auto text-[10px] tracking-[0.3em] uppercase shrink-0"
                style={{ color: pillar.color, fontFamily: "var(--font-mono)" }}
              >
                {pillar.cite}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hint to scroll, only on first panel */}
      {index === 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-[#8A8280]"
          style={{ fontFamily: "var(--font-mono)" }}>
          KEEP SCROLLING →
        </div>
      )}
    </div>
  )
}
