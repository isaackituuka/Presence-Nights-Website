"use client"

import Image from "next/image"

interface ImageAutoSliderProps {
  images?: string[]
  /** Animation duration in seconds — lower = faster scroll */
  duration?: number
  className?: string
}

const DEFAULT_IMAGES = [
  "/curated/glimpses/7N2A1783.JPG",
  "/curated/glimpses/7N2A1510.JPG",
  "/curated/glimpses/7N2A1369.JPG",
  "/curated/glimpses/7N2A1304.JPG",
  "/curated/glimpses/7N2A1045.JPG",
  "/curated/glimpses/7N2A0627.JPG",
  "/curated/glimpses/7N2A1143.JPG",
  "/curated/glimpses/7N2A0495.JPG",
  "/curated/glimpses/7N2A0335.JPG",
]

export function ImageAutoSlider({
  images = DEFAULT_IMAGES,
  duration = 36,
  className = "",
}: ImageAutoSliderProps) {
  // Duplicate so the loop is seamless
  const looped = [...images, ...images]

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="relative w-full"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex gap-5 md:gap-7 w-max activate-marquee"
          style={{ animationDuration: `${duration}s` }}
        >
          {looped.map((src, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-[#EBE6E2]/8 bg-[#16100E]"
              style={{
                boxShadow:
                  "0 18px 50px rgba(0,0,0,0.55), 0 0 30px rgba(226,103,33,0.10), inset 0 0 0 1px rgba(226,103,33,0.10)",
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 224px"
                quality={65}
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A]/55 via-transparent to-[#0C070A]/15 pointer-events-none" />
              {/* Fire glow ring on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(226,103,33,0.45), 0 0 30px rgba(226,103,33,0.55), 0 0 70px rgba(214,42,95,0.30)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
