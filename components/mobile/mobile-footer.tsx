import Link from "next/link"

export function MobileFooter() {
  return (
    <footer className="relative px-6 pt-12 pb-10 mobile-safe-pb border-t border-[#EBE6E2]/8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(226,103,33,0.05),transparent_55%)]" />
      <div className="relative space-y-8">
        <div className="flex items-center gap-3">
          <span
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E26721]/55"
            style={{ boxShadow: "0 0 14px rgba(226,103,33,0.22)" }}
          >
            <span className="text-[#E26721] text-xs font-bold" style={{ fontFamily: "var(--font-display)" }}>PN</span>
          </span>
          <div>
            <div className="text-[#EBE6E2] font-semibold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Presence Nights
            </div>
            <div className="text-[#E26721] text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              Tulsa
            </div>
          </div>
        </div>

        <p className="text-[#8A8280] text-sm leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
          Young adults burning for one thing — His presence. Gathering in Tulsa,
          last Friday of every month.
        </p>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/#about" },
            { label: "Activate 26", href: "/activate-26" },
            { label: "Leadership", href: "/leadership" },
            { label: "Connect", href: "/#connect" },
            { label: "Events", href: "/#events" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="mobile-touch text-[#EBE6E2]/85 text-sm py-1 active:text-[#E26721] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-[#EBE6E2]/6">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-[#8A8280]/70"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © 2026 Presence Nights · Built for His presence
          </p>
        </div>
      </div>
    </footer>
  )
}
