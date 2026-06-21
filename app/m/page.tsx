import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Lucide-react 1.14 doesn't ship an Instagram glyph — use an inline SVG.
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  )
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

import { FadeIn } from "@/components/mobile/fade-in"
import { MobileFooter } from "@/components/mobile/mobile-footer"
import { MarqueeGallery, Bridge } from "@/components/mobile/cinematic"

/* ─── DATA ────────────────────────────────────────────────── */

const PILLARS = [
  {
    label: "Prayer",
    body: "We believe there's no presence without prayer.",
    photo: "/Main Empashis/7N2A0276.jpg",
    color: "#E26721",
  },
  {
    label: "Worship",
    body: "We believe that we were created to worship.",
    photo: "/Main Empashis/IMG_0005.JPG",
    color: "#D62A5F",
  },
  {
    label: "Community",
    body: "We believe that purpose is discovered in community.",
    photo: "/Main Empashis/7N2A9803.jpg",
    color: "#9E1194",
  },
]

const CONVICTIONS = [
  { text: "His Presence is real", accent: "and can be experienced.", photo: "/Main Empashis/7N2A0091.jpg" },
  { text: "His Presence brings", accent: "real-life transformation.", photo: "/Main Empashis/7N2A0083.jpg" },
  { text: "His Presence sets", accent: "the captives free.", photo: "/Main Empashis/7N2A0014.jpg" },
  { text: "He inhabits", accent: "the praise of His people.", photo: "/Main Empashis/7N2A1844.jpg" },
]

const GLIMPSES = [
  { src: "/curated/glimpses/7N2A1794.jpg", caption: "If my people, who are called by my name,", year: "2 CHRON 7:14" },
  { src: "/curated/glimpses/7N2A0151.jpg", caption: "will humble themselves and pray,", year: "AND SEEK" },
  { src: "/curated/glimpses/IMG_4570.JPG", caption: "and seek my face,", year: "HIS FACE" },
  { src: "/curated/glimpses/7N2A0072.jpg", caption: "then I will hear from heaven,", year: "PROMISE" },
  { src: "/curated/glimpses/7N2A1708.jpg", caption: "and will forgive their sin,", year: "GRACE" },
  { src: "/curated/glimpses/7N2A0647.JPG", caption: "and will heal their land.", year: "REVIVAL" },
]

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

/** Frame with a parallax image that drifts as it scrolls past. */
function ParallaxImage({
  src,
  className = "",
  priority = false,
  overlay = true,
}: {
  src: string
  className?: string
  priority?: boolean
  overlay?: boolean
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="sd-parallax absolute inset-0">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          quality={74}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/70 via-transparent to-[#0C070A]/15" />
      )}
    </div>
  )
}

/* ─── SECTIONS ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <video
        src="/video/hero-mobile.mp4"
        poster="/hero-bg.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="sd-kenburns absolute inset-0 w-full h-full object-cover object-center"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/55 to-[#0C070A]/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,7,10,0.7)_100%)]" />

      <div
        className="sd-hero-away relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <span
          className="sd-load-pop sd-d1 relative inline-flex h-14 w-14 mb-6 items-center justify-center rounded-full border border-[#E26721]/55"
          style={{ boxShadow: "0 0 22px rgba(226,103,33,0.35)" }}
        >
          <span
            className="text-[#E26721] text-base font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PN
          </span>
        </span>

        <h1
          className="font-bold text-[#EBE6E2] leading-[0.95]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 14vw, 5rem)" }}
        >
          <span className="block overflow-hidden">
            <span className="sd-load-clip sd-d2 block">PRESENCE</span>
          </span>
          <span className="block overflow-hidden">
            <span className="sd-load-clip sd-d3 block">NIGHTS</span>
          </span>
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="sd-load-grow sd-d4 h-px w-8 bg-gradient-to-r from-transparent to-[#E26721]" />
          <span
            className="sd-load-fade sd-d4 text-[#E26721] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Tulsa
          </span>
          <span className="sd-load-grow sd-d4 h-px w-8 bg-gradient-to-l from-transparent to-[#E26721]" />
        </div>

        <p
          className="sd-load-rise sd-d5 mt-7 text-[#EBE6E2]/85 text-base px-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Come hungry. He will meet you here.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="sd-hero-away absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span
          className="text-[#8A8280]/70 text-[9px] tracking-[0.35em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Scroll
        </span>
        <span className="block w-px h-9 bg-gradient-to-b from-[#E26721] to-transparent" />
      </div>
    </section>
  )
}

function ActivateBanner() {
  return (
    <section className="px-5 -mt-14 relative z-20">
      <FadeIn>
        <Link
          href="/activate-26"
          className="sd-shimmer mobile-touch group block relative overflow-hidden rounded-3xl active:scale-[0.99] transition-transform"
          style={{
            background:
              "linear-gradient(135deg, rgba(240,141,40,0.18) 0%, rgba(226,103,33,0.18) 50%, rgba(158,17,148,0.18) 100%)",
            border: "1px solid rgba(226,103,33,0.45)",
            boxShadow:
              "0 22px 50px rgba(0,0,0,0.5), 0 0 30px rgba(226,103,33,0.15), inset 0 0 30px rgba(226,103,33,0.07)",
          }}
        >
          <div className="sd-parallax absolute inset-0">
            <Image
              src="/curated/glimpses/this-generation-fire.jpg"
              alt=""
              fill
              sizes="100vw"
              quality={70}
              className="object-cover opacity-30"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C070A]/70 via-transparent to-[#0C070A]/40" />

          <div className="relative px-5 py-5 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#E26721] mobile-pulse-ring" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E26721]" />
                </span>
                <span
                  className="text-[#E26721] text-[9px] tracking-[0.35em] uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Live · Oct 23 · 24, 2026
                </span>
              </div>
              <div
                className="font-bold text-[1.7rem] leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  backgroundImage:
                    "linear-gradient(135deg, #FFFAF5 0%, #F08D28 50%, #D62A5F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ACTIVATE&nbsp;26
              </div>
              <div
                className="mt-1.5 text-[#EBE6E2]/75 text-[12px] tracking-wide"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Two days. Tulsa. A generation.
              </div>
            </div>
            <ChevronRight size={22} className="text-[#E26721] flex-shrink-0 transition-transform group-active:translate-x-1" />
          </div>
        </Link>
      </FadeIn>
    </section>
  )
}

function NextGathering() {
  return (
    <section id="events" className="px-5 mt-12">
      <div className="sd-reveal-blur">
        <SectionLabel>The next gathering</SectionLabel>
        <H2>
          Last Friday <span className="italic gradient-text-fire">of the month</span>.
        </H2>
        <p
          className="mt-4 text-[#8A8280] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Every last Friday · 7:30 PM. The heartbeat of everything we do is His presence. Come hungry. Come expectant.
        </p>
      </div>

      <div
        className="sd-rise mt-6 rounded-2xl p-5 border border-[#EBE6E2]/8"
        style={{
          background: "rgba(22,16,14,0.65)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <p
          className="text-[#EBE6E2]/85 text-[14px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We meet at a private home. Join the WhatsApp group for the
          address and the latest updates.
        </p>

        <a
          href="https://chat.whatsapp.com/DCyTlkJf9E27cdilM8x7kh?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-touch mt-5 flex items-center justify-center gap-2 rounded-full py-3 text-[#EBE6E2] text-[12px] tracking-[0.22em] uppercase font-semibold active:scale-[0.97] transition-transform"
          style={{
            fontFamily: "var(--font-mono)",
            background: "linear-gradient(135deg, #E26721 0%, #D62A5F 60%, #9E1194 100%)",
            boxShadow: "0 8px 24px rgba(226,103,33,0.3)",
          }}
        >
          Connect with us
        </a>
        <div
          className="mt-3 text-center text-[#8A8280] text-[11px] tracking-[0.18em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Get the address &amp; join the group
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-5 mt-16">
      <div className="sd-reveal-blur">
        <SectionLabel>Who we are</SectionLabel>
        <H2>
          We are <span className="italic gradient-text-fire">young adults</span> burning for one thing.
        </H2>
        <p
          className="mt-5 text-[#8A8280] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Worshippers, intercessors, and friends who refuse to perform — only
          to host. We gather every month so a generation can meet Him in the
          unhurried weight of His presence.
        </p>
      </div>

      <ParallaxImage
        src="/curated/main/we-his-presence.jpg"
        className="sd-clip mt-7 aspect-[4/5] rounded-2xl border border-[#EBE6E2]/8"
      />
    </section>
  )
}

function Pillars() {
  return (
    <section id="pillars" className="mt-16">
      <div className="px-5 sd-reveal">
        <SectionLabel color="#D62A5F">Pillars</SectionLabel>
        <H2>
          Three things we <span className="italic gradient-text-fire">build on</span>.
        </H2>
        <p
          className="mt-3 text-[#8A8280] text-[13px] tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Swipe →
        </p>
      </div>

      <div
        className="mobile-snap-x mt-6 flex gap-4 overflow-x-auto pl-5 pr-5 pb-2"
        aria-label="The pillars"
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.label}
            className="sd-glimpse relative flex-shrink-0 w-[82%] aspect-[3/4] rounded-3xl overflow-hidden border border-[#EBE6E2]/10"
            style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
          >
            <div className="sd-parallax absolute inset-0">
              <Image
                src={p.photo}
                alt={p.label}
                fill
                sizes="82vw"
                quality={74}
                loading={i < 1 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/92 via-[#0C070A]/25 to-[#0C070A]/30" />
            <div
              className="absolute inset-0 mix-blend-overlay opacity-40"
              style={{ background: `linear-gradient(150deg, ${p.color}88, transparent 60%)` }}
            />

            <div className="absolute left-0 right-0 bottom-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: p.color, fontFamily: "var(--font-mono)" }}
                >
                  0{i + 1}
                </span>
                <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              </div>
              <div
                className="text-[2.4rem] font-bold leading-none text-[#EBE6E2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.label}
              </div>
              <p
                className="mt-3 text-[#EBE6E2]/80 text-[14px] leading-snug max-w-[90%]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* The signature cinematic moment — sticky-stacking conviction cards.
   Each card pins full-screen, the next slides over it as you scroll. */
function Convictions() {
  return (
    <section id="community" className="mt-16">
      <div className="px-5 mb-6 sd-reveal">
        <SectionLabel color="#9E1194">What we believe</SectionLabel>
        <H2>
          Our <span className="italic gradient-text-fire">convictions</span>.
        </H2>
      </div>

      <div className="relative">
        {CONVICTIONS.map((c, i) => (
          <div key={i} className="sd-stack-card">
            <div className="sd-stack-inner relative h-full w-full overflow-hidden rounded-t-[2rem]">
              <div className="sd-parallax absolute inset-0">
                <Image
                  src={c.photo}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={74}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/95 via-[#0C070A]/45 to-[#0C070A]/55" />

              <div className="absolute inset-0 flex flex-col justify-end p-7 pb-20">
                <span
                  className="text-[10px] tracking-[0.45em] uppercase text-[#E26721] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  0{i + 1} / 0{CONVICTIONS.length}
                </span>
                <p
                  className="text-[2.3rem] font-bold leading-[1.05] text-[#EBE6E2]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.text}{" "}
                  <span className="italic gradient-text-fire">{c.accent}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Glimpses() {
  return (
    <section className="mt-16">
      <div className="px-5 sd-reveal-blur">
        <SectionLabel color="#9E1194">Glimpses</SectionLabel>
        <H2>
          He met us <span className="italic gradient-text-fire">here</span>.
        </H2>
      </div>

      <div className="mt-7">
        <MarqueeGallery items={GLIMPSES} duration={46} />
      </div>
    </section>
  )
}

function Connect() {
  return (
    <section id="connect" className="px-5 mt-16">
      <div className="sd-reveal-blur">
        <SectionLabel>Connect</SectionLabel>
        <H2>
          Come <span className="italic gradient-text-fire">say hi</span>.
        </H2>
        <p
          className="mt-4 text-[#8A8280] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Bring your questions, your friends, your empty cup.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {[
          {
            icon: <InstagramIcon size={18} />,
            label: "Follow on Instagram",
            sub: "@presencenights",
            href: "https://www.instagram.com/presencenights?igsh=YWt3bTJheHpqeWw3",
          },
          {
            icon: <WhatsAppIcon size={18} />,
            label: "Join WhatsApp",
            sub: "Join the group",
            href: "https://chat.whatsapp.com/DCyTlkJf9E27cdilM8x7kh?mode=gi_t",
          },
          {
            icon: <YouTubeIcon size={18} />,
            label: "Watch on YouTube",
            sub: "@PresenceNights",
            href: "https://www.youtube.com/@PresenceNights",
          },
          {
            icon: <TikTokIcon size={18} />,
            label: "Follow on TikTok",
            sub: "@presencenights.tu",
            href: "https://www.tiktok.com/@presencenights.tu",
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sd-reveal mobile-touch flex items-center gap-4 rounded-2xl p-4 border border-[#EBE6E2]/8 active:scale-[0.99] transition-transform"
            style={{ background: "rgba(22,16,14,0.55)" }}
          >
            <span className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-full bg-[#E26721]/12 text-[#E26721]">
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div
                className="text-[#EBE6E2] font-semibold text-[15px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </div>
              <div
                className="text-[#8A8280] text-[12px] truncate"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.sub}
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8A8280] flex-shrink-0" />
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─── PAGE ─────────────────────────────────────────────────── */

export default function MobileHomePage() {
  return (
    <main className="relative bg-[#0C070A] text-[#EBE6E2] min-h-screen pb-12">
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="sd-progress fixed top-0 left-0 right-0 h-[3px] z-[45] origin-left"
        style={{
          background: "linear-gradient(90deg, #F08D28, #E26721, #D62A5F, #9E1194)",
        }}
      />
      <Hero />
      <ActivateBanner />
      <NextGathering />
      <About />
      <Bridge eyebrow="And so —">
        we make space <span className="gradient-text-fire not-italic font-semibold">every last Friday</span>, and we wait <span className="gradient-text-fire not-italic font-semibold">on Him</span>.
      </Bridge>
      <Pillars />
      <Convictions />
      <Glimpses />
      <Bridge eyebrow="The invitation">
        Come <span className="gradient-text-fire not-italic font-semibold">hungry</span>. He will meet you here.
      </Bridge>
      <Connect />
      <MobileFooter />
    </main>
  )
}
