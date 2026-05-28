import type { Metadata } from "next"
import type { ReactNode } from "react"
import { JsonLd } from "@/components/seo/json-ld"
import { absoluteUrl, activate26EventJsonLd, breadcrumbJsonLd, siteConfig } from "@/lib/seo"

const title = "Activate 26 Tulsa Worship Gathering"
const description =
  "Activate 26 is a two-day Presence Nights gathering near Tulsa for worship, prayer, discipleship, and commissioning a generation to burn for Jesus."
const image = absoluteUrl(siteConfig.images.activate)

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/activate-26" },
  openGraph: {
    title: `${title} · Presence Nights`,
    description,
    url: "/activate-26",
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Activate 26 Presence Nights Tulsa worship gathering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · Presence Nights`,
    description,
    images: [image],
  },
}

export default function MobileActivate26Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd id="mobile-activate-26-event-jsonld" data={activate26EventJsonLd()} />
      <JsonLd
        id="mobile-activate-26-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Presence Nights", path: "/" },
          { name: "Activate 26", path: "/activate-26" },
        ])}
      />
      {children}
    </>
  )
}
