import type { Metadata } from "next"
import type { ReactNode } from "react"
import { MobileNavbar } from "@/components/mobile/mobile-navbar"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const image = absoluteUrl(siteConfig.images.home)

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Presence Nights Tulsa worship and prayer gathering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [image],
  },
}

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileNavbar />
      {children}
    </>
  )
}
