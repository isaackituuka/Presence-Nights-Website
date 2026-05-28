"use client"

import { useEffect, useState } from "react"

/** Next "last Friday of the month" at 7:30 PM local time. */
function nextLastFriday(now: Date = new Date()): Date {
  for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
    const probe = new Date(now.getFullYear(), now.getMonth() + monthOffset + 1, 0, 19, 30, 0, 0)
    // Walk back to Friday (5)
    while (probe.getDay() !== 5) probe.setDate(probe.getDate() - 1)
    if (probe.getTime() > now.getTime()) return probe
  }
  // Fallback (should not hit) — far future
  return new Date(now.getTime() + 86400000 * 30)
}

function format(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { tonight: true, days: 0, hours: 0, mins: 0 }
  const totalMins = Math.floor(diff / 60000)
  const days = Math.floor(totalMins / (60 * 24))
  const hours = Math.floor((totalMins % (60 * 24)) / 60)
  const mins = totalMins % 60
  return { tonight: false, days, hours, mins }
}

interface Props {
  className?: string
  variant?: "inline" | "card"
}

export function Countdown({ className = "", variant = "inline" }: Props) {
  const [target, setTarget] = useState<Date | null>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTarget(nextLastFriday()))
    const t = setInterval(() => {
      setTarget(nextLastFriday())
    }, 30_000)
    return () => {
      window.cancelAnimationFrame(frame)
      clearInterval(t)
    }
  }, [])

  if (!target) {
    // SSR-safe placeholder (avoids hydration mismatch from Date.now)
    return (
      <span
        className={`inline-flex items-center gap-2 text-[#8A8280] text-xs tracking-[0.3em] uppercase ${className}`}
        style={{ fontFamily: "var(--font-mono)" }}
        aria-label="Next gathering countdown loading"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E26721] animate-pulse" />
        Next gathering — loading
      </span>
    )
  }

  const { tonight, days, hours, mins } = format(target)
  const dateLabel = target.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })

  if (variant === "card") {
    return (
      <div
        className={`flex items-center gap-4 rounded-2xl border border-[#E26721]/30 px-4 py-3 backdrop-blur-md ${className}`}
        style={{ background: "rgba(22,16,14,0.6)" }}
        aria-live="polite"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#E26721]/60 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E26721]" />
        </span>
        <div className="flex flex-col">
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-[#8A8280]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Next gathering · {dateLabel}
          </span>
          <span
            className="text-base font-semibold text-[#EBE6E2] tabular-nums"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {tonight
              ? "Tonight at 7:30 PM"
              : `${days}d ${String(hours).padStart(2, "0")}h ${String(mins).padStart(2, "0")}m`}
          </span>
        </div>
      </div>
    )
  }

  // inline
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#EBE6E2]/85 ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
      aria-live="polite"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#E26721]/60 animate-ping" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E26721]" />
      </span>
      <span className="text-[#8A8280]">In</span>
      <span className="tabular-nums">
        {tonight ? "tonight" : `${days}d ${String(hours).padStart(2, "0")}h ${String(mins).padStart(2, "0")}m`}
      </span>
    </span>
  )
}
