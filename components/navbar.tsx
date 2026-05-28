"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { X, Menu } from "lucide-react"
import Link from "next/link"

type NavLinkSpec = { label: string; href: string; featured?: boolean }

const navLinks: NavLinkSpec[] = [
  { label: "Home",        href: "/#home"      },
  { label: "our dna",       href: "/#about"     },
  { label: "Pillars",     href: "/#pillars"   },
  { label: "Events",      href: "/#events"    },
  { label: "Activate 26", href: "/activate-26", featured: true },
  { label: "Leadership",  href: "/leadership" },
  { label: "Connect",     href: "/#connect"   },
]

// Sections with heavy scroll-driven entry animations need to land deeper than the top.
// Value is fraction of section height to scroll past its top so content is fully revealed.
const SECTION_LANDING: Record<string, number> = {
  "#connect": 0.45,
  "#events": 0.10,
  "#pillars": 0.05,
  "#about": 0.14,
}

/**
 * Smart in-page scroll for hash links. Returns true if it handled the click,
 * false if the caller should fall through to the default browser navigation.
 */
function smartScrollTo(href: string, onDone?: () => void): boolean {
  // Same-page hash — scroll within current page
  const isSamePageHash =
    href.startsWith("#") ||
    (href.startsWith("/#") && (typeof window === "undefined" || window.location.pathname === "/"))
  if (!isSamePageHash) return false

  const hashIndex = href.indexOf("#")
  const id = href.slice(hashIndex + 1)
  const el = document.getElementById(id)
  if (!el) return false

  const top = el.getBoundingClientRect().top + window.scrollY
  const lookup = href.startsWith("/") ? href.slice(1) : href
  const offsetFrac = SECTION_LANDING[lookup] ?? 0
  const target = top + el.offsetHeight * offsetFrac
  window.scrollTo({ top: target, behavior: "smooth" })
  if (onDone) onDone()
  return true
}

function NavLink({
  href,
  children,
  featured,
  isActive,
}: {
  href: string
  children: React.ReactNode
  featured?: boolean
  isActive?: boolean
}) {
  if (featured) {
    return (
      <a
        href={href}
        onClick={(e) => { if (smartScrollTo(href)) e.preventDefault() }}
        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#FFFFED] text-[10px] lg:text-[11px] tracking-[0.2em] uppercase transition-transform duration-300 hover:scale-[1.04] whitespace-nowrap"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Pulsing live dot */}
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <motion.span
            className="absolute inset-0 rounded-full bg-[#D85325]"
            animate={{ scale: [1, 2.2, 2.4], opacity: [0.55, 0.1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D85325] shadow-[0_0_8px_rgba(216,83,37,0.85)]" />
        </span>
        <span className="relative z-10 bg-gradient-to-r from-[#E66839] via-[#D85325] to-[#A9C0BF] bg-clip-text text-transparent font-semibold">
          {children}
        </span>
        {/* Pulsing border ring */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-[#D85325]/45 pointer-events-none"
          animate={{ opacity: [0.45, 0.95, 0.45], boxShadow: [
            "0 0 0px rgba(216,83,37,0.0), inset 0 0 0 rgba(216,83,37,0)",
            "0 0 16px rgba(216,83,37,0.55), inset 0 0 8px rgba(216,83,37,0.15)",
            "0 0 0px rgba(216,83,37,0.0), inset 0 0 0 rgba(216,83,37,0)",
          ] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Hover intensifier */}
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: "0 0 22px rgba(216,83,37,0.65), 0 0 50px rgba(169,192,191,0.35)" }} />
      </a>
    )
  }
  return (
    <a
      href={href}
      onClick={(e) => { if (smartScrollTo(href)) e.preventDefault() }}
      className={`group relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
        isActive ? "text-[#FFFFED]" : "text-[#8A8280] hover:text-[#FFFFED]"
      }`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span className="relative z-10">{children}</span>
      {/* Hover underline — only when not active */}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#D85325] via-[#A9C0BF] to-[#A9C0BF] transition-all duration-500 group-hover:w-full" />
      )}
      {/* Active section indicator — slides smoothly between links */}
      {isActive && (
        <motion.span
          layoutId="active-section-indicator"
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, #E66839, #D85325, #A9C0BF, #A9C0BF)",
            boxShadow: "0 0 8px rgba(216,83,37,0.65)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  )
}

// Section IDs in the order they appear on the homepage. Used to track which
// section is currently in view so the navbar can highlight the matching link.
const TRACKED_SECTIONS = ["home", "about", "pillars", "events", "connect"] as const

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const scrollProgress = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgress, { stiffness: 120, damping: 24 })

  // 0 = top of page, 1 = past 80px scroll
  const padX     = useTransform(smoothProgress, [0, 1], ["1.5rem", "1.1rem"])
  const padY     = useTransform(smoothProgress, [0, 1], ["0.75rem", "0.55rem"])
  const blurAmt  = useTransform(smoothProgress, [0, 1], [16, 28])
  const bgAlpha  = useTransform(smoothProgress, [0, 1], [0.4, 0.85])
  const ringOp   = useTransform(smoothProgress, [0, 1], [0.06, 0.22])
  const shadowOp = useTransform(smoothProgress, [0, 1], [0, 0.45])

  const bg     = useTransform(bgAlpha, (v) => `rgba(0,0,0,${v})`)
  const blur   = useTransform(blurAmt, (v) => `blur(${v}px)`)
  const border = useTransform(ringOp, (v) => `1px solid rgba(216,83,37,${v + 0.04})`)
  const shadow = useTransform(shadowOp, (v) => `0 12px 50px rgba(0,0,0,${v})`)

  useEffect(() => {
    const onScroll = () => {
      const v = Math.min(1, Math.max(0, window.scrollY / 80))
      scrollProgress.set(v)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollProgress])

  // Track which homepage section is currently in view. Active link gets
  // a sliding underline indicator. Only runs on routes where these sections
  // exist (home page).
  useEffect(() => {
    if (typeof window === "undefined") return
    // Only run section tracking on the home page where these IDs exist.
    if (window.location.pathname !== "/") {
      setActiveSection(null)
      return
    }

    // The currently-active section is whichever one overlaps a narrow band
    // around the middle of the viewport. The map preserves "the last seen
    // intersecting section" even when transitions briefly leave everything
    // outside the band.
    const visibilityMap = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibilityMap.set(entry.target.id, entry.intersectionRatio)
        }
        // Pick the section with the largest visibility ratio, preferring
        // the order in TRACKED_SECTIONS when there's a tie.
        let bestId: string | null = null
        let bestRatio = 0
        for (const id of TRACKED_SECTIONS) {
          const ratio = visibilityMap.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }
        if (bestId) setActiveSection(bestId)
      },
      {
        // The band stretches across the middle 40% of the viewport. A
        // section is "active" only while it overlaps this band.
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    const elements = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        <motion.div
          className="flex items-center gap-4 lg:gap-6 rounded-full whitespace-nowrap"
          style={{
            paddingLeft:    padX,
            paddingRight:   padX,
            paddingTop:     padY,
            paddingBottom:  padY,
            background:     bg,
            backdropFilter: blur,
            WebkitBackdropFilter: blur,
            border,
            boxShadow: shadow,
          }}
        >
          {/* Logo */}
          <Link
            href="/#home"
            onClick={(e) => { if (smartScrollTo("/#home")) e.preventDefault() }}
            className="flex items-center gap-2 group"
            aria-label="Presence Nights home"
          >
            <motion.div
              className="relative w-8 h-8 rounded-full border border-[#D85325]/50 flex items-center justify-center group-hover:border-[#D85325] transition-colors duration-300 group-hover:shadow-[0_0_16px_rgba(216,83,37,0.55)]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[#D85325] text-xs font-bold" style={{ fontFamily: "var(--font-display)" }}>PN</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-[#D85325]/5 group-hover:bg-[#D85325]/15 transition-colors duration-300"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-3.5 lg:gap-5">
            {navLinks.map((link) => {
              // Derive the section id from a "/#xyz" hash href so we can
              // match against the active section being tracked.
              const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null
              const isActive = sectionId !== null && sectionId === activeSection
              return (
                <NavLink
                  key={link.href}
                  href={link.href}
                  featured={link.featured}
                  isActive={isActive}
                >
                  {link.label}
                </NavLink>
              )
            })}
          </nav>

          {/* CTA — subtle gradient, glow on hover */}
          <Link
            href="/#connect"
            onClick={(e) => { if (smartScrollTo("/#connect")) e.preventDefault() }}
            className="relative hidden md:flex items-center gap-2 px-3.5 lg:px-4 py-1.5 rounded-full text-[#FFFFED] text-[10px] lg:text-[11px] font-semibold tracking-[0.14em] lg:tracking-[0.16em] uppercase transition-transform duration-300 hover:scale-[1.04] whitespace-nowrap shrink-0"
            style={{
              fontFamily: "var(--font-mono)",
              background: "linear-gradient(135deg, #D85325 0%, #A9C0BF 60%, #A9C0BF 100%)",
              boxShadow: "0 4px 18px rgba(216,83,37,0.25)",
            }}
          >
            <span className="relative z-10">Join the Movement</span>
            <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: "0 0 26px rgba(216,83,37,0.6), 0 0 60px rgba(169,192,191,0.35)" }} />
          </Link>

          <button
            className="md:hidden text-[#8A8280] hover:text-[#FFFFED] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile menu — circular reveal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#000000]/98 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 6%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,83,37,0.08),transparent_70%)]" />
            <nav className="relative z-10 flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (smartScrollTo(link.href, () => setIsOpen(false))) e.preventDefault()
                    else setIsOpen(false)
                  }}
                  className={
                    link.featured
                      ? "relative px-5 py-2 rounded-full text-3xl font-bold tracking-tight transition-transform hover:scale-[1.03]"
                      : "text-3xl font-bold text-[#FFFFED]/70 hover:text-[#FFFFED] transition-colors"
                  }
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  {link.featured ? (
                    <>
                      <span className="relative z-10 bg-gradient-to-r from-[#E66839] via-[#D85325] to-[#A9C0BF] bg-clip-text text-transparent">
                        {link.label}
                      </span>
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-[#D85325]/50"
                        animate={{ opacity: [0.45, 1, 0.45], boxShadow: [
                          "0 0 0px rgba(216,83,37,0)",
                          "0 0 30px rgba(216,83,37,0.55)",
                          "0 0 0px rgba(216,83,37,0)",
                        ] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </>
                  ) : link.label}
                </motion.a>
              ))}
              <motion.a
                href="/#connect"
                onClick={(e) => {
                  if (smartScrollTo("/#connect", () => setIsOpen(false))) e.preventDefault()
                  else setIsOpen(false)
                }}
                className="mt-3 px-8 py-3 rounded-full text-[#FFFFED] font-semibold tracking-[0.25em] uppercase text-sm"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "linear-gradient(135deg, #D85325 0%, #A9C0BF 60%, #A9C0BF 100%)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                Join the Gathering
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
