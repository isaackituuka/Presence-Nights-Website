"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"

const beliefs = [
  { no: "01", text: "His Presence is real",   accent: "and can be experienced.",   photo: "/Main Empashis/7N2A0091.jpg" },
  { no: "02", text: "His Presence brings",    accent: "real-life transformation.", photo: "/Main Empashis/7N2A0083.jpg" },
  { no: "03", text: "His Presence sets",      accent: "the captives free.",        photo: "/Main Empashis/7N2A0014.jpg" },
  { no: "04", text: "There is power in",      accent: "intentional, godly community.", photo: "/Main Empashis/7N2A9880.jpg" },
  { no: "05", text: "He inhabits",            accent: "the praise of His people.", photo: "/Main Empashis/7N2A1844.jpg" },
]

function BeliefPhoto({
  belief, index, total, scrollYProgress,
}: {
  belief: (typeof beliefs)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const seg   = 1 / total
  const start = index * seg
  const end   = start + seg
  const opacity = useTransform(scrollYProgress, [start - 0.04, start + 0.02, end - 0.02, end + 0.04], [0, 1, 1, 0])
  const scale   = useTransform(scrollYProgress, [start, end], [1.06, 1.0])
  const x       = useTransform(scrollYProgress, [start, end], ["-2%", "2%"])
  return (
    <motion.div className="absolute inset-0" style={{ opacity, scale, x }}>
      <Image src={belief.photo} alt="" fill className="object-cover" sizes="100vw" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C070A]/95 via-[#0C070A]/70 to-[#0C070A]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/70 via-transparent to-[#0C070A]/30" />
    </motion.div>
  )
}

function BeliefRow({
  belief, index, total, scrollYProgress,
}: {
  belief: (typeof beliefs)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const seg   = 1 / total
  const start = index * seg
  const end   = start + seg
  const opacity = useTransform(scrollYProgress, [start - 0.05, start + 0.04, end - 0.04, end + 0.05], [0.18, 1, 1, 0.18])
  const x       = useTransform(scrollYProgress, [start, end], [0, 12])
  return (
    <motion.li
      className="grid grid-cols-[3.5rem_1fr] gap-4 md:gap-8 items-baseline"
      style={{ opacity, x }}
    >
      <span className="text-[#8A8280]/90 text-xs md:text-sm tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)" }}>
        {belief.no}
      </span>
      <span className="text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.01em] text-[#EBE6E2]" style={{ fontFamily: "var(--font-display)" }}>
        {belief.text}{" "}
        <span className="italic gradient-text-fire">{belief.accent}</span>
      </span>
    </motion.li>
  )
}

export function SceneConvictions() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <section
      id="community"
      ref={ref}
      data-scene="convictions"
      className="relative"
      style={{ ["--stage-vh" as string]: "140vh", height: `calc(${beliefs.length} * var(--stage-vh))` }}
      aria-label="Our Convictions"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Layered photo backdrop — only one belief's photo is fully visible at a time */}
        <div className="absolute inset-0">
          {beliefs.map((b, i) => (
            <BeliefPhoto key={i} belief={b} index={i} total={beliefs.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Static frame */}
        <div className="absolute top-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-none">
          <span className="text-[#D62A5F] text-[10px] tracking-[0.5em]" style={{ fontFamily: "var(--font-mono)" }}>
            03 — OUR CONVICTIONS
          </span>
        </div>

        {/* Static list — items highlight as scroll passes */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="text-[10px] tracking-[0.5em] text-[#8A8280] mb-8" style={{ fontFamily: "var(--font-mono)" }}>
              We believe —
            </div>
            <ol className="space-y-3 md:space-y-4">
              {beliefs.map((b, i) => (
                <BeliefRow key={i} belief={b} index={i} total={beliefs.length} scrollYProgress={scrollYProgress} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
