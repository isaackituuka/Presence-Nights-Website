"use client"

import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, MapPin, Calendar, Heart } from "lucide-react"
import { Countdown } from "@/components/ui/countdown"

const featured = {
  no: "00",
  tag: "MONTHLY",
  title: ["Presence", "Nights"],
  date: "Every Last Friday · 7:30 PM",
  location: "Bixby, Oklahoma",
  line: "The heartbeat of everything we do is His presence. Come hungry. Come expectant.",
  photo: "/curated/main/gather-presence.jpg",
}

const events = [
  { no: "01", tag: "RECURRING", title: "Prayer Stretches", date: "3× Monthly", location: "Bixby, OK", line: "Intercession for our generation, our city, our nation, and the global church.", color: "#D62A5F" },
  { no: "02", tag: "ANNUAL", title: "Activate 2026", date: "October 2-3 · 2026", location: "Bixby, OK", line: "A two-day revival and equipping gathering shaped by worship, prayer, commissioning and discipleship.", color: "#9E1194" },
  { no: "03", tag: "END OF YEAR", title: "Crossover 2027", date: "Dec 31 · 9 PM", location: "Bixby, OK", line: "Step into 2027 in His presence — worship, prayer, prophetic declaration.", color: "#F08D28" },
]

/* ─────────────────────────── Sub-scene 6.1: Featured event hero ─────────────────────────── */

function HeroWord({
  word, range, scrollYProgress, accent,
}: {
  word: string
  range: [number, number]
  scrollYProgress: MotionValue<number>
  accent?: boolean
}) {
  const opacity = useTransform(scrollYProgress, range, [0, 1])
  const y = useTransform(scrollYProgress, range, ["0.5em", "0em"])
  const blur = useTransform(scrollYProgress, range, ["8px", "0px"])
  const filter = useTransform(blur, (v) => `blur(${v})`)
  return (
    <motion.span
      className={`inline-block ${accent ? "italic gradient-text-fire" : ""}`}
      style={{ opacity, y, filter }}
    >
      {word}
    </motion.span>
  )
}

function GatherHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])
  const photoY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"])
  const overlayOp = useTransform(scrollYProgress, [0, 0.6, 1], [0.45, 0.65, 0.85])

  return (
    <section id="events" ref={ref} data-scene="gather-hero" className="relative" style={{ ["--stage-vh" as string]: "200vh", height: "var(--stage-vh)" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Photo backdrop with parallax */}
        <motion.div className="absolute inset-0" style={{ scale: photoScale, y: photoY }}>
          <Image src={featured.photo} alt={featured.title.join(" ")} fill className="object-cover brightness-[1.08] saturate-[0.92] contrast-[1.04]" sizes="100vw" />
        </motion.div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #0C070A 0%, rgba(12,7,10,0.48) 45%, rgba(12,7,10,0.18) 100%)",
            opacity: overlayOp,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C070A]/50 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-[1280px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-5">
            <HeroWord word="06 — GATHER WITH US" range={[0.0, 0.08]} scrollYProgress={scrollYProgress} />
            <motion.span
              className="h-px w-16 bg-[#E26721]/45 origin-left"
              style={{ scaleX: useTransform(scrollYProgress, [0.04, 0.12], [0, 1]) }}
            />
            <HeroWord word={featured.tag} range={[0.06, 0.14]} scrollYProgress={scrollYProgress} />
          </div>

          {/* Title — word by word */}
          <h2
            className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-bold leading-[0.92] tracking-[-0.02em] text-[#EBE6E2]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <HeroWord word={featured.title[0]} range={[0.08, 0.22]} scrollYProgress={scrollYProgress} />{" "}
            <HeroWord word={featured.title[1]} range={[0.18, 0.32]} scrollYProgress={scrollYProgress} accent />
          </h2>

          {/* Italic line */}
          <p className="mt-5 max-w-2xl text-xl md:text-2xl italic text-[#EBE6E2]/85 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
            <HeroWord word={featured.line} range={[0.28, 0.5]} scrollYProgress={scrollYProgress} />
          </p>

          {/* Meta */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-6 md:gap-x-10 gap-y-3 text-sm text-[#8A8280]"
            style={{ fontFamily: "var(--font-mono)", opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
          >
            <span className="text-[#EBE6E2]/85">{featured.date}</span>
            <span className="hidden md:block text-[#8A8280]/40">·</span>
            <span>{featured.location}</span>
            <span className="hidden md:block text-[#8A8280]/40">·</span>
            <Countdown />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Sub-scene 6.2: Schedule list with progressive highlight ─────────────────────── */

function ScheduleRow({
  event, index, total, scrollYProgress,
}: {
  event: (typeof events)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  // Each event gets a slice of the section's scroll, just like the convictions list
  const seg = 1 / total
  const start = index * seg
  const end = start + seg
  const opacity = useTransform(scrollYProgress, [start - 0.05, start + 0.04, end - 0.04, end + 0.05], [0.4, 1, 1, 0.4])
  const x = useTransform(scrollYProgress, [start, end], [0, 12])
  const barOpacity = useTransform(scrollYProgress, [start - 0.04, start + 0.04, end - 0.04, end + 0.04], [0, 1, 1, 0])
  const glowOpacity = useTransform(scrollYProgress, [start - 0.04, start + 0.08, end - 0.08, end + 0.04], [0, 0.22, 0.22, 0])

  return (
    <motion.li
      className="group relative grid md:grid-cols-[80px_1fr_auto] gap-4 md:gap-10 items-center py-7 md:py-9 border-b border-[rgba(255,255,255,0.11)] hover:border-[rgba(226,103,33,0.4)] transition-colors duration-500 cursor-pointer"
      style={{ opacity, x }}
    >
      {/* Hover wash from the left */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${event.color}1c 0%, transparent 60%)` }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-4 bottom-4 w-px rounded-full"
        style={{ opacity: barOpacity, background: `linear-gradient(to bottom, transparent, ${event.color}, transparent)` }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 18% 50%, ${event.color}33, transparent 58%)`,
        }}
      />
      <div className="flex items-center gap-3">
        <span className="text-xs tracking-[0.3em]" style={{ color: event.color, fontFamily: "var(--font-mono)" }}>
          {event.no}
        </span>
        <span className="md:hidden text-[#8A8280] text-[10px] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
          {event.tag}
        </span>
      </div>

      <div>
        <div
          className="text-3xl md:text-5xl font-bold leading-tight tracking-[-0.01em] text-[#EBE6E2] group-hover:text-white transition-colors duration-300"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {event.title}
        </div>
        <p className="mt-2 text-[#8A8280] group-hover:text-[#EBE6E2]/90 text-sm md:text-base max-w-xl leading-relaxed transition-colors duration-300" style={{ fontFamily: "var(--font-sans)" }}>
          {event.line}
        </p>
      </div>

      <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-1">
        <div className="text-[#EBE6E2]/90 text-sm" style={{ fontFamily: "var(--font-mono)" }}>{event.date}</div>
        <div className="hidden md:block text-[#8A8280]/75 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
          {event.location}
        </div>
        <ArrowUpRight
          size={20}
          className="text-[#8A8280]/80 group-hover:text-[#E26721] group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-all duration-300"
          style={{ color: undefined }}
        />
      </div>
    </motion.li>
  )
}

function GatherSchedule() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Title reveal progress
  const titleOpacity = useTransform(scrollYProgress, [-0.1, 0.02], [0, 1])
  const titleY = useTransform(scrollYProgress, [-0.1, 0.02], ["1.5rem", "0rem"])

  return (
    <section ref={ref} data-scene="gather-schedule" className="relative" style={{ ["--stage-vh" as string]: "85vh", height: `calc((${events.length} + 0.2) * var(--stage-vh))` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center pt-32 md:pt-20 pb-8 box-border">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.h3
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#EBE6E2] mb-12 leading-[1] tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-display)", opacity: titleOpacity, y: titleY }}
          >
            Other ways<br />
            <span className="italic gradient-text-fire">we gather.</span>
          </motion.h3>

          <ol className="border-t border-[rgba(255,255,255,0.07)]">
            {events.map((e, i) => (
              <ScheduleRow key={e.no} event={e} index={i} total={events.length} scrollYProgress={scrollYProgress} />
            ))}
          </ol>
        </div>

        {/* Eyebrow */}
        <div className="absolute top-20 md:top-8 left-4 right-4 md:left-8 md:right-8 z-30 flex items-center justify-between pointer-events-none">
          <span className="text-[#E26721] text-[10px] tracking-[0.5em]" style={{ fontFamily: "var(--font-mono)" }}>
            06.1 — SCHEDULE
          </span>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Sub-scene 6.3: Connect — pinned CTA ─────────────────────── */

const SOCIALS = [
  {
    name: "Instagram",
    handle: "@presencenights",
    href: "https://www.instagram.com/presencenights?igsh=YWt3bTJheHpqeWw3",
    color: "#D62A5F",
    Icon: InstagramIcon,
  },
  {
    name: "WhatsApp",
    handle: "Join the group",
    href: "https://chat.whatsapp.com/DCyTlkJf9E27cdilM8x7kh?mode=gi_t",
    color: "#25D366",
    Icon: WhatsAppIcon,
  },
  {
    name: "YouTube",
    handle: "@PresenceNights",
    href: "https://www.youtube.com/@PresenceNights",
    color: "#E26721",
    Icon: YouTubeIcon,
  },
  {
    name: "TikTok",
    handle: "@presencenights.tu",
    href: "https://www.tiktok.com/@presencenights.tu",
    color: "#EBE6E2",
    Icon: TikTokIcon,
  },
] as const

function TikTokIcon({ size = 22, className = "", style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 22, className = "", style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  )
}

function InstagramIcon({ size = 22, className = "", style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YouTubeIcon({ size = 22, className = "", style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function GatherConnect() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <section id="connect" ref={ref} data-scene="gather-connect" className="relative scroll-mt-0 -mt-[min(20vh,120px)]" style={{ ["--stage-vh" as string]: "115vh", height: "var(--stage-vh)" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated background glows */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#E26721]/10 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#9E1194]/10 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,103,33,0.08)_0%,rgba(214,42,95,0.05)_40%,transparent_70%)]" />

        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          <ConnectEyebrow scrollYProgress={scrollYProgress} />
          <ConnectTitle scrollYProgress={scrollYProgress} />
          <ConnectQuote scrollYProgress={scrollYProgress} />
          <ConnectPills scrollYProgress={scrollYProgress} />

          <ConnectSocials scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}

function ConnectEyebrow({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.0, 0.05], [0, 1])
  const y = useTransform(scrollYProgress, [0.0, 0.05], ["1rem", "0rem"])
  return (
    <motion.span
      className="text-[#E26721] text-[10px] tracking-[0.5em] uppercase block mb-6"
      style={{ fontFamily: "var(--font-mono)", opacity, y }}
    >
      06.2 — GET INVOLVED
    </motion.span>
  )
}

function ConnectTitle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const useWordA = (range: [number, number]) => ({
    opacity: useTransform(scrollYProgress, range, [0, 1]),
    y: useTransform(scrollYProgress, range, ["0.5em", "0em"]),
    filter: useTransform(useTransform(scrollYProgress, range, ["8px", "0px"]), (v) => `blur(${v})`),
  })
  const a = useWordA([0.04, 0.12])
  const b = useWordA([0.10, 0.18])
  return (
    <h2
      className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] font-bold text-[#EBE6E2] leading-[0.95] tracking-[-0.02em] mb-6"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <motion.span className="inline-block" style={a}>Get</motion.span>{" "}
      <motion.span className="inline-block italic gradient-text-fire" style={b}>Connected.</motion.span>
    </h2>
  )
}

function ConnectQuote({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.16, 0.26], [0, 1])
  const y = useTransform(scrollYProgress, [0.16, 0.26], ["1rem", "0rem"])
  return (
    <motion.p
      className="text-lg md:text-xl text-[#EBE6E2]/60 mb-12 italic"
      style={{ fontFamily: "var(--font-display)", opacity, y }}
    >
      Click the links below to join the Presence Nights community.
    </motion.p>
  )
}

function ConnectPills({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const pills = [
    { icon: MapPin, text: "Bixby, Oklahoma", color: "#E26721", range: [0.22, 0.30] as [number, number] },
    { icon: Calendar, text: "Every Last Friday", color: "#D62A5F", range: [0.25, 0.33] as [number, number] },
    { icon: Heart, text: "All Are Welcome", color: "#9E1194", range: [0.28, 0.36] as [number, number] },
  ]
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {pills.map((p) => (
        <ConnectPill key={p.text} {...p} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  )
}

function ConnectPill({
  icon: Icon, text, color, range, scrollYProgress,
}: {
  icon: typeof MapPin
  text: string
  color: string
  range: [number, number]
  scrollYProgress: MotionValue<number>
}) {
  const opacity = useTransform(scrollYProgress, range, [0, 1])
  const y = useTransform(scrollYProgress, range, ["0.6rem", "0rem"])
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm"
      style={{ borderColor: `${color}30`, background: "rgba(22,16,14,0.55)", fontFamily: "var(--font-mono)", opacity, y }}
    >
      <Icon size={13} style={{ color }} />
      <span className="text-[#EBE6E2]/85">{text}</span>
    </motion.div>
  )
}

function ConnectSocials({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.32, 0.45], [0, 1])
  const y = useTransform(scrollYProgress, [0.32, 0.45], [16, 0])
  return (
    <motion.div className="max-w-2xl mx-auto" style={{ opacity, y }}>
      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4">
        {SOCIALS.map((social, i) => (
          <SocialPill key={social.name} social={social} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>
      <p className="text-[#8A8280]/60 text-[10px] tracking-[0.35em] uppercase mt-6 text-center" style={{ fontFamily: "var(--font-mono)" }}>
        When you find your people · you find your purpose
      </p>
    </motion.div>
  )
}

function SocialPill({
  social, index, scrollYProgress,
}: {
  social: (typeof SOCIALS)[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  const { name, handle, href, color, Icon } = social

  // Per-pill stagger reveal
  const pStart = 0.34 + index * 0.04
  const pEnd = pStart + 0.10
  const pOpacity = useTransform(scrollYProgress, [pStart, pEnd], [0, 1])
  const pY = useTransform(scrollYProgress, [pStart, pEnd], [22, 0])

  // Cursor-following spotlight
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spotlight = useTransform(
    [px, py] as const,
    ([x, y]: number[]) =>
      `radial-gradient(180px circle at ${x * 100}% ${y * 100}%, ${color}40 0%, ${color}10 35%, transparent 65%)`,
  )
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { px.set(0.5); py.set(0.5) }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — ${handle}`}
      className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-[1.04] overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        opacity: pOpacity,
        y: pY,
        borderColor: `${color}50`,
        background: "rgba(22,16,14,0.85)",
        fontFamily: "var(--font-mono)",
      }}
      animate={reduce ? undefined : {
        boxShadow: [
          "0 0 0 rgba(226,103,33,0)",
          `0 0 22px ${color}3d`,
          "0 0 0 rgba(226,103,33,0)",
        ],
      }}
      transition={reduce ? undefined : {
        duration: 2.8,
        delay: index * 0.42,
        repeat: Infinity,
        repeatDelay: 1.6,
        ease: "easeInOut",
      }}
    >
      {/* Cursor-following spotlight */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
        style={{ background: spotlight }}
      />
      <span
        className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 group-hover:scale-110"
        style={{ background: `${color}1f`, color }}
      >
        <Icon size={18} />
      </span>
      <span className="relative flex flex-col items-start leading-tight">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#8A8280] group-hover:text-[#EBE6E2] transition-colors">
          {name}
        </span>
        <span className="text-sm text-[#EBE6E2] font-semibold" style={{ fontFamily: "var(--font-sans)" }}>
          {handle}
        </span>
      </span>
      <ArrowUpRight
        size={14}
        className="relative ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        style={{ color }}
      />
    </motion.a>
  )
}

/* ─────────────────────── Top-level export ─────────────────────── */

export function SceneGather() {
  return (
    <>
      <GatherHero />
      <GatherSchedule />
      <GatherConnect />
    </>
  )
}
