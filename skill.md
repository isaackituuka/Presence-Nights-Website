# Presence Nights — Design & Build Skill

Cinematic, scroll-driven worship/community site. This doc captures every design
decision, pattern, and convention we've used so future work stays coherent.
Treat it as the source of truth before adding a new section or page.

---

## 1. Brand & Visual Language

### Color palette
```ts
// Primary surface
"#0C070A"  // Near-black background (always the canvas)
"#EBE6E2"  // Off-white body text
"#8A8280"  // Muted gray for meta / secondary copy

// Accent ramp (use in this order for hierarchical highlights)
"#E26721"  // Orange — primary accent, eyebrows, CTA glow, countdown dot
"#F08D28"  // Amber — variant warm tone (Tim's "Team Leader" badge)
"#D62A5F"  // Magenta-pink — secondary accent
"#9E1194"  // Deep magenta — tertiary accent / cool counterpoint
```

The accent ramp is also used as a left-to-right gradient for "fire" headlines:
```css
.gradient-text-fire   /* orange → pink → magenta */
.gradient-text-brand  /* same family, slightly cooler */
```

### Typography
- **Display:** `Playfair_Display` via `var(--font-display)` — used for h1/h2/h3
  serifs and italic accents. Weights 400–900, italic on accent words.
- **Sans:** `DM_Sans` via `var(--font-sans)` — body copy.
- **Mono:** `Space_Grotesk` via `var(--font-mono)` — eyebrows, counters,
  micro-labels. Always uppercase + heavy tracking (`tracking-[0.3em]` to
  `tracking-[0.5em]`).

### Tone
- Italic for emotional emphasis ("italic gradient-text-fire" on key words)
- Mono caps for labels ("06.1 — SCHEDULE", "07 — LEADERSHIP")
- Counters always zero-padded ("01 / 08", "01 — WHO WE ARE")

---

## 2. Page Architecture

### Single-page narrative on `/`
Sections live in `app/page.tsx` in this order:

```
HeroSection         (looping video bg)
SceneWeAre          (4-stage manifesto, sticky-pinned)
ScenePursuit        (4 horizontal pillar panels)
SceneConvictions    (5 belief cards w/ photo crossfade)
GlobeSection        (interactive d3 globe + region cards)
SceneGlimpses       (8 cinematic photos w/ scroll crossfade)
SceneBridge         (calm "And so —" beat)
SceneGather         (hero + schedule + connect)
Footer
```

### Standalone routes
- `/leadership` — full-page team showcase (3-3-2-1 cascade)

### Adding a new full-page route
Always include this chrome at the top of the new page:
```tsx
<AmbientBackdrop />
<CustomCursor />
<Navbar />
<AmbientAudio />
{/* page content */}
<Footer />
```

---

## 3. Scroll-driven Patterns (the core mechanic)

### Pinned scene with stage-based reveal
Used in every numbered Scene. Pattern:
```tsx
<section ref={ref} style={{ "--stage-vh": "95vh", height: `calc(${count} * var(--stage-vh))` }}>
  <div className="sticky top-0 h-screen w-full overflow-hidden">
    {stages.map((s, i) => (
      <Stage scrollYProgress={scrollYProgress} index={i} total={count} {...} />
    ))}
  </div>
</section>
```

Each `Stage` slices `scrollYProgress` into `[start, end]` segments and uses
`useTransform` for opacity, scale, blur, x/y motion.

### Stage-vh sizing guide
- **Tight cinematic** (one beat per stage): `90–100vh`
- **Reading-paced** (text-heavy stage): `120–140vh`
- **Avoid** anything `≥ 160vh` per stage — feels broken.
- Pursuit (horizontal scroll) is the exception at `160vh × 4`.

### Compress visible scroll without losing pacing
When animations only span 0–0.5 of a section's progress, the bottom half feels
empty. Two fixes:
1. Tighten transform input ranges (e.g. `[0, 0.45]` not `[0, 0.7]`)
2. Reduce `--stage-vh` to a tighter value

### Hero → next section overlap (the "I love that" pattern)
The transition between Hero and We Are felt broken because hero faded out then
We Are faded in sequentially. Fix:

1. Apply opacity transform to the **hero backdrop image** (not just text):
```tsx
const imageOpacity = useTransform(scrollYProgress, [0.05, 0.22], [1, 0])
```
2. Pull the next section up with a negative margin so they overlap visually:
```tsx
<section className="relative -mt-[55vh]">  // We Are starts inside hero's bottom
```

This creates a crossfade — the new section emerges from underneath the dissolving
hero. **Only use this when the previous section has a fading layer** (e.g.,
hero with scroll-driven opacity, or a sticky-pinned scene whose final stage
fades out). Don't overlap into a normal-flow section like GlobeSection — content
will literally collide.

### Smart-scroll navigation (lands at the cinematic moment)
Pinned sections animate content in via scroll progress. A naive `#anchor` click
lands at the section top where progress = 0 = nothing visible.

`components/navbar.tsx` defines:
```ts
const SECTION_LANDING: Record<string, number> = {
  "#connect":   0.45,  // socials visible
  "#community": 0.20,
  "#events":    0.10,
  "#pillars":   0.05,
  "#about":     0.02,
}
```

`smartScrollTo(href)` resolves the section, multiplies its height by the
landing fraction, and smooth-scrolls to that point. Hash links use
`/#anchor` so they work cross-page (clicking Connect from `/leadership`
navigates home + scrolls).

---

## 4. Component Patterns

### Section eyebrow
Every section has a mono-caps numbered eyebrow:
```tsx
<span className="text-[#E26721] text-[10px] tracking-[0.5em]"
      style={{ fontFamily: "var(--font-mono)" }}>
  03 — OUR CONVICTIONS
</span>
```
Place absolute `top-20 md:top-8 left-4 md:left-8` so it sits **below the
fixed navbar on mobile** but at the section's top-edge on desktop.

### Progress dots (mid-scene indicator)
4–8 small vertical dashes, top-right. The active one widens and brightens.
Pattern at top of `02-we-are.tsx`, `05b-glimpses.tsx`, `03-pursuit.tsx`.
Position: `top-20 right-4 md:top-8 md:right-8 z-20`.

### Card with photo + name + role (used in /leadership)
- Square photo `aspect-square rounded-2xl`
- Default: `grayscale-[0.35]` for unified mood
- Hover: `grayscale-0 scale-105` + radial orange glow overlay
- Photo dim: `w-44 sm:w-52 md:w-56` (regular), `w-72 sm:w-80 md:w-96` (featured)
- Bottom gradient `from-[#0C070A]/80` for legibility
- Name in display serif, role in mono caps below

### Social pill button
Filled icon disc + name (mono caps) + handle (sans bold) + arrow on hover:
```tsx
<a href={...} className="group flex items-center gap-3 px-5 py-3.5 rounded-full
        border backdrop-blur-md hover:scale-[1.04]"
   style={{ borderColor: `${color}50`, background: "rgba(22,16,14,0.85)" }}>
```
Each social uses its brand color. Defined at top of `06-gather.tsx`.

### Live countdown (`components/ui/countdown.tsx`)
Auto-targets the next "last Friday at 7:30 PM". Two variants:
- `variant="inline"` → `IN 22D 05H 00M` for use in meta lines
- `variant="card"` → larger card with pulsing dot, for hero blocks

Pulsing dot uses Tailwind's `animate-ping` over a solid dot.

---

## 5. Animation Best Practices

### Reduced-motion compliance
Always import:
```ts
import { useReducedMotion } from "framer-motion"
```
Components with `repeat: Infinity` animations must check:
```tsx
const reduce = useReducedMotion()
if (reduce) return null  // or return a static fallback
```
Already gated: `AmbientBackdrop`, `CustomCursor`, `ParticleField`.

### Custom cursor on touch
Skip rendering on touch devices entirely:
```tsx
if (typeof window !== "undefined" &&
    window.matchMedia?.("(hover: none), (pointer: coarse)").matches) return null
```

### Initial fade-in pattern
Standard entrance for any new component:
```tsx
initial={{ opacity: 0, y: 28 }}
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```
The cubic-bezier `[0.22, 1, 0.36, 1]` is the project's signature ease — use it
for all "settle" motions (slides, fades, scales).

### `useInView` triggering
Always pass `{ once: true, margin: "-80px" }` (or similar) so the animation
fires once and not on every re-entry, and triggers slightly before the element
hits the viewport edge.

---

## 6. Mobile Responsiveness Rules

The web design is the source of truth. Mobile receives **targeted overrides**,
never a redesign.

### Eyebrow placement (avoid navbar collision)
```tsx
className="absolute top-20 md:top-8 left-4 md:left-8"
```
The fixed navbar lives at `top-5` and is ~52px tall, so eyebrows need
`top-20` (80px) on mobile.

### Display-font sizing
Tend toward four-step responsive: `text-[X] sm:text-[Y] md:text-[Z] lg:text-[W]`.
Examples:
- Hero title: `text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]`
- Pursuit roman: `text-[6rem] sm:text-[9rem] md:text-[16rem]`
- Section padding: `py-16 md:py-24` (not `py-20 md:py-44`)

### Grid behaviors
Most grids should single-column on mobile. Use `md:` for 2-col, `lg:` for 3+.
The connect socials and globe region cards already do this correctly.

### Globe canvas (the special case)
Hardcoded canvas widths overflow small viewports. Track viewport width and
pass dynamically:
```tsx
const [size, setSize] = useState(480)
useEffect(() => {
  const update = () => {
    const w = window.innerWidth
    setSize(w < 768 ? Math.min(w - 56, 360) : 480)
  }
  update()
  window.addEventListener("resize", update)
  return () => window.removeEventListener("resize", update)
}, [])
```

---

## 7. Performance Workflow

### Image pipeline (`scripts/optimize-images.mjs`)
- Backs up originals to `public/<dir>-original/` (one-time)
- Resizes to `1920px max width`, JPEG quality 78, mozjpeg
- For globe markers: aggressively downsize to `256px` (only the 12 pinned)
- Run with: `node scripts/optimize-images.mjs`

### Hero video
Keep < 1MB if possible. Recommended ffmpeg:
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow \
  -vf "scale='min(1280,iw)':-2" -an -movflags +faststart hero.mp4
```
Always `muted autoPlay loop playsInline` (iOS Safari requires inline).

### Next.js config (`next.config.ts`)
```ts
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
compress: true,
poweredByHeader: false,
```

### Lazy-load heavy components
The Globe canvas uses `dynamic(... { ssr: false })` — d3 + GeoJSON only
loads on client and only when the component mounts. Apply this pattern to any
≥ 50KB JS dependency that's not above-the-fold.

### Lucide-react v1+ caveat
Brand icons (Instagram, YouTube, WhatsApp) were removed in v1.0. Inline
official-style SVG paths instead — see the icons defined at the top of
`06-gather.tsx`.

---

## 8. Audio (Ambient Loop)

`public/audio/ambient.mp3` — 45–90s seamless atmospheric pad, muted by default.
The "Tap for sound" prompt:
- Initial state: full pill at `bottom-6 right-6`
- After enable: collapses to icon-only when scrolled past hero
- Hovers: re-expands to "Click to mute"
- Hides while user is actively scrolling (700ms idle timer)
- Fades volume in/out over 1.4s

Component: `components/ui/ambient-audio.tsx`. Self-contained, no props.

---

## 9. Adding a New Scene (Checklist)

1. Create `components/scenes/0X-name.tsx`. Use `"use client"` + `useScroll`.
2. Pick the right structure:
   - **Pinned with stages:** copy from `04-convictions.tsx`
   - **Photo crossfade reel:** copy from `05b-glimpses.tsx`
   - **Horizontal scroll:** copy from `03-pursuit.tsx`
3. Set `--stage-vh` per the sizing guide above.
4. Add eyebrow with `top-20 md:top-8 left-4 md:left-8`.
5. Add progress dots top-right if multi-stage.
6. Wire content arrays at the top of the file (data-driven, not hardcoded).
7. Add `id="…"` if you want it nav-linkable.
8. Insert into `app/page.tsx` in the correct narrative position.
9. If it follows a fading section, optionally add `-mt-[Xvh]` overlap.
10. If it has scroll-driven entry animations and is nav-linkable, add an
    entry to `SECTION_LANDING` in `navbar.tsx` with the fraction at which
    content is visible.
11. Test at 375px width — adjust mobile classes.
12. Add a `useReducedMotion` gate if you have any `repeat: Infinity` animation.

---

## 10. Things to NOT Do

- Don't introduce a light theme. The aesthetic is dark-only.
- Don't put more than one CTA in the meta line below a hero (clutters).
- Don't render `CustomCursor` on touch devices.
- Don't reference `/main-emphasis-original/` or `/gallery-original/` from
  components — those are backups, not served assets.
- Don't add brand icons from lucide-react (they don't exist post-v1) — use
  inline SVG paths.
- Don't stack two pinned-scroll sections without an overlap or transition
  beat between them — feels disjointed.
- Don't use `top-8` for absolute-positioned eyebrows in pinned sections —
  always `top-20 md:top-8`.
- Don't write content directly into JSX. Define data arrays at the top of
  each scene file (matches existing conventions, easier to update).
- Don't add `priority` to more than 1–2 images per page (defeats lazy loading).

---

## 11. Quick Reference: File → Purpose

| File | What it does |
|---|---|
| `app/page.tsx` | Main narrative composition |
| `app/layout.tsx` | Metadata, fonts, root html/body |
| `app/leadership/page.tsx` | Standalone leadership cascade |
| `components/navbar.tsx` | Pill nav + smartScrollTo + mobile menu |
| `components/cursor.tsx` | Custom SVG cursor (desktop only) |
| `components/sections/hero.tsx` | Video hero + particles + scroll indicator |
| `components/sections/footer.tsx` | Three-column footer + brand mark |
| `components/sections/globe.tsx` | Interactive globe + region cards |
| `components/scenes/*.tsx` | Pinned scroll-driven scenes |
| `components/ui/ambient-backdrop.tsx` | Page-wide animated backdrop |
| `components/ui/ambient-audio.tsx` | Tap-for-sound prompt + audio loop |
| `components/ui/countdown.tsx` | Live "next gathering" timer |
| `components/ui/scene-bridge.tsx` | Calm transition beat between scenes |
| `components/ui/scene-rail.tsx` | Right-edge scene-progress nav (lg+ only) |
| `components/ui/typewriter.tsx` | Cycling typewriter effect (hero subline) |
| `components/ui/wireframe-dotted-globe.tsx` | d3 canvas globe (lazy-loaded) |
| `scripts/optimize-images.mjs` | One-shot sharp pipeline |

---

When in doubt, match the cadence of the existing scenes. The site reads as
**one continuous cinematic** — every new piece should feel like another beat
in the same film, not a separate page.
