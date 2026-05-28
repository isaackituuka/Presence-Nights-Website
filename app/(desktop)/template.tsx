"use client"

import { motion } from "framer-motion"
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar"

/**
 * Re-instantiates on every route change, giving us a clean place to apply
 * page-transition motion. Pairs with framer-motion's initial/animate.
 *
 * Also hosts the global scroll-progress bar so it appears on every page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ willChange: "opacity" }}
      >
        {children}
      </motion.div>
    </>
  )
}
