"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
}

/**
 * Stylised "always-on" location card. Renders the full map illustration
 * (streets, buildings, fire pin) with a 3D parallax tilt on mouse move.
 */
export function LocationMap({
  location = "Bixby, OK",
  coordinates = "12231 S. 74th E Ave., Bixby, OK 74008",
  className,
}: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [6, -6])
  const rotateY = useTransform(mouseX, [-50, 50], [-6, 6])

  const springRotateX = useSpring(rotateX, { stiffness: 280, damping: 28 })
  const springRotateY = useSpring(rotateY, { stiffness: 280, damping: 28 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-[#D85325]/22 bg-[#000000] w-[300px] h-[230px] sm:w-[360px] sm:h-[280px] md:w-[420px] md:h-[320px]"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          boxShadow: "0 30px 70px rgba(0,0,0,0.55), 0 0 40px rgba(216,83,37,0.10)",
        }}
      >
        {/* Streets */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0%" y1="35%" x2="100%" y2="35%"
            stroke="#FFFFED" strokeOpacity="0.20" strokeWidth="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          />
          <motion.line
            x1="0%" y1="65%" x2="100%" y2="65%"
            stroke="#FFFFED" strokeOpacity="0.20" strokeWidth="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          />
          <motion.line
            x1="30%" y1="0%" x2="30%" y2="100%"
            stroke="#FFFFED" strokeOpacity="0.16" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          />
          <motion.line
            x1="70%" y1="0%" x2="70%" y2="100%"
            stroke="#FFFFED" strokeOpacity="0.16" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          />
          {[20, 50, 80].map((y, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
              stroke="#FFFFED" strokeOpacity="0.08" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.55 + i * 0.08 }}
            />
          ))}
          {[15, 45, 55, 85].map((x, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
              stroke="#FFFFED" strokeOpacity="0.08" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.6 + i * 0.08 }}
            />
          ))}
        </svg>

        {/* Buildings */}
        {[
          { top: "40%", left: "10%", w: "15%", h: "20%", d: 0.5 },
          { top: "15%", left: "35%", w: "12%", h: "15%", d: 0.6 },
          { top: "70%", left: "75%", w: "18%", h: "18%", d: 0.7 },
          { top: "20%", right: "10%", w: "10%", h: "25%", d: 0.55 },
          { top: "55%", left: "5%", w: "8%", h: "12%", d: 0.65 },
          { top: "8%", left: "75%", w: "14%", h: "10%", d: 0.75 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm bg-[#8A8280]/22 border border-[#8A8280]/15"
            style={{ top: b.top, left: b.left, right: b.right, width: b.w, height: b.h }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: b.d }}
          />
        ))}

        {/* Pin */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.3 }}
        >
          <svg
            width="36" height="36" viewBox="0 0 24 24" fill="none"
            style={{ filter: "drop-shadow(0 0 14px rgba(216,83,37,0.85))" }}
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#D85325" />
            <circle cx="12" cy="9" r="2.5" fill="#000000" />
          </svg>
        </motion.div>

        {/* Pin pulse ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-2 border-[#D85325]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 2.2, 2.6], opacity: [0.7, 0.15, 0] }}
          transition={{ duration: 2.2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Top-right live chip */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16100E]/70 backdrop-blur-sm border border-[#FFFFED]/8">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#D85325]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <span
            className="text-[10px] font-medium text-[#FFFFED]/80 tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Tulsa
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute inset-x-5 bottom-5">
          <h3
            className="text-[#FFFFED] font-semibold text-base tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {location}
          </h3>
          <p
            className="mt-0.5 text-[#8A8280] text-[11px] tracking-[0.05em]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {coordinates}
          </p>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-[#D85325] via-[#A9C0BF]/50 to-transparent" />
        </div>

        {/* Fade to bottom for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#000000] via-[#000000]/55 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}
