import type { Metadata } from "next"
import type { ReactNode } from "react"
import { JsonLd } from "@/components/seo/json-ld"
import { absoluteUrl, breadcrumbJsonLd, siteConfig } from "@/lib/seo"

const title = "Presence Nights Leadership Team"
const description =
  "Meet the Presence Nights leadership team serving Tulsa young adults through worship, prayer, community, operations, and discipleship."
const image = absoluteUrl(siteConfig.images.leadership)

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/leadership" },
  openGraph: {
    title: `${title} · Presence Nights`,
    description,
    url: "/leadership",
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Presence Nights leadership team",
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

export default function LeadershipLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="leadership-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Presence Nights", path: "/" },
          { name: "Leadership", path: "/leadership" },
        ])}
      />
      {children}
    </>
  )
}
