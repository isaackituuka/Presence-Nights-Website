"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

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
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div
          className="mobile-touch flex items-center justify-between rounded-full px-4 py-2.5 transition-colors duration-300"
          style={{
            background: scrolled ? "rgba(12,7,10,0.78)" : "rgba(12,7,10,0.42)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(226,103,33,0.18)",
            boxShadow: scrolled ? "0 12px 30px rgba(0,0,0,0.45)" : "none",
          }}
        >
          <Link
            href="/"
            aria-label="Presence Nights"
            className="flex items-center gap-2"
          >
            <span
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E26721]/55"
              style={{ boxShadow: "0 0 14px rgba(226,103,33,0.25)" }}
            >
              <span
                className="text-[#E26721] text-xs font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                PN
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="mobile-touch h-10 w-10 -mr-1 flex items-center justify-center rounded-full text-[#EBE6E2]/85 active:scale-95 transition-transform"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Full-screen menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#0C070A] transition-opacity duration-300 ease-out"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(226,103,33,0.10),transparent_60%)]" />
          <nav className="relative h-full flex flex-col items-center justify-center gap-6 px-8">
            {links.map((l, i) => {
              const featured = "featured" in l && l.featured

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={
                    "mobile-touch relative w-full text-center py-3 rounded-full transition-transform active:scale-[0.98] " +
                    (featured
                      ? "border border-[#E26721]/55"
                      : "border border-transparent")
                  }
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: featured ? "2.4rem" : "2rem",
                    fontWeight: featured ? 700 : 600,
                    color: "#EBE6E2",
                    animation: `mobile-menu-item-in 0.4s ease ${0.05 + i * 0.06}s both`,
                    ...(featured
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg, #F08D28 0%, #E26721 50%, #D62A5F 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          boxShadow: "0 0 28px rgba(226,103,33,0.35)",
                        }
                      : {}),
                  }}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
