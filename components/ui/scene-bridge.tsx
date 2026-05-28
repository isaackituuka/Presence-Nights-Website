"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function SceneBridge() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Phrase fades in, blooms slightly, then fades out
  const opacity = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], ["1.5em", "0em", "0em", "-1.5em"])
  const blur = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], ["18px", "0px", "0px", "18px"])
  const filter = useTransform(blur, (v) => `blur(${v})`)
  const scale = useTransform(scrollYProgress, [0.05, 0.5, 0.95], [0.92, 1.04, 0.96])

  // Underline grows then collapses
  const lineScale = useTransform(scrollYProgress, [0.2, 0.5, 0.85], [0, 1, 0])

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,103,33,0.08)_0%,transparent_70%)] pointer-events-none"
        style={{ opacity }}
      />
      <motion.div
        className="relative max-w-3xl px-6 md:px-12 text-center"
        style={{ opacity, y, filter, scale }}
      >
        <p
          className="text-[10px] tracking-[0.5em] text-[#8A8280]/70 mb-6 uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          And so —
        </p>
        <p
          className="text-3xl md:text-5xl lg:text-6xl italic leading-snug text-[#EBE6E2]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          we make space{" "}
          <span className="gradient-text-fire not-italic font-semibold">every last Friday</span>
          ,
          <br />
          and we wait <span className="gradient-text-brand not-italic font-semibold">on Him</span>.
        </p>
        <motion.div
          className="mx-auto mt-10 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#E26721]/80 to-transparent"
          style={{ scaleX: lineScale }}
        />
      </motion.div>
    </section>
  )
}
