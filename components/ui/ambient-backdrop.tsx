"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

/**
 * Page-level ambient backdrop. Fixed behind everything — adds subtle
 * animated light streaks + slow rotating rings so the page feels alive
 * as the user scrolls between sections. Pointer-events-none so it never
 * intercepts clicks.
 */
export function AmbientBackdrop() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const warmOpacity = useTransform(scrollYProgress, [0, 0.14, 0.32, 0.55, 0.78, 1], [0.75, 0.45, 0.95, 0.35, 0.8, 0.55])
  const magentaOpacity = useTransform(scrollYProgress, [0, 0.22, 0.42, 0.62, 0.82, 1], [0.45, 0.8, 0.35, 0.9, 0.55, 0.7])
  const streakOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.28, 0.52, 0.22, 0.58, 0.36])
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.22, 0.48])

  if (reduce) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(216,83,37,0.12) 0%, transparent 60%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(169,192,191,0.1) 0%, transparent 60%)", filter: "blur(100px)" }}
        />
      </div>
    )
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Top-right warm halo */}
      <motion.div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(216,83,37,0.12) 0%, transparent 60%)",
          filter: "blur(80px)",
          opacity: warmOpacity,
        }}
        animate={{ x: [0, 24, 0], y: [0, -16, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-left magenta halo */}
      <motion.div
        className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(169,192,191,0.1) 0%, transparent 60%)",
          filter: "blur(100px)",
          opacity: magentaOpacity,
        }}
        animate={{ x: [0, -20, 0], y: [0, 18, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Slow drifting horizontal light streak */}
      <motion.div
        className="absolute top-1/3 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 20%, rgba(216,83,37,0.25) 50%, transparent 80%)",
          opacity: streakOpacity,
        }}
        animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 25%, rgba(169,192,191,0.22) 50%, transparent 75%)",
          opacity: 0.4,
        }}
        animate={{ x: ["8%", "-8%", "8%"], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Faint rotating ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1100px] h-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(216,83,37,0.04)]"
        style={{ opacity: ringOpacity }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(169,192,191,0.04)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}
