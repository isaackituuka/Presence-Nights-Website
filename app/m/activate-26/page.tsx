"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronRight, MapPin, Play, ChevronDown } from "lucide-react"
import { FadeIn } from "@/components/mobile/fade-in"
import { MobileFooter } from "@/components/mobile/mobile-footer"
import { MarqueeGallery, Bridge } from "@/components/mobile/cinematic"

/* ─── DATA ────────────────────────────────────────────────── */

const PILLARS = [
  {
    word: "AWAKEN",
    body: "Rise from spiritual sleep. God is awakening a generation to see with clarity, feel with conviction, and respond with urgency.",
    photo: "/curated/glimpses/7N2A0213.JPG",
    color: "#F08D28",
  },
  {
    word: "IGNITE",
    body: "Let the fire of the Holy Spirit take over. This is more than a moment it's the beginning of a life set ablaze with divine purpose.",
    photo: "/curated/glimpses/7N2A0081.JPG",
    color: "#E26721",
  },
  {
    word: "REVIVE",
    body: "What seemed lost or lifeless is being restored. God is breathing life back into dry places, dreams, and hearts.",
    photo: "/curated/glimpses/7N2A0021.JPG",
    color: "#D62A5F",
  },
  {
    word: "ARISE",
    body: "Stand in boldness and truth. You were made for this hour called to arise and carry the fire forward.",
    photo: "/curated/glimpses/7N2A9975.JPG",
    color: "#9E1194",
  },
]

const GLIMPSES = [
  "/curated/glimpses/7N2A1783.JPG",
  "/curated/glimpses/7N2A1510.JPG",
  "/curated/glimpses/7N2A1369.JPG",
  "/curated/glimpses/7N2A1304.JPG",
  "/curated/glimpses/7N2A1045.JPG",
  "/curated/glimpses/7N2A0627.JPG",
  "/curated/glimpses/7N2A1143.JPG",
  "/curated/glimpses/7N2A0495.JPG",
  "/curated/glimpses/7N2A0335.JPG",
]

const VENUE = {
  name: "Bixby, OK",
  address: "12231 S. 74th E Ave., Bixby, OK 74008",
  mapsUrl:
    "https://maps.apple.com/?address=12231%20S.%2074th%20E%20Ave.%2C%20Bixby%2C%20OK%2074008",
}

const TARGET = new Date("2026-10-23T19:00:00-05:00").getTime()

/* ─── PRIMITIVES ───────────────────────────────────────────── */

function SectionLabel({ children, color = "#E26721" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="text-[10px] tracking-[0.45em] uppercase"
      style={{ fontFamily: "var(--font-mono)", color }}
    >
      {children}
    </span>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[2.2rem] font-bold leading-[1.05] text-[#EBE6E2]"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  )
}

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
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

/* ─── SECTIONS ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <div className="sd-kenburns absolute inset-0">
        <Image
          src="/curated/glimpses/IMG_1826.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/55 to-[#0C070A]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(226,103,33,0.18)_0%,transparent_55%)]" />

      <div
        className="sd-hero-away relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Live chip */}
        <div
          className="sd-load-pop sd-d1 mb-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E26721]/40"
          style={{ background: "rgba(12,7,10,0.4)", backdropFilter: "blur(8px)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[#E26721] mobile-pulse-ring" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E26721]" />
          </span>
          <span
            className="text-[#EBE6E2]/85 text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Coming Oct 2026
          </span>
        </div>

        <span className="block overflow-hidden">
          <h1
            className="sd-load-clip sd-d2 font-bold text-[#EBE6E2] leading-[0.85]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 14vw, 5rem)" }}
          >
            ACTIVATE
          </h1>
        </span>

        <div
          className="sd-load-pop sd-d3 -mt-1 italic font-black"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 22vw, 8rem)",
            lineHeight: 1,
            backgroundImage:
              "linear-gradient(135deg, #F08D28 0%, #E26721 50%, #9E1194 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 24px rgba(226,103,33,0.4))",
          }}
        >
          26
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="sd-load-grow sd-d4 h-px w-7 bg-gradient-to-r from-transparent to-[#E26721]" />
          <span
            className="sd-load-fade sd-d4 text-[#E26721] text-[11px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Oct 23 · 24 · Tulsa
          </span>
          <span className="sd-load-grow sd-d4 h-px w-7 bg-gradient-to-l from-transparent to-[#E26721]" />
        </div>

        <p
          className="sd-load-rise sd-d5 mt-6 text-[#EBE6E2]/75 text-[15px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Activating a generation for End Time Revival.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="sd-hero-away absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <ChevronDown size={18} className="text-[#E26721]/85 animate-bounce-down" />
      </div>
    </section>
  )
}

function CountdownCard() {
  const c = useCountdown()
  const cells: { label: string; value: number | string }[] = [
    { label: "Days", value: c?.days ?? "—" },
    { label: "Hrs", value: c?.hours ?? "—" },
    { label: "Min", value: c?.minutes ?? "—" },
    { label: "Sec", value: c?.seconds ?? "—" },
  ]
  return (
    <section className="px-5 -mt-12 relative z-20">
      <FadeIn>
        <div
          className="sd-shimmer animate-pulse-glow relative rounded-3xl p-5 border border-[#E26721]/25 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(22,16,14,0.95) 0%, rgba(12,7,10,0.95) 100%)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.55), 0 0 30px rgba(226,103,33,0.10)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Counting down</SectionLabel>
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[#8A8280]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Oct 23 · 7pm
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {cells.map((cell) => (
              <div
                key={cell.label}
                className="flex flex-col items-center rounded-xl py-3 border border-[#EBE6E2]/6"
                style={{ background: "rgba(22,16,14,0.7)" }}
              >
                <span
                  className="font-bold tabular-nums leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
                    backgroundImage: "linear-gradient(180deg, #FFFAF5 0%, #F08D28 60%, #E26721 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(cell.value).padStart(2, "0")}
                </span>
                <span
                  className="mt-1.5 text-[9px] tracking-[0.3em] uppercase text-[#8A8280]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {cell.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function SaveTheDate() {
  return (
    <section className="mt-14">
      {/* Cinematic image band */}
      <div
        className="sd-clip relative mx-5 h-[50vh] rounded-3xl overflow-hidden border border-[#EBE6E2]/8"
        style={{ boxShadow: "0 22px 50px rgba(0,0,0,0.5)" }}
      >
        <div className="sd-parallax absolute inset-0">
          <Image
            src="/curated/glimpses/this-generation-fire.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={74}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/35 to-[#0C070A]/20" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <SectionLabel color="#D62A5F">The place</SectionLabel>
          <h2
            className="mt-2 text-[2.7rem] font-bold leading-[0.98] text-[#EBE6E2]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tulsa, <span className="italic gradient-text-fire">again</span>.
          </h2>
        </div>
      </div>

      <div className="px-5">
        <p
          className="sd-reveal-blur mt-6 text-[#8A8280] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Same ground where it broke open in &apos;25 — and we&apos;re widening the doors.
        </p>

        <div
          className="sd-rise mt-6 rounded-2xl p-5 border border-[#EBE6E2]/8"
          style={{ background: "rgba(22,16,14,0.65)" }}
        >
          <div className="flex items-start gap-3 mb-5">
            <MapPin size={18} className="text-[#E26721] mt-0.5 flex-shrink-0" />
            <div>
              <div
                className="text-[#EBE6E2] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {VENUE.name}
              </div>
              <div
                className="mt-0.5 text-[#8A8280] text-[12px]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {VENUE.address}
              </div>
            </div>
          </div>

          <a
            href={VENUE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-touch flex items-center justify-center gap-2 rounded-full py-3 text-[#EBE6E2] text-[12px] tracking-[0.22em] uppercase font-semibold active:scale-[0.97] transition-transform"
            style={{
              fontFamily: "var(--font-mono)",
              background: "linear-gradient(135deg, #E26721 0%, #D62A5F 60%, #9E1194 100%)",
              boxShadow: "0 8px 24px rgba(226,103,33,0.3)",
            }}
          >
            <MapPin size={14} /> Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}

function VideoEmbed({ videoId, label }: { videoId: string; label: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      className="relative aspect-video rounded-2xl overflow-hidden border border-[#E26721]/22"
      style={{ boxShadow: "0 22px 50px rgba(0,0,0,0.55)" }}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="mobile-touch group absolute inset-0 active:scale-[0.99] transition-transform"
          aria-label={`Play ${label}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/80 via-[#0C070A]/15 to-[#0C070A]/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-16 w-16 flex items-center justify-center rounded-full"
              style={{
                background: "rgba(226,103,33,0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(226,103,33,0.5)",
                boxShadow: "0 0 30px rgba(226,103,33,0.4)",
              }}
            >
              <Play size={22} className="text-[#EBE6E2] ml-1" fill="#EBE6E2" />
            </div>
          </div>
          <div
            className="absolute bottom-3 left-4 right-4 text-left text-[#EBE6E2]/85 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Watch — {label}
          </div>
        </button>
      )}
    </div>
  )
}

function Recap() {
  return (
    <section className="px-5 mt-16">
      <FadeIn>
        <SectionLabel color="#9E1194">In our own words</SectionLabel>
        <H2>
          Do it again <span className="italic gradient-text-fire">in our times</span>.
        </H2>
      </FadeIn>

      <FadeIn delay={120}>
        <div className="mt-6 space-y-4">
          <VideoEmbed videoId="1UTJeE4VuQw" label="Activate 2025 · Day 1" />
          <VideoEmbed videoId="Hc4VJuHlREA" label="Activate 2025 · Day 2" />
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <figure className="mt-10 text-center">
          <blockquote
            className="text-[18px] italic text-[#EBE6E2]/85 leading-relaxed px-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            “O LORD, I have heard of what You have done, and I am filled with{" "}
            <span className="not-italic font-semibold gradient-text-fire">awe</span>.”
          </blockquote>
          <figcaption
            className="mt-4 text-[10px] tracking-[0.45em] uppercase text-[#E26721]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Habakkuk 3:2
          </figcaption>
        </figure>
      </FadeIn>
    </section>
  )
}

function PillarsList() {
  return (
    <section className="mt-16">
      <div className="px-5 mb-6 sd-reveal">
        <SectionLabel color="#E26721">Activate pillars</SectionLabel>
        <H2>
          Four words we won&apos;t <span className="italic gradient-text-fire">put down</span>.
        </H2>
      </div>

      {/* Sticky-stacking scene — each pillar pins full-screen and the next
          slides over it as you scroll. */}
      <div className="relative">
        {PILLARS.map((p, i) => (
          <div key={p.word} className="sd-stack-card">
            <div className="sd-stack-inner relative h-full w-full overflow-hidden rounded-t-[2rem]">
              <div className="sd-parallax absolute inset-0">
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={74}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/95 via-[#0C070A]/40 to-[#0C070A]/55" />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-45"
                style={{ background: `radial-gradient(ellipse at 30% 75%, ${p.color}, transparent 62%)` }}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-7 pb-20">
                <span
                  className="text-[10px] tracking-[0.45em] uppercase mb-3"
                  style={{ color: p.color, fontFamily: "var(--font-mono)" }}
                >
                  0{i + 1} / 0{PILLARS.length}
                </span>
                <div
                  className="font-black leading-[0.9]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3rem, 17vw, 5rem)",
                    backgroundImage: `linear-gradient(120deg, #FFFAF5 0%, ${p.color} 75%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: `0 0 24px ${p.color}44`,
                  }}
                >
                  {p.word}
                </div>
                <p
                  className="mt-4 text-[#EBE6E2]/85 text-[15px] leading-relaxed max-w-[92%]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {p.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function GlimpsesCarousel() {
  return (
    <section className="mt-16">
      <div className="px-5 sd-reveal-blur">
        <SectionLabel color="#D62A5F">Glimpses</SectionLabel>
        <H2>
          Frames from <span className="italic gradient-text-fire">last year</span>.
        </H2>
      </div>

      <div className="mt-7">
        <MarqueeGallery
          items={GLIMPSES.map((src, i) => ({
            src,
            year: i % 3 === 0 ? "ACTIVATE 2025" : i % 3 === 1 ? "DAY 1" : "DAY 2",
          }))}
          speed={0.4}
        />
      </div>
    </section>
  )
}

function ComingSoon() {
  const items = [
    { label: "Lineup", body: "Voices being prepared. Names revealed soon." },
    { label: "Schedule", body: "Two nights. Sessions, sets, and altar moments." },
    { label: "Registration", body: "Tickets open in waves. First wave drops first." },
    { label: "After-hours", body: "Happy Hour returns 5–8pm. Tables, food, family." },
  ]
  return (
    <section className="px-5 mt-16">
      <FadeIn>
        <SectionLabel color="#9E1194">What&apos;s coming</SectionLabel>
        <H2>
          Some things are <span className="italic gradient-text-fire">on the way</span>.
        </H2>
      </FadeIn>

      <div className="mt-7 space-y-3">
        {items.map((it, i) => (
          <FadeIn key={it.label} delay={70 + i * 50}>
            <div
              className="relative flex items-start gap-4 rounded-2xl p-4 border border-[#EBE6E2]/8 overflow-hidden"
              style={{ background: "rgba(22,16,14,0.55)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] tracking-[0.42em] uppercase text-[#E26721]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {it.label}
                  </span>
                  <span
                    className="text-[8px] tracking-[0.32em] uppercase text-[#8A8280] px-1.5 py-0.5 rounded-full border border-[#EBE6E2]/10"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Soon
                  </span>
                </div>
                <p
                  className="text-[#EBE6E2]/85 text-[15px] leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {it.body}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Invitation() {
  return (
    <section className="px-5 mt-16 mb-4">
      <FadeIn>
        <SectionLabel>The invitation</SectionLabel>
        <H2>
          Come <span className="italic gradient-text-fire">hungry</span>.
        </H2>
        <p
          className="mt-4 text-[#8A8280] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Bring a friend. Bring your questions. Bring an empty cup.
          We&apos;ll meet you at the altar.
        </p>
      </FadeIn>

      <FadeIn delay={120}>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {[
            {
              label: "Volunteer",
              sub: "Register now",
              href: "https://docs.google.com/forms/d/1iNhSf37vS_V2zufP9fBK1gqCUNXracBSf9N24E98wl8/viewform",
            },
            {
              label: "Give",
              sub: "Support the vision",
              href: "https://btgii.app.neoncrm.com/forms/activate2025",
            },
          ].map((b) => (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-touch flex flex-col items-center justify-center rounded-2xl py-5 active:scale-[0.97] transition-transform select-none"
              style={{
                background:
                  "linear-gradient(135deg, #E26721 0%, #D62A5F 60%, #9E1194 100%)",
                border: "1px solid rgba(226,103,33,0.45)",
                boxShadow: "0 10px 28px rgba(226,103,33,0.32)",
                minHeight: "44px",
              }}
            >
              <span
                className="text-[#EBE6E2] tracking-[0.22em] uppercase text-[12px] font-bold"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {b.label}
              </span>
              <span
                className="mt-1 text-[8px] tracking-[0.32em] uppercase text-[#EBE6E2]/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {b.sub}
              </span>
            </a>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <p
          className="mt-10 text-center text-[10px] tracking-[0.45em] uppercase text-[#E26721]/85"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          This generation · This hour · This fire
        </p>
      </FadeIn>
    </section>
  )
}

function StickyCTA() {
  return (
    <div
      className="fixed left-0 right-0 z-30 px-4 mobile-safe-bottom pointer-events-none"
      style={{ bottom: "1rem" }}
    >
      <div className="pointer-events-auto max-w-md mx-auto">
        <Link
          href={VENUE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-touch flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-[#EBE6E2] text-[12px] tracking-[0.22em] uppercase font-semibold active:scale-[0.98] transition-transform"
          style={{
            fontFamily: "var(--font-mono)",
            background: "linear-gradient(135deg, #E26721 0%, #D62A5F 60%, #9E1194 100%)",
            boxShadow: "0 12px 30px rgba(226,103,33,0.45), 0 0 30px rgba(214,42,95,0.25)",
          }}
        >
          <MapPin size={14} /> Get directions
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}

/* ─── PAGE ─────────────────────────────────────────────────── */

export default function MobileActivatePage() {
  return (
    <main className="relative bg-[#0C070A] text-[#EBE6E2] min-h-screen pb-28">
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="sd-progress fixed top-0 left-0 right-0 h-[3px] z-[45] origin-left"
        style={{
          background: "linear-gradient(90deg, #F08D28, #E26721, #D62A5F, #9E1194)",
        }}
      />
      <Hero />
      <CountdownCard />
      <SaveTheDate />
      <Recap />
      <PillarsList />
      <Bridge eyebrow="Psalm 85:6">
        Will you not <span className="gradient-text-fire not-italic font-semibold">revive us again</span>, that your people may rejoice in you?
      </Bridge>
      <GlimpsesCarousel />
      <ComingSoon />
      <Bridge eyebrow="Activate 26">
        This generation. This hour. <span className="gradient-text-fire not-italic font-semibold">This fire</span>.
      </Bridge>
      <Invitation />
      <MobileFooter />
      <StickyCTA />
    </main>
  )
}
