"use client"

import { Heart, MapPin } from "lucide-react"

const footerLinks = {
  Navigate: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Pillars", href: "/#pillars" },
    { label: "Events", href: "/#events" },
    { label: "Community", href: "/#community" },
    { label: "Connect", href: "/#connect" },
  ],
  Gatherings: [
    { label: "Presence Nights", href: "/#events" },
    { label: "Prayer Stretches", href: "/#events" },
    { label: "ACTIVATE 2026", href: "/activate-26" },
    { label: "Crossover 2027", href: "/#events" },
  ],
  "Get Involved": [
    { label: "Join the Movement", href: "/#connect" },
    { label: "Lead With Us", href: "/#connect" },
    { label: "Prayer Team", href: "/#connect" },
    { label: "Worship Team", href: "/#connect" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(226,103,33,0.03)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full border border-[#E26721]/40 flex items-center justify-center animate-pulse-glow">
                <span
                  className="text-[#E26721] font-bold text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PN
                </span>
              </div>
              <div>
                <div
                  className="text-[#EBE6E2] font-bold text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Presence Nights
                </div>
                <div
                  className="text-[#E26721] text-xs tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  TULSA
                </div>
              </div>
            </div>

            <p
              className="text-[#8A8280] text-sm leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Young adults burning for one thing: HIS PRESENCE. Gathering in Tulsa, Oklahoma every
              last Friday of the month.
            </p>

            <div className="flex items-center gap-2 text-[#8A8280]/50 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
              <MapPin size={10} className="text-[#E26721]" />
              Tulsa, Oklahoma
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-[#E26721] text-xs tracking-[0.35em] uppercase mb-5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#8A8280] text-sm hover:text-[#EBE6E2] transition-colors duration-200 flex items-center gap-1.5 group"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#E26721] transition-all duration-300 shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[#8A8280]/40 text-xs"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} Presence Nights Tulsa. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-[#8A8280]/40 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            Built by <i>Junior Kituuka</i> <Heart size={10} className="text-[#D62A5F] mx-0.5 fill-current" /> for His presence
          </div>

          <div className="divider-gradient w-full md:hidden opacity-20" />
        </div>
      </div>
    </footer>
  )
}
