"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Thin gradient bar at the very top of the page that fills as the user
 * scrolls. Useful for orientation on long pages.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(to right, #D85325 0%, #E66839 30%, #A9C0BF 65%, #A9C0BF 100%)",
        boxShadow: "0 0 12px rgba(216,83,37,0.45)",
      }}
    />
  )
}
