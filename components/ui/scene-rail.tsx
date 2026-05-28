"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const SCENES = [
  { id: "home",      label: "01" },
  { id: "about",     label: "02" },
  { id: "pillars",   label: "03" },
  { id: "community", label: "04" },
  { id: "events",    label: "05" },
  { id: "connect",   label: "06" },
]

export function SceneRail() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.45
      let next = 0
      for (let i = 0; i < SCENES.length; i++) {
        const el = document.getElementById(SCENES[i].id)
        if (el && el.offsetTop <= mid) next = i
      }
      setActive(next)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {SCENES.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group relative flex items-center gap-3"
        >
          <span
            className="text-[10px] tracking-[0.3em] transition-all duration-500"
            style={{
              fontFamily: "var(--font-mono)",
              color: i === active ? "#FFFFED" : "rgba(138,130,128,0.45)",
              opacity: i === active ? 1 : 0,
              transform: i === active ? "translateX(0)" : "translateX(8px)",
            }}
          >
            {s.label}
          </span>
          <motion.span
            className="block rounded-full"
            animate={{
              width: i === active ? 24 : 8,
              height: 2,
              backgroundColor: i === active ? "#D85325" : "rgba(255,255,237,0.25)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </a>
      ))}
    </nav>
  )
}
