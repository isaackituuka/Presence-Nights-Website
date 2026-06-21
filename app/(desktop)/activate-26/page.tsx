"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useRef, useEffect, useState } from "react"
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Navbar } from "@/components/navbar"
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop"
import { AmbientAudio } from "@/components/ui/ambient-audio"

// Below-fold modules — dynamically imported so they don't ship with the initial bundle
const LocationMap = dynamic(() =>
  import("@/components/ui/expand-map").then((m) => ({ default: m.LocationMap })),
  { ssr: false },
)
const ImageAutoSlider = dynamic(() =>
  import("@/components/ui/image-auto-slider").then((m) => ({ default: m.ImageAutoSlider })),
  { ssr: false },
)
const Footer = dynamic(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer })),
)

/* -----------------------------------------------------------
 *  SHARED — small primitives
 * --------------------------------------------------------- */

function Eyebrow({ children, color = "#E26721" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-block text-[10px] tracking-[0.6em] uppercase"
      style={{ fontFamily: "var(--font-mono)", color }}
    >
      {children}
    </span>
  )
}

/* Ember / spark field — purely decorative, low-cost */
const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: (i * 47) % 100,
  y: 60 + ((i * 13) % 40),
  size: 1 + ((i * 7) % 3),
  dur: 6 + (i % 5),
  delay: (i % 6) * 0.5,
  color: i % 3 === 0 ? "#F08D28" : i % 3 === 1 ? "#E26721" : "#D62A5F",
}))

function EmberField({ density = 1 }: { density?: number }) {
  const list = density < 1 ? SPARKS.slice(0, Math.floor(SPARKS.length * density)) : SPARKS
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {list.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            bottom: `${p.y - 30}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -120 - p.id * 4],
            opacity: [0, 0.85, 0.4, 0],
            scale: [0.4, 1.2, 0.7, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

/* -----------------------------------------------------------
 *  1. IGNITION — Hero
 * --------------------------------------------------------- */

function IgnitionHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  const opacity = useTransform(scrollYProgress, [0.6, 0.95], [1, 0])

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image with deep parallax */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
        <Image
          src="/curated/glimpses/IMG_1826.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/55 to-[#0C070A]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(226,103,33,0.18)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(12,7,10,0.85)_100%)]" />
      </motion.div>

      <EmberField />

      {/* Bottom horizon glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[110%] h-72 bg-[#E26721]/12 blur-[100px] rounded-[100%] pointer-events-none" />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4"
        style={{ y: contentY, opacity }}
      >
        {/* Live event chip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E26721]/35 backdrop-blur-sm bg-[#0C070A]/30"
        >
          <span className="relative flex h-1.5 w-1.5">
            <motion.span
              className="absolute inset-0 rounded-full bg-[#E26721]"
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E26721]" />
          </span>
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#EBE6E2]/85"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Coming October 2026
          </span>
        </motion.div>

        {/* ACTIVATE */}
        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.18em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold leading-[0.85] text-[#EBE6E2]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.6rem, 14vw, 11rem)",
          }}
        >
          ACTIVATE
        </motion.h1>

        {/* 26 — gradient & punch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.95, type: "spring", stiffness: 110, damping: 14 }}
          className="relative -mt-2 md:-mt-4"
        >
          <span
            className="font-black italic bg-gradient-to-br from-[#F08D28] via-[#E26721] to-[#9E1194] bg-clip-text text-transparent leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 20vw, 16rem)",
              filter: "drop-shadow(0 0 40px rgba(226,103,33,0.45))",
            }}
          >
            26
          </span>
        </motion.div>

        {/* Date strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-6 flex items-center gap-3 md:gap-5"
        >
          <span className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-[#E26721]" />
          <span
            className="text-[#E26721] tracking-[0.4em] md:tracking-[0.55em] text-xs md:text-sm uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Oct 23 · 24 · Tulsa
          </span>
          <span className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-[#E26721]" />
        </motion.div>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.85 }}
          className="mt-7 text-base md:text-lg text-[#EBE6E2]/70 max-w-md"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Activating a generation for End Time Revival.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <span
          className="text-[#8A8280]/70 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Begin
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#E26721] to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  2. REMEMBRANCE — bridge
 * --------------------------------------------------------- */

function Remembrance() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-30%" })
  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 md:px-12 text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,103,33,0.05),transparent_60%)]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4 }}
      />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow>Each Year</Eyebrow>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-3xl sm:text-5xl md:text-6xl font-bold text-[#EBE6E2] leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          For two nights, we gather
          <br />
          <span className="italic gradient-text-fire">to Awaken, Activate, and Commission a generation.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 max-w-xl mx-auto text-[#8A8280] text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We want to see our generation on fire.
        </motion.p>
      </div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  3. FOUR PILLARS — sticky reveal
 *     AWAKEN · IGNITE · REVIVE · ARISE
 * --------------------------------------------------------- */

type Pillar = {
  word: string
  index: string
  body: string
  photo: string
  accent: string
}

const PILLARS: Pillar[] = [
  {
    word: "AWAKEN",
    index: "01",
    body: "Rise from spiritual sleep. God is awakening a generation to see with clarity, feel with conviction, and respond with urgency.",
    photo: "/curated/glimpses/7N2A0213.JPG",
    accent: "#F08D28",
  },
  {
    word: "IGNITE",
    index: "02",
    body: "Let the fire of the Holy Spirit take over. This is more than a moment it's the beginning of a life set ablaze with divine purpose.",
    photo: "/curated/glimpses/7N2A0081.JPG",
    accent: "#E26721",
  },
  {
    word: "REVIVE",
    index: "03",
    body: "What seemed lost or lifeless is being restored. God is breathing life back into dry places, dreams, and hearts.",
    photo: "/curated/glimpses/7N2A0021.JPG",
    accent: "#D62A5F",
  },
  {
    word: "ARISE",
    index: "04",
    body: "Stand in boldness and truth. You were made for this hour called to arise and carry the fire forward.",
    photo: "/curated/glimpses/7N2A9975.JPG",
    accent: "#9E1194",
  },
]

function PillarPanel({
  pillar,
  index,
  total,
  scrollYProgress,
}: {
  pillar: Pillar
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const segment = 1 / total
  const start = index * segment
  const end = start + segment
  const isFirst = index === 0

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [end - segment * 0.1, end + 0.02]
      : [Math.max(0, start - 0.05), start + 0.04, end - segment * 0.1, end + 0.02],
    isFirst ? [1, 0] : [0, 1, 1, 0],
  )
  const photoScale = useTransform(scrollYProgress, [start - 0.05, start + 0.5 * segment, end], [1.18, 1, 1.06])
  const photoY = useTransform(scrollYProgress, [start, end], ["-3%", "3%"])
  const wordY = useTransform(scrollYProgress, [start, start + segment * 0.45, end], ["1.2em", "0em", "-0.4em"])
  const wordScale = useTransform(scrollYProgress, [start, start + segment * 0.45, end], [0.85, 1.04, 0.96])
  const bodyOpacity = useTransform(
    scrollYProgress,
    [start + segment * 0.18, start + segment * 0.4, end - segment * 0.15, end - 0.01],
    [0, 1, 1, 0],
  )
  const bodyY = useTransform(scrollYProgress, [start + segment * 0.18, start + segment * 0.4], ["1.5em", "0em"])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      <motion.div className="absolute inset-0" style={{ scale: photoScale, y: photoY }}>
        <Image
          src={pillar.photo}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
          quality={index === 0 ? 80 : 70}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,7,10,0.55)_0%,rgba(12,7,10,0.92)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/55 to-[#0C070A]/40" />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${pillar.accent}55, transparent 60%)` }}
        />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] w-full px-6 md:px-12">
        <div
          className="text-[11px] tracking-[0.55em] uppercase mb-5 md:mb-7"
          style={{ fontFamily: "var(--font-mono)", color: pillar.accent }}
        >
          {pillar.index} — Pillar
        </div>

        <motion.h2
          className="font-bold leading-[0.92] tracking-[-0.02em] text-[#EBE6E2]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 14vw, 11rem)",
            y: wordY,
            scale: wordScale,
            transformOrigin: "0% 100%",
            textShadow: `0 0 50px ${pillar.accent}55`,
          }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(120deg, #FFFAF5 0%, ${pillar.accent} 65%, #EBE6E2 100%)`,
            }}
          >
            {pillar.word}
          </span>
        </motion.h2>

        <motion.p
          className="mt-7 md:mt-9 max-w-xl text-base md:text-xl text-[#EBE6E2]/82 leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", opacity: bodyOpacity, y: bodyY }}
        >
          {pillar.body}
        </motion.p>
      </div>

      {/* Side dots — progress */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-10 flex flex-col gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-7 rounded-full transition-all duration-500"
            style={{ background: i === index ? pillar.accent : "rgba(235,230,226,0.18)" }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function FourPillars() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <section
      data-scene="activate-pillars"
      ref={ref}
      className="relative"
      style={{ ["--stage-vh" as string]: "200vh", height: `calc(${PILLARS.length} * var(--stage-vh))` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {PILLARS.map((p, i) => (
          <PillarPanel
            key={p.word}
            pillar={p}
            index={i}
            total={PILLARS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Permanent label */}
        <div
          className="absolute top-20 md:top-8 left-6 md:left-8 text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-[#EBE6E2]/40 z-10"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Activate pillars
        </div>
      </div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  4. WITNESS — YouTube + Scripture
 * --------------------------------------------------------- */

interface VideoCardProps {
  videoId: string
  label: string
  delay: number
  inView: boolean
}

function VideoCard({ videoId, label, delay, inView }: VideoCardProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-video rounded-2xl overflow-hidden border border-[#E26721]/25 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 cursor-pointer"
          aria-label={`Play ${label}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 512px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/80 via-[#0C070A]/20 to-[#0C070A]/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              <span className="absolute inset-0 rounded-full border border-[#E26721]/55" />
              <motion.span
                className="absolute inset-0 rounded-full border border-[#E26721]"
                animate={{ scale: [1, 1.4, 1.7], opacity: [0.6, 0.15, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="absolute inset-0 rounded-full bg-[#E26721]/15 backdrop-blur-md" />
              <svg width="22" height="26" viewBox="0 0 22 26" fill="#EBE6E2" className="relative z-10 ml-1">
                <path d="M2 1.5v23l18-11.5z" />
              </svg>
            </motion.div>
          </div>
          <div
            className="absolute bottom-5 left-5 right-5 text-left text-[#EBE6E2]/85 text-xs md:text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Watch — {label}
          </div>
        </button>
      )}
    </motion.div>
  )
}

function WitnessVideo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  const videos = [
    { videoId: "1UTJeE4VuQw", label: "Activate 2025 . DAY 1" },
    { videoId: "Hc4VJuHlREA", label: "Activate 2025 . DAY 2" },
  ]

  return (
    <section ref={ref} className="relative py-20 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(158,17,148,0.08),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <Eyebrow color="#9E1194">In our own words</Eyebrow>
          <h2
            className="mt-5 text-3xl md:text-5xl font-bold text-[#EBE6E2] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Do it again <span className="italic gradient-text-fire">in our times</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {videos.map((video, i) => (
            <VideoCard
              key={video.videoId}
              videoId={video.videoId}
              label={video.label}
              delay={0.15 + i * 0.1}
              inView={inView}
            />
          ))}
        </div>

        {/* Scripture */}
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-14 md:mt-20 max-w-3xl mx-auto text-center"
        >
          <blockquote
            className="text-xl md:text-3xl text-[#EBE6E2]/85 italic leading-relaxed"
            style={{ fontFamily: "var(--font-display)" }}
          >
            “O LORD, I have heard of what You have done,
            <br />
            and I am filled with <span className="not-italic gradient-text-fire font-semibold">awe</span>.”
          </blockquote>
          <figcaption
            className="mt-5 text-[10px] tracking-[0.5em] uppercase text-[#E26721]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Habakkuk 3:2
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  5. GLIMPSES — auto-scrolling photo slider with fire glow
 * --------------------------------------------------------- */

function GlimpsesMosaic() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-14 px-6"
      >
        <Eyebrow color="#D62A5F">Glimpses</Eyebrow>
        <h2
          className="mt-5 text-3xl md:text-5xl font-bold text-[#EBE6E2] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Frames from <span className="italic gradient-text-fire"> last year</span>.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        <ImageAutoSlider duration={42} />
      </motion.div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  7. THE DATE — countdown
 * --------------------------------------------------------- */

const TARGET = new Date("2026-10-23T19:00:00-05:00").getTime()

function useCountdown() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setNow(Date.now()))
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => {
      window.cancelAnimationFrame(frame)
      clearInterval(id)
    }
  }, [])
  if (now == null) return null
  const diff = Math.max(0, TARGET - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function CountdownCell({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[78px] sm:w-[110px] md:w-[140px] aspect-[3/4] flex items-center justify-center rounded-2xl border border-[#E26721]/22 bg-[#16100E]/55 backdrop-blur-md overflow-hidden"
        style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.45), inset 0 0 30px rgba(226,103,33,0.06)" }}
      >
        <span
          className="font-bold tabular-nums bg-gradient-to-b from-[#FFFAF5] via-[#F08D28] to-[#E26721] bg-clip-text text-transparent leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem, 7vw, 5.6rem)",
            filter: "drop-shadow(0 0 20px rgba(226,103,33,0.35))",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#EBE6E2]/8 pointer-events-none" />
      </div>
      <span
        className="mt-3 text-[10px] tracking-[0.5em] uppercase text-[#8A8280]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
    </div>
  )
}

function TheDate() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })
  const c = useCountdown()

  return (
    <section ref={ref} className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(226,103,33,0.10),transparent_55%)]" />
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow>Save the dates</Eyebrow>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-4xl sm:text-6xl md:text-7xl font-bold text-[#EBE6E2] leading-[0.95]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          October <span className="italic gradient-text-fire whitespace-nowrap">23 &amp; 24</span>
          <span className="block sm:inline text-[#EBE6E2]/85">, 2026</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-5 text-[#8A8280] text-[10px] sm:text-sm md:text-base tracking-[0.25em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Fri 7pm · Sat 6pm · Doors 5
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-14 flex justify-center gap-3 sm:gap-5 md:gap-7"
        >
          <CountdownCell label="Days" value={c?.days ?? "—"} />
          <CountdownCell label="Hours" value={c?.hours ?? "—"} />
          <CountdownCell label="Minutes" value={c?.minutes ?? "—"} />
          <CountdownCell label="Seconds" value={c?.seconds ?? "—"} />
        </motion.div>
      </div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  8. THE PLACE — venue + LocationMap
 * --------------------------------------------------------- */

function ThePlace() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  return (
    <section ref={ref} className="relative py-16 md:py-20 px-6 md:px-12 overflow-hidden">
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow color="#D62A5F">The place</Eyebrow>
          <h2
            className="mt-5 text-4xl md:text-6xl font-bold text-[#EBE6E2] leading-[1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tulsa, <span className="italic gradient-text-fire">again</span>.
          </h2>
          <p
            className="mt-6 text-[#8A8280] text-base md:text-lg leading-relaxed max-w-md"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Same ground where it broke open in &apos;25 — and we&apos;re widening the doors.
          </p>
          <div
            className="mt-7 text-[#EBE6E2]/85 text-sm md:text-base"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            12231 S. 74th E Ave.
            <br />
            Bixby, OK 74008
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <LocationMap location="Bixby, OK" coordinates="12231 S. 74th E Ave., Bixby, OK 74008" />
        </motion.div>
      </div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  9. WHAT'S COMING — teasers
 * --------------------------------------------------------- */

/* -----------------------------------------------------------
 *  10. INVITATION — CTAs (inactive)
 * --------------------------------------------------------- */

function LinkButton({ label, sublabel, href }: { label: string; sublabel: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
    >
      <div
        className="relative px-7 md:px-10 py-3.5 md:py-4 rounded-full text-[#EBE6E2] tracking-[0.18em] uppercase text-[11px] md:text-xs font-semibold overflow-hidden transition-transform duration-300 group-hover:scale-[1.04]"
        style={{
          fontFamily: "var(--font-mono)",
          background: "linear-gradient(135deg, #E26721 0%, #D62A5F 60%, #9E1194 100%)",
          boxShadow: "0 8px 30px rgba(226,103,33,0.28)",
        }}
      >
        <span className="relative z-10">{label}</span>
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.08)" }} />
      </div>
      <div
        className="mt-2 text-center text-[9px] tracking-[0.4em] uppercase text-[#8A8280]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {sublabel}
      </div>
    </a>
  )
}

function Invitation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const x = useTransform(smooth, [0, 1], ["10%", "-50%"])

  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(226,103,33,0.10),transparent_55%)]" />

      {/* Marquee — motto floating across */}
      <motion.div
        className="absolute inset-x-0 top-10 md:top-14 flex whitespace-nowrap pointer-events-none opacity-[0.07]"
        style={{ x }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="font-bold text-[#EBE6E2] mr-12"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 10vw, 8rem)" }}
          >
            THIS GENERATION · THIS HOUR · THIS FIRE ·
          </span>
        ))}
      </motion.div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow>The invitation</Eyebrow>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-4xl md:text-6xl font-bold text-[#EBE6E2] leading-[1]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Come <span className="italic gradient-text-fire">hungry</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="mt-7 max-w-lg mx-auto text-[#8A8280] text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Bring a friend. Bring your questions. Bring an empty cup.
          <br />
          We&apos;ll meet you at the altar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-7 sm:gap-10"
        >
          <LinkButton label="Volunteer" sublabel="Register now" href="https://docs.google.com/forms/d/1iNhSf37vS_V2zufP9fBK1gqCUNXracBSf9N24E98wl8/viewform" />
          <LinkButton label="Give" sublabel="Support the vision" href="https://btgii.app.neoncrm.com/forms/activate2025" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 text-[10px] tracking-[0.55em] uppercase text-[#E26721]/85"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          This generation · This hour · This fire
        </motion.p>
      </div>
    </section>
  )
}

/* -----------------------------------------------------------
 *  PAGE
 * --------------------------------------------------------- */

export default function Activate26Page() {
  return (
    <main className="relative bg-[#0C070A] text-[#EBE6E2] min-h-screen">
      <AmbientBackdrop />
      <Navbar />
      <AmbientAudio />

      <IgnitionHero />
      <Remembrance />
      <FourPillars />
      <WitnessVideo />
      <GlimpsesMosaic />
      <TheDate />
      <ThePlace />
      <Invitation />

      <Footer />
    </main>
  )
}
