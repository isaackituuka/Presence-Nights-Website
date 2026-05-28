"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"

type StageStyle = "burst" | "fall" | "split" | "zoom"

const stages: {
  eyebrow: string
  line: string[]
  accent: string
  photo: string
  photoB?: string
  style: StageStyle
}[] = [
    {
      eyebrow: "01 — WHO WE ARE",
      line: ["We", "are", "young", "adults"],
      accent: "young adults",
      photo: "/Main Empashis/7N2A9780.jpg",
      style: "burst",
    },
    {
      eyebrow: "01.1 — THE PURSUIT",
      line: ["burning", "for", "one", "thing"],
      accent: "one thing",
      photo: "/Main Empashis/7N2A1992.jpg",
      style: "fall",
    },
    {
      eyebrow: "01.2 — THE VISION",
      line: ["that", "our", "generation", "would", "fall", "in", "love"],
      accent: "fall in love",
      photo: "/Main Empashis/IMG_6410.jpeg",
      photoB: "/Main Empashis/7N2A9976.jpg",
      style: "split",
    },
    {
      eyebrow: "01.3 — THE NAME",
      line: ["with", "His", "Presence."],
      accent: "His Presence.",
      photo: "/Main Empashis/7N2A0124.jpg",
      style: "zoom",
    },
  ]

function Word({
  word,
  range,
  scrollYProgress,
  highlight,
  style,
  index,
}: {
  word: string
  range: [number, number, number, number, number]
  scrollYProgress: MotionValue<number>
  highlight: boolean
  style: StageStyle
  index: number
}) {
  const startY = style === "fall" ? "-1.4em" : style === "burst" ? "0.7em" : style === "split" ? `${index % 2 === 0 ? "-1em" : "1em"}` : "0.5em"
  const startScale = style === "burst" ? 0.35 : style === "zoom" ? 1.7 : 0.8
  const peakScale = highlight ? 1.4 : style === "burst" ? 1.2 : 1.1
  const dwellScale = highlight ? 1.08 : 1.0
  const startRotate = style === "fall" ? -10 : style === "burst" ? -5 : 0
  const startBlur = style === "zoom" ? "24px" : "14px"

  // range = [enter, peak, dwellStart, dwellEnd, fadeOut]
  const opacity = useTransform(scrollYProgress, range, [0, 1, 1, 1, 0])
  const y = useTransform(scrollYProgress, range, [startY, "0em", "0em", "0em", "-0.2em"])
  const scale = useTransform(scrollYProgress, range, [startScale, peakScale, dwellScale, dwellScale, dwellScale * 0.96])
  const rotate = useTransform(scrollYProgress, range, [startRotate, 0, 0, 0, 0])
  const blur = useTransform(scrollYProgress, range, [startBlur, "0px", "0px", "0px", "2px"])
  const filter = useTransform(blur, (v) => `blur(${v})`)

  return (
    <motion.span
      style={{ opacity, y, scale, rotate, filter, transformOrigin: "50% 100%" }}
      className={`inline-block will-change-transform ${highlight
        ? "italic gradient-text-fire drop-shadow-[0_0_32px_rgba(216,83,37,0.65)]"
        : ""
        }`}
    >
      {word}
    </motion.span>
  )
}

function PhotoLayer({
  stage,
  index,
  total,
  scrollYProgress,
  isFirst = false,
}: {
  stage: (typeof stages)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  isFirst?: boolean
}) {
  const segment = 1 / total
  const stageStart = index * segment
  const stageEnd = stageStart + segment

  // Big in-zoom then subtle push back — feels cinematic
  const scale = useTransform(
    scrollYProgress,
    [stageStart - 0.06, stageStart + segment * 0.5, stageEnd],
    [isFirst ? 1.0 : 1.4, 1.0, 1.1]
  )
  const y = useTransform(scrollYProgress, [stageStart, stageEnd], ["-5%", "5%"])
  // isFirst: start fully visible (no fade-in delay at section entry)
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [stageEnd - segment * 0.06, stageEnd + 0.02]
      : [stageStart - 0.08, stageStart + 0.02, stageEnd - segment * 0.06, stageEnd + 0.02],
    isFirst ? [1, 0] : [0, 1, 1, 0]
  )

  // Flash overlay — skip for isFirst (already visible, no entrance needed)
  const flash = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.001]
      : [stageStart - 0.04, stageStart + 0.02, stageStart + segment * 0.15],
    isFirst ? [0, 0] : [0, 0.7, 0]
  )

  // Split-screen reveal for stage 3 (vision) — slow it down dramatically
  const isSplit = stage.style === "split"
  const topClip = useTransform(
    scrollYProgress,
    [stageStart - 0.04, stageStart + segment * 0.55],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  )
  const bottomClip = useTransform(
    scrollYProgress,
    [stageStart - 0.04, stageStart + segment * 0.55],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  )

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {isSplit && stage.photoB ? (
        <>
          <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: topClip, scale, y }}>
            <Image src={stage.photo} alt="" fill className="object-cover" sizes="100vw" loading="lazy" />
          </motion.div>
          <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: bottomClip, scale, y }}>
            <Image src={stage.photoB} alt="" fill className="object-cover" sizes="100vw" loading="lazy" />
          </motion.div>
          {/* split divider line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#D85325]/70 to-transparent" />
        </>
      ) : (
        <motion.div className="absolute inset-0" style={{ scale, y }}>
          <Image src={stage.photo} alt="" fill className="object-cover" sizes="100vw" loading="lazy" />
        </motion.div>
      )}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/40 to-[#000000]/70" />
      {/* Entrance flash */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          opacity: flash,
          background:
            "radial-gradient(ellipse at center, rgba(216,83,37,0.85) 0%, rgba(169,192,191,0.4) 35%, transparent 70%)",
        }}
      />
    </motion.div>
  )
}

function Stage({
  stage,
  index,
  total,
  scrollYProgress,
}: {
  stage: (typeof stages)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const isFirst = index === 0
  const segment = 1 / total
  const stageStart = index * segment
  const stageEnd = stageStart + segment

  // isFirst: container is already at opacity 1; skip fade-in
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [stageEnd - segment * 0.06, stageEnd + 0.02]
      : [Math.max(0, stageStart - 0.08), stageStart + 0.01, stageEnd - segment * 0.06, stageEnd + 0.02],
    isFirst ? [1, 0] : [0, 1, 1, 0]
  )

  // Headline scale: isFirst starts at 1.0 (already settled), others start compressed
  const headlineScale = useTransform(
    scrollYProgress,
    [stageStart, stageStart + segment * 0.4, stageEnd - segment * 0.15, stageEnd],
    [isFirst ? 1.0 : 0.88, 1.05, 1.0, 0.94]
  )

  // Eyebrow: isFirst starts fully visible; others slide in from left
  const eyebrowX = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.001] : [stageStart - 0.04, stageStart + 0.06],
    isFirst ? [0, 0] : [-50, 0]
  )
  const eyebrowOpacity = useTransform(
    scrollYProgress,
    isFirst
      ? [stageEnd - 0.06, stageEnd]
      : [stageStart - 0.04, stageStart + 0.04, stageEnd - 0.06, stageEnd],
    isFirst ? [1, 0] : [0, 1, 1, 0]
  )
  const eyebrowSpacing = useTransform(
    scrollYProgress,
    [stageStart, stageStart + segment * 0.5],
    ["0.2em", "0.55em"]
  )

  // Word reveals are packed into the FIRST 35% of the segment.
  // After that, words sit at full opacity for ~55% of the segment (long dwell — the user reads),
  // then fade gracefully in the last 10%.
  const wordCount = stage.line.length
  const revealWindow = segment * 0.35
  const dwellEnd = stageEnd - segment * 0.1
  const fadeEnd = stageEnd - segment * 0.01
  const accentIdx = stage.line.findIndex((w) => stage.accent.startsWith(w))

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity }}>
      <PhotoLayer stage={stage} index={index} total={total} scrollYProgress={scrollYProgress} isFirst={isFirst} />

      <div className="relative max-w-[1280px] w-full px-6 md:px-12">
        <motion.div
          className="text-[#D85325] text-[10px] mb-6 md:mb-10"
          style={{
            x: eyebrowX,
            opacity: eyebrowOpacity,
            letterSpacing: eyebrowSpacing,
            fontFamily: "var(--font-mono)",
          }}
        >
          {stage.eyebrow}
        </motion.div>

        <motion.h2
          className="text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] font-bold leading-[0.95] tracking-[-0.02em] text-[#FFFFED]"
          style={{ fontFamily: "var(--font-display)", scale: headlineScale, transformOrigin: "0% 50%" }}
        >
          {stage.line.map((word, i) => {
            // isFirst: words are pre-revealed at section entry; others cascade in
            // isFirst: "We" is already past mid-rise when hero finishes scrolling away, then each
            // word rises in turn over a wider scroll window so the cascade feels deliberate.
            const enter = isFirst ? -0.014 + (i / wordCount) * 0.06 : stageStart + (i / wordCount) * revealWindow
            const peak = isFirst ? enter + 0.026 : enter + (revealWindow / wordCount) * 1.1
            const dwellStart = isFirst ? peak + 0.010 : peak + (revealWindow / wordCount) * 0.4
            const highlight =
              i === accentIdx || (accentIdx !== -1 && i > accentIdx && stage.accent.includes(word))
            return (
              <span key={i}>
                <Word
                  word={word}
                  range={[enter, peak, dwellStart, dwellEnd, fadeEnd]}
                  scrollYProgress={scrollYProgress}
                  highlight={highlight}
                  style={stage.style}
                  index={i}
                />
                {i < stage.line.length - 1 && " "}
              </span>
            )
          })}
        </motion.h2>
      </div>

      {/* Stage progress dots */}
      <div className="absolute top-8 right-8 flex flex-col gap-2 z-20">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-6 rounded-full transition-all duration-500"
            style={{ background: i === index ? "#D85325" : "rgba(255,255,255,0.18)" }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function SceneWeAre() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  return (
    <section
      id="about"
      ref={ref}
      data-scene="we-are"
      className="relative"
      style={{ ["--stage-vh" as string]: "180vh", height: `calc(${stages.length} * var(--stage-vh))` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {stages.map((s, i) => (
          <Stage
            key={i}
            stage={s}
            index={i}
            total={stages.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
