"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "Home",        href: "/" },
  { label: "About",       href: "/#about" },
  { label: "Activate 26", href: "/activate-26", featured: true },
  { label: "Leadership",  href: "/leadership" },
  { label: "Connect",     href: "/#connect" },
] as const

export function MobileNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (open) document.documentElement.classList.add("mobile-no-scroll")
    else document.documentElement.classList.remove("mobile-no-scroll")
    return () => document.documentElement.classList.remove("mobile-no-scroll")
  }, [open])

  return (
    <>
      <header
        className="fixed top-3 left-3 right-3 z-50"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <motion.div
          className="mobile-touch flex items-center justify-between rounded-full"
          animate={{
            paddingLeft: scrolled ? "0.75rem" : "1rem",
            paddingRight: scrolled ? "0.5rem" : "0.75rem",
            paddingTop: scrolled ? "0.45rem" : "0.6rem",
            paddingBottom: scrolled ? "0.45rem" : "0.6rem",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: scrolled ? "rgba(0,0,0,0.82)" : "rgba(0,0,0,0.38)",
            backdropFilter: "blur(22px) saturate(140%)",
            WebkitBackdropFilter: "blur(22px) saturate(140%)",
            border: `1px solid rgba(216,83,37,${scrolled ? 0.22 : 0.14})`,
            boxShadow: scrolled
              ? "0 14px 38px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 6px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
            transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Presence Nights"
            className="flex items-center gap-2.5 shrink-0"
          >
            <motion.span
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(230,104,57,0.18), rgba(216,83,37,0.10) 50%, rgba(169,192,191,0.16))",
                border: "1px solid rgba(216,83,37,0.45)",
                boxShadow:
                  "0 0 14px rgba(216,83,37,0.20), inset 0 0 8px rgba(216,83,37,0.10)",
              }}
              whileTap={{ scale: 0.92 }}
            >
              {/* slow ambient ring */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-[#D85325]/30"
                animate={{
                  scale: [1, 1.22, 1],
                  opacity: [0.45, 0.05, 0.45],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span
                className="relative text-[#F4ECE6] text-[11px] font-bold tracking-[0.08em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                PN
              </span>
            </motion.span>

            {/* Wordmark fades out on scroll for cleanliness */}
            <motion.span
              className="text-[#FFFFED] text-[12px] tracking-[0.22em] uppercase shrink-0"
              style={{ fontFamily: "var(--font-mono)" }}
              animate={{
                opacity: scrolled ? 0 : 1,
                width: scrolled ? 0 : "auto",
                marginLeft: scrolled ? 0 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Presence
            </motion.span>
          </Link>

          {/* Live Activate 26 chip */}
          <Link
            href="/activate-26"
            className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0 mx-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(230,104,57,0.14), rgba(169,192,191,0.14))",
              border: "1px solid rgba(216,83,37,0.32)",
            }}
            aria-label="Activate 26"
          >
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                className="absolute inset-0 rounded-full bg-[#D85325]"
                animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#E66839]" />
            </span>
            <span
              className="text-[9.5px] tracking-[0.16em] uppercase font-semibold"
              style={{
                fontFamily: "var(--font-mono)",
                background:
                  "linear-gradient(135deg, #E66839 0%, #D85325 60%, #A9C0BF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#E66839",
              }}
            >
              Activate 26
            </span>
          </Link>

          {/* Menu / X — animated icon morph */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="mobile-touch relative h-9 w-9 flex items-center justify-center rounded-full text-[#FFFFED]/90 active:scale-90 transition-transform shrink-0"
            style={{
              background: "rgba(216,83,37,0.08)",
              border: "1px solid rgba(216,83,37,0.20)",
            }}
          >
            <IconMorph open={open} />
          </button>
        </motion.div>
      </header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: "rgba(0,0,0,0.94)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {/* Ambient backdrop */}
            <div className="absolute -top-32 -left-16 w-[420px] h-[420px] rounded-full bg-[#D85325]/12 blur-[110px]" />
            <div className="absolute bottom-0 -right-20 w-[420px] h-[420px] rounded-full bg-[#A9C0BF]/10 blur-[120px]" />

            <nav className="relative h-full flex flex-col items-center justify-center gap-5 px-8">
              {links.map((l, i) => {
                const featured = "featured" in l && l.featured

                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.08 + i * 0.06,
                    }}
                    className="w-full"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={
                        "mobile-touch relative w-full text-center py-3.5 rounded-2xl block active:scale-[0.98] transition-transform"
                      }
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: featured ? "2.25rem" : "1.9rem",
                        fontWeight: featured ? 700 : 600,
                        letterSpacing: "-0.01em",
                        color: featured ? "transparent" : "#FFFFED",
                        ...(featured && {
                          backgroundImage:
                            "linear-gradient(135deg, #E66839 0%, #D85325 50%, #A9C0BF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 0 28px rgba(216,83,37,0.30)",
                        }),
                      }}
                    >
                      {l.label}
                      {featured && (
                        <motion.span
                          aria-hidden
                          className="absolute -inset-1 rounded-2xl border border-[#D85325]/30 pointer-events-none"
                          animate={{
                            opacity: [0.35, 0.95, 0.35],
                            boxShadow: [
                              "0 0 0 rgba(216,83,37,0)",
                              "0 0 32px rgba(216,83,37,0.45)",
                              "0 0 0 rgba(216,83,37,0)",
                            ],
                          }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              {/* Tagline at bottom */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="absolute bottom-10 left-0 right-0 text-center text-[10px] tracking-[0.4em] uppercase text-[#8A8280]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Come hungry · Tulsa
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function IconMorph({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Top line — rotates to top of X */}
      <motion.line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        animate={
          open
            ? { x1: 5, y1: 5, x2: 19, y2: 19 }
            : { x1: 3, y1: 6, x2: 21, y2: 6 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Middle line — fades out when open */}
      <motion.line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      {/* Bottom line — rotates to bottom of X */}
      <motion.line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        animate={
          open
            ? { x1: 5, y1: 19, x2: 19, y2: 5 }
            : { x1: 3, y1: 18, x2: 21, y2: 18 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}
