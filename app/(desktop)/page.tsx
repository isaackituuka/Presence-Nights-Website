import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd } from "@/lib/seo"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { SceneWeAre } from "@/components/scenes/02-we-are"
import { ScenePursuit } from "@/components/scenes/03-pursuit"
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop"
import { AmbientAudio } from "@/components/ui/ambient-audio"
import { SceneRail } from "@/components/ui/scene-rail"
import { HashLandingAdjuster } from "@/components/ui/hash-landing-adjuster"

// Below-fold scenes: code-split so they don't block initial JS parse
const SceneConvictions = dynamic(() =>
  import("@/components/scenes/04-convictions").then((m) => ({ default: m.SceneConvictions }))
)
const GlobeSection = dynamic(() =>
  import("@/components/sections/globe").then((m) => ({ default: m.GlobeSection }))
)
const SceneGlimpses = dynamic(() =>
  import("@/components/scenes/05b-glimpses").then((m) => ({ default: m.SceneGlimpses }))
)
const SceneBridge = dynamic(() =>
  import("@/components/ui/scene-bridge").then((m) => ({ default: m.SceneBridge }))
)
const SceneGather = dynamic(() =>
  import("@/components/scenes/06-gather").then((m) => ({ default: m.SceneGather }))
)
const Footer = dynamic(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
)

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <main className="relative bg-[#000000]">
      <JsonLd
        id="presence-home-breadcrumb-jsonld"
        data={breadcrumbJsonLd([{ name: "Presence Nights", path: "/" }])}
      />
      <AmbientBackdrop />
      <Navbar />
      <SceneRail />
      <AmbientAudio />
      <HashLandingAdjuster />

      {/* SCENE 01 — PRESENCE */}
      <HeroSection />

      {/* SCENE 02 — WE ARE (pinned manifesto) */}
      <SceneWeAre />

      {/* SCENE 03 — THE PURSUIT (horizontal pillar scroll) */}
      <ScenePursuit />

      {/* SCENE 04 — CONVICTIONS (sticky belief reveal) */}
      <SceneConvictions />

      {/* SCENE 05 — A MOVEMENT (globe with gallery photo markers) */}
      <div id="movement" className="relative">
        <GlobeSection />
      </div>

      {/* SCENE 05.5 — GLIMPSES (cinematic photo reel) */}
      <SceneGlimpses />

      {/* Bridge — calm beat between Movement and Gather */}
      <SceneBridge />

      {/* SCENE 06 — GATHER (featured event + schedule + connect) */}
      <SceneGather />

      <Footer />
    </main>
  )
}
