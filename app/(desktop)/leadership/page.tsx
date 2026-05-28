"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/sections/footer"
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop"
import { AmbientAudio } from "@/components/ui/ambient-audio"

type Leader = { name: string; role: string; photo: string }

// Cascading layout: 3 → 3 → 2 → 1 (Tim, the heart of the team)
const operations: Leader[] = [
  { name: "Sam", role: "Programming & Operations", photo: "/gallery/IMG_4571.JPG" },
  { name: "Aaron", role: "Programming & Operations", photo: "/gallery/IMG_4572.JPG" },
  { name: "Daniel", role: "Finance", photo: "/gallery/PHOTO-2026-04-03-13-38-27.JPG" },
]
const pastoral: Leader[] = [
  { name: "David", role: "Outreach & Prayer", photo: "/gallery/IMG_4573.JPG" },
  { name: "Debbie", role: "Community & Culture", photo: "/gallery/IMG_4574.JPG" },
  { name: "Sarah Joseph", role: "Community & Culture", photo: "/gallery/IMG_4576.JPG" },
]
const creative: Leader[] = [
  { name: "Sadie", role: "Marketing & Communication", photo: "/gallery/IMG_4577.JPG" },
  { name: "Wonder & Theo Joshua", role: "Worship", photo: "/gallery/Untitled (Poster (US)) - 1.PNG"},
]
const teamLeader: Leader = {
  name: "Tim",
  role: "Team Leader",
  photo: "/gallery/IMG_111.JPG",
}

function LeaderCard({ leader, size = "md", index = 0 }: { leader: Leader; size?: "md" | "lg"; index?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  // 3D tilt — rotate based on cursor position over the card
  const px = useMotionValue(0.5) // 0 = left edge, 1 = right edge
  const py = useMotionValue(0.5)
  const tiltAmt = size === "lg" ? 9 : 7
  const rotX = useSpring(useTransform(py, [0, 1], [tiltAmt, -tiltAmt]), { stiffness: 220, damping: 22 })
  const rotY = useSpring(useTransform(px, [0, 1], [-tiltAmt, tiltAmt]), { stiffness: 220, damping: 22 })
  const spotlight = useTransform(
    [px, py] as const,
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(226,103,33,0.28) 0%, rgba(214,42,95,0.12) 35%, transparent 65%)`,
  )

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  const dim = size === "lg" ? "w-72 sm:w-80 md:w-96" : "w-48 sm:w-60 md:w-72"
  const nameSize =
    size === "lg"
      ? "text-3xl md:text-4xl"
      : "text-xl md:text-2xl"
  const desktopLift = size === "lg" ? "" : index % 2 === 1 ? "md:translate-y-8" : "md:-translate-y-2"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${dim} ${desktopLift} flex-shrink-0 transition-transform duration-700`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-[rgba(255,255,255,0.09)] transition-colors duration-500 group-hover:border-[#E26721]/55"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          boxShadow: size === "lg" ? "0 18px 55px rgba(0,0,0,0.48)" : "0 12px 38px rgba(0,0,0,0.32)",
        }}
      >
        <Image
          src={leader.photo}
          alt={`${leader.name}, ${leader.role} on the Presence Nights leadership team`}
          fill
          sizes={size === "lg" ? "(min-width: 768px) 384px, 320px" : "(min-width: 768px) 288px, 240px"}
          className="object-cover grayscale-[0.2] brightness-[1.05] saturate-[0.92] contrast-[1.04] group-hover:grayscale-0 group-hover:brightness-[1.12] group-hover:saturate-100 transition-[filter,transform] duration-700 group-hover:scale-[1.07]"
        />
        {/* Bottom gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/72 via-[#0C070A]/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,103,33,0.08),transparent_45%,rgba(214,42,95,0.08))] opacity-70 mix-blend-screen pointer-events-none" />
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent mix-blend-screen pointer-events-none"
          initial={{ x: "-120%" }}
          animate={inView ? { x: "420%" } : {}}
          transition={{ duration: 1.25, delay: 0.28 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Cursor-following spotlight */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: spotlight }}
        />
      </motion.div>

      <div className="mt-4 text-center">
        <h3
          className={`${nameSize} font-bold text-[#EBE6E2] tracking-[-0.01em] leading-tight`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {leader.name}
        </h3>
        <p
          className={`mt-1.5 text-[10px] tracking-[0.3em] uppercase ${size === "lg" ? "text-[#E26721]" : "text-[#8A8280]"}`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {leader.role}
        </p>
      </div>
    </motion.div>
  )
}

function Row({ leaders, label, color }: { leaders: Leader[]; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <div ref={ref} className="relative">
      <motion.div
        className="flex items-center gap-3 mb-7 md:mb-9 justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span
          className="h-px w-10 md:w-16"
          style={{ background: `linear-gradient(to right, transparent, ${color})` }}
        />
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color }}
        >
          {label}
        </span>
        <span
          className="h-px w-10 md:w-16"
          style={{ background: `linear-gradient(to left, transparent, ${color})` }}
        />
      </motion.div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {leaders.map((l, i) => (
          <LeaderCard key={l.name} leader={l} index={i} />
        ))}
      </div>
    </div>
  )
}

function HeroBlock() {
  const ref = useRef<HTMLDivElement>(null)
  // start: hero top at viewport top (scrollY=0). end: hero bottom at viewport top (hero scrolled past).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const blur = useTransform(scrollYProgress, [0.4, 1], ["0px", "6px"])
  const filter = useTransform(blur, (v) => `blur(${v})`)

  return (
    <section
      ref={ref}
      className="relative pt-32 md:pt-36 pb-10 md:pb-16 px-6 md:px-12 text-center overflow-hidden"
    >
      <motion.div style={{ y, filter }} className="relative max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-block text-[#E26721] text-[10px] tracking-[0.6em] uppercase mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          07 — Leadership
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: "0.06em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#EBE6E2] leading-[0.95]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Our {" "}
          <span className="italic gradient-text-fire">leadership</span>
          <br />team
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 max-w-xl mx-auto text-[#8A8280] text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We lead so others can encounter his presence. 
        </motion.p>
      </motion.div>
    </section>
  )
}

function ClosingNote() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <section ref={ref} className="relative px-6 md:px-12 pb-24 md:pb-32 mt-16 md:mt-24">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span
          className="text-[10px] tracking-[0.5em] uppercase text-[#E26721]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          And many more —
        </span>
        <p
          className="mt-6 text-xl md:text-2xl italic text-[#EBE6E2]/80 leading-relaxed"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We are more than just a leadership team. Alongside us are countless hosts, intercessors, worshipers, and friends who make every gathering possible. 
          Together we host the presence of God and serve his generation. <span className="gradient-text-brand not-italic font-semibold">We are better together</span>.
        </p>
      </motion.div>
    </section>
  )
}

export default function LeadershipPage() {
  return (
    <main className="relative bg-[#0C070A] text-[#EBE6E2] min-h-screen">
      <AmbientBackdrop />
      <Navbar />
      <AmbientAudio />

      <HeroBlock />

      <div className="relative max-w-6xl mx-auto px-4 md:px-12 pb-12 md:pb-20 space-y-14 md:space-y-20">
        <Row leaders={operations} label="Operations" color="#E26721" />
        <Row leaders={pastoral} label="Discipleship & Community" color="#D62A5F" />
        <Row leaders={creative} label="Production & Worship" color="#9E1194" />

        {/* Capstone — Tim */}
        <div className="relative pt-4">
          <div className="flex items-center gap-3 mb-10 md:mb-14 justify-center">
            <span className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#F08D28]" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#F08D28]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Team Leader
            </span>
            <span className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#F08D28]" />
          </div>
          <div className="flex justify-center">
            <LeaderCard leader={teamLeader} size="lg" />
          </div>
        </div>
      </div>

      <ClosingNote />
      <Footer />
    </main>
  )
}
