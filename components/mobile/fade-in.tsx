"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  /** Don't animate, just render */
  static?: boolean
}

/**
 * Lightweight scroll-triggered fade-in. Pure IntersectionObserver +
 * CSS, no framer-motion. Once visible, stays mounted with no listeners.
 */
export function FadeIn({ children, delay = 0, className = "", static: isStatic }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(isStatic ?? false)

  useEffect(() => {
    if (isStatic || shown) return
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [isStatic, shown])

  return (
    <div
      ref={ref}
      className={`mobile-fade ${shown ? "is-shown" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  )
}
