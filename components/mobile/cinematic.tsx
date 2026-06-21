import Image from "next/image"

/* Shared mobile cinematic primitives — pure markup + CSS (no client hooks),
   so they work in both server and client mobile pages. */

export type MarqueeItem = {
  src: string
  caption?: string
  year?: string
}

/**
 * Auto-scrolling, infinite horizontal gallery. No manual swipe needed —
 * the track drifts continuously (and pauses for reduced-motion). The
 * image set is duplicated so the loop is seamless.
 */
export function MarqueeGallery({
  items,
  duration = 44,
  reverse = false,
}: {
  items: MarqueeItem[]
  duration?: number
  reverse?: boolean
}) {
  const track = [...items, ...items]
  return (
    <div className="sd-marquee-mask overflow-hidden">
      <div
        className="activate-marquee flex w-max gap-4 pl-4"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((it, i) => (
          <figure
            key={i}
            className="relative m-0 flex-shrink-0 w-[66vw] max-w-[290px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#EBE6E2]/8"
            style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.5)" }}
          >
            <Image
              src={it.src}
              alt={it.caption ?? ""}
              fill
              sizes="66vw"
              quality={70}
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/85 via-transparent to-transparent" />
            {it.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                {it.year && (
                  <span
                    className="block text-[9px] tracking-[0.4em] uppercase text-[#E26721] mb-1.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {it.year}
                  </span>
                )}
                <span
                  className="block text-[#EBE6E2] text-[15px] italic leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {it.caption}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}

/**
 * Cinematic section bridge — a centered phrase that rises in, holds, then
 * lifts away as you scroll through it (scroll-driven). Falls back to a
 * static centered phrase where scroll timelines aren't supported.
 */
export function Bridge({
  eyebrow,
  children,
}: {
  eyebrow?: string
  children: React.ReactNode
}) {
  return (
    <section className="px-7 py-24 text-center">
      <div className="sd-bridge mx-auto max-w-md">
        {eyebrow && (
          <span
            className="block text-[10px] tracking-[0.5em] uppercase text-[#8A8280] mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {eyebrow}
          </span>
        )}
        <p
          className="text-[1.9rem] leading-[1.25] italic text-[#EBE6E2]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {children}
        </p>
        <span className="sd-bridge-line mt-8 mx-auto block h-px w-32 bg-gradient-to-r from-transparent via-[#E26721] to-transparent" />
      </div>
    </section>
  )
}
