"use client"

import { useEffect } from "react"

const SECTION_LANDING: Record<string, number> = {
  "#connect": 0.45,
  "#community": 0.2,
  "#events": 0.1,
  "#pillars": 0.05,
  "#about": 0.14,
  "#movement": 0,
}

export function HashLandingAdjuster() {
  useEffect(() => {
    const settleHash = () => {
      const hash = window.location.hash
      if (!hash) return
      const el = document.getElementById(hash.slice(1))
      if (!el) return
      const offsetFrac = SECTION_LANDING[hash] ?? 0
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top + el.offsetHeight * offsetFrac, behavior: "auto" })
    }

    const id = window.setTimeout(settleHash, 120)
    window.addEventListener("hashchange", settleHash)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener("hashchange", settleHash)
    }
  }, [])

  return null
}
