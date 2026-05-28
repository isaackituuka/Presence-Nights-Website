import Image from "next/image"
import Link from "next/link"
import { ChevronRight, MapPin, Mail } from "lucide-react"

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
import { FadeIn } from "@/components/mobile/fade-in"
import { MobileFooter } from "@/components/mobile/mobile-footer"

/* ─── DATA ────────────────────────────────────────────────── */

const PILLARS = [
  {
    label: "Worship",
    body: "Sung, shouted, whispered. The room becomes the altar.",
    photo: "/curated/main/pillar-worship.jpg",
    color: "#E26721",
  },
  {
    label: "Prayer",
    body: "Persistent, unhurried, contending — until heaven moves.",
    photo: "/curated/main/pillar-prayer.jpg",
    color: "#F08D28",
  },
  {
    label: "Community",
    body: "Tables, testimonies, late-night conversations. Family.",
    photo: "/curated/main/pillar-community.jpg",
    color: "#D62A5F",
  },
  {
    label: "Growth",
    body: "Discipleship that costs us — formed by Word and Spirit.",
    photo: "/curated/main/pillar-growth.jpg",
    color: "#9E1194",
  },
]

const GLIMPSES = [
  "/curated/glimpses/worship-believers.jpg",
  "/curated/glimpses/altar-response.jpg",
  "/curated/glimpses/prayer-intercession.jpg",
  "/curated/glimpses/this-generation-fire.jpg",
  "/curated/glimpses/commissioning-circle.jpg",
  "/curated/glimpses/activated-family.jpg",
]

const VENUE = {
  name: "Bixby, OK",
  address: "12231 S. 74th E Ave., Bixby, OK 74008",
  mapsUrl:
    "https://maps.apple.com/?address=12231%20S.%2074th%20E%20Ave.%2C%20Bixby%2C%20OK%2074008",
}

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

/* ─── SECTIONS ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/55 to-[#0C070A]/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,7,10,0.7)_100%)]" />

      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <span
          className="relative inline-flex h-14 w-14 mb-6 items-center justify-center rounded-full border border-[#E26721]/55"
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
          PRESENCE
          <br />
          NIGHTS
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E26721]" />
          <span
            className="text-[#E26721] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Tulsa
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#E26721]" />
        </div>

        <p
          className="mt-7 text-[#EBE6E2]/85 text-base px-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Come hungry. He will meet you here.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
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
          className="mobile-touch group block relative overflow-hidden rounded-3xl active:scale-[0.99] transition-transform"
          style={{
            background:
              "linear-gradient(135deg, rgba(240,141,40,0.18) 0%, rgba(226,103,33,0.18) 50%, rgba(158,17,148,0.18) 100%)",
            border: "1px solid rgba(226,103,33,0.45)",
            boxShadow:
              "0 22px 50px rgba(0,0,0,0.5), 0 0 30px rgba(226,103,33,0.15), inset 0 0 30px rgba(226,103,33,0.07)",
          }}
        >
          <Image
            src="/curated/glimpses/this-generation-fire.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover opacity-30"
          />
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
                  Live · Oct 2–3, 2026
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
      <FadeIn>
        <SectionLabel>The next gathering</SectionLabel>
        <H2>
          Last Friday <span className="italic gradient-text-fire">of the month</span>.
        </H2>
        <p
          className="mt-4 text-[#8A8280] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Doors at 6:30. Worship at 7. We linger as long as He does.
        </p>
      </FadeIn>

      <FadeIn delay={120}>
        <div
          className="mt-6 rounded-2xl p-5 border border-[#EBE6E2]/8"
          style={{
            background: "rgba(22,16,14,0.65)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-[#E26721] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-[#EBE6E2] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {VENUE.name}
              </div>
              <div
                className="mt-0.5 text-[#8A8280] text-[13px]"
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
            className="mobile-touch mt-5 flex items-center justify-center gap-2 rounded-full py-3 text-[#EBE6E2] text-[12px] tracking-[0.22em] uppercase font-semibold active:scale-[0.97] transition-transform"
            style={{
              fontFamily: "var(--font-mono)",
              background: "linear-gradient(135deg, #E26721 0%, #D62A5F 60%, #9E1194 100%)",
              boxShadow: "0 8px 24px rgba(226,103,33,0.3)",
            }}
          >
            Get Directions
          </a>
        </div>
      </FadeIn>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-5 mt-16">
      <FadeIn>
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
      </FadeIn>

      <FadeIn delay={140}>
        <div className="mt-7 relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#EBE6E2]/8">
          <Image
            src="/curated/main/we-his-presence.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/65 via-transparent to-[#0C070A]/15" />
        </div>
      </FadeIn>
    </section>
  )
}

function Pillars() {
  return (
    <section id="pillars" className="px-5 mt-16">
      <FadeIn>
        <SectionLabel color="#D62A5F">Pillars</SectionLabel>
        <H2>
          Four things we <span className="italic gradient-text-fire">build on</span>.
        </H2>
      </FadeIn>

      <div className="mt-7 space-y-3">
        {PILLARS.map((p, i) => (
          <FadeIn key={p.label} delay={80 + i * 60}>
            <div
              className="relative flex items-center gap-4 rounded-2xl p-4 border border-[#EBE6E2]/8 overflow-hidden"
              style={{ background: "rgba(22,16,14,0.55)" }}
            >
              <div className="relative h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="64px"
                  quality={70}
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-60"
                  style={{ background: `linear-gradient(135deg, ${p.color}66, transparent)` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[#EBE6E2] text-lg font-bold leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.label}
                </div>
                <div
                  className="mt-1 text-[#8A8280] text-[13px] leading-snug"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {p.body}
                </div>
              </div>
              <span
                className="h-1 w-1 rounded-full flex-shrink-0"
                style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }}
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Glimpses() {
  return (
    <section className="mt-16">
      <div className="px-5">
        <FadeIn>
          <SectionLabel color="#9E1194">Glimpses</SectionLabel>
          <H2>
            Frames from <span className="italic gradient-text-fire">last month</span>.
          </H2>
        </FadeIn>
      </div>

      <FadeIn delay={120}>
        <div
          className="mobile-snap-x mt-7 flex gap-4 overflow-x-auto pl-5 pr-5 pb-2"
          aria-label="Photo gallery"
        >
          {GLIMPSES.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[78%] aspect-[4/5] rounded-2xl overflow-hidden border border-[#EBE6E2]/8"
              style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.45)" }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80vw"
                quality={70}
                loading={i < 2 ? "eager" : "lazy"}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/55 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}

function Connect() {
  return (
    <section id="connect" className="px-5 mt-16">
      <FadeIn>
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
      </FadeIn>

      <div className="mt-6 space-y-3">
        {[
          {
            icon: <Mail size={18} />,
            label: "Email us",
            sub: "hello@presencenights.com",
            href: "mailto:hello@presencenights.com",
          },
          {
            icon: <InstagramIcon size={18} />,
            label: "Follow on Instagram",
            sub: "@presencenightstulsa",
            href: "https://instagram.com/presencenightstulsa",
          },
          {
            icon: <TikTokIcon size={18} />,
            label: "Follow on TikTok",
            sub: "@presencenights.tu",
            href: "https://www.tiktok.com/@presencenights.tu",
          },
          {
            icon: <MapPin size={18} />,
            label: "Get Directions",
            sub: VENUE.name,
            href: VENUE.mapsUrl,
          },
        ].map((item, i) => (
          <FadeIn key={item.label} delay={80 + i * 60}>
            <a
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="mobile-touch flex items-center gap-4 rounded-2xl p-4 border border-[#EBE6E2]/8 active:scale-[0.99] transition-transform"
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
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ─── PAGE ─────────────────────────────────────────────────── */

export default function MobileHomePage() {
  return (
    <main className="relative bg-[#0C070A] text-[#EBE6E2] min-h-screen pb-12">
      <Hero />
      <ActivateBanner />
      <NextGathering />
      <About />
      <Pillars />
      <Glimpses />
      <Connect />
      <MobileFooter />
    </main>
  )
}
