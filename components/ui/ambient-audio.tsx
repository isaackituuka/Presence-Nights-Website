"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

const SRC = "/audio/ambient.mp3"
const TARGET_VOLUME = 0.32
const FADE_MS = 1400
const HERO_THRESHOLD = 0.8 // fraction of viewport height to consider "past hero"
const SCROLL_IDLE_MS = 700 // ms after scroll stops before button reappears

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [muted, setMuted] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Create the audio element once
  useEffect(() => {
    const a = new Audio(SRC)
    a.loop = true
    a.preload = "none"
    a.volume = 0
    a.crossOrigin = "anonymous"
    audioRef.current = a

    const onError = () => {
      console.error("[AmbientAudio] failed to load", SRC, a.error)
    }
    a.addEventListener("error", onError)

    return () => {
      a.removeEventListener("error", onError)
      a.pause()
      audioRef.current = null
    }
  }, [])

  // Track scroll position + scroll-idle state
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null

    const onScroll = () => {
      const y = window.scrollY
      const threshold = window.innerHeight * HERO_THRESHOLD
      setPastHero(y > threshold)

      setIsScrolling(true)
      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => setIsScrolling(false), SCROLL_IDLE_MS)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  const fadeTo = (target: number) => {
    const a = audioRef.current
    if (!a) return
    const start = a.volume
    const t0 = performance.now()
    const tick = () => {
      if (!audioRef.current) return
      const k = Math.min(1, (performance.now() - t0) / FADE_MS)
      a.volume = start + (target - start) * k
      if (k < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const start = async () => {
    const a = audioRef.current
    if (!a) return
    try {
      await a.play()
      setEnabled(true)
      setMuted(false)
      fadeTo(TARGET_VOLUME)
    } catch (err) {
      console.error("[AmbientAudio] play() rejected:", err)
    }
  }

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (!enabled) {
      start()
      return
    }
    if (muted) {
      fadeTo(TARGET_VOLUME)
      setMuted(false)
    } else {
      fadeTo(0)
      setMuted(true)
    }
  }

  // Show full pill if: not enabled (Tap for sound) OR (enabled AND on hero) OR hovered
  // Show compact icon if: enabled AND past hero AND not hovered
  // Hide entirely if: actively scrolling
  const compact = enabled && pastHero && !isHovered
  const showPrompt = !enabled
  const visible = !isScrolling

  const labelText = !enabled ? "Tap for sound" : muted ? "Click to unmute" : "Click to mute"
  const playing = enabled && !muted
  const Icon = !enabled || muted ? (muted ? VolumeX : Volume2) : Volume2
  const iconColor = !enabled ? "#D85325" : muted ? "#8A8280" : "#D85325"

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="audio-button-wrap"
          className="fixed bottom-28 right-4 z-[60] sm:bottom-6 sm:right-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            onClick={toggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layout
            transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            className="flex items-center gap-2 rounded-full backdrop-blur-md text-[#FFFFED]"
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(0,0,0,0.65)",
              border: `1px solid rgba(216,83,37,${enabled && muted ? 0.25 : 0.45})`,
              boxShadow: showPrompt
                ? "0 8px 30px rgba(216,83,37,0.18)"
                : "0 4px 18px rgba(0,0,0,0.4)",
              padding: compact ? "10px" : "8px 16px",
            }}
            aria-label={labelText}
          >
            {playing ? (
              <Visualizer compact={compact} color={iconColor} />
            ) : (
              <Icon size={compact ? 14 : 12} style={{ color: iconColor }} />
            )}
            <AnimatePresence initial={false}>
              {!compact && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                  animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
                  exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[10px] tracking-[0.35em] uppercase whitespace-nowrap overflow-hidden"
                >
                  {labelText}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Three animated bars — visual cue that audio is playing. Time-based
 * (not audio-reactive) for performance.
 */
function Visualizer({ compact, color }: { compact: boolean; color: string }) {
  const h = compact ? 14 : 12
  return (
    <div
      className="flex items-center justify-center gap-[2px]"
      style={{ width: h, height: h }}
      aria-hidden="true"
    >
      {[0, 0.18, 0.36].map((delay) => (
        <motion.span
          key={delay}
          className="rounded-full"
          style={{ width: 2, background: color }}
          animate={{ height: ["28%", "100%", "28%"] }}
          transition={{
            duration: 0.95,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
