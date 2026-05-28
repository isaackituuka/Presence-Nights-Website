const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://presencenights.com"

export const siteConfig = {
  name: "Presence Nights",
  url: rawSiteUrl.replace(/\/$/, ""),
  title: "Presence Nights Tulsa | Young Adults Worship & Prayer Gatherings",
  description:
    "Presence Nights is a Tulsa young adults worship and prayer collective gathering every last Friday to encounter Jesus, build community, and be changed by His presence.",
  shortDescription:
    "A Tulsa young adults worship and prayer collective gathering every last Friday to encounter Jesus.",
  email: "hello@presencenights.com",
  locale: "en_US",
  location: "Tulsa, Oklahoma",
  venue: {
    name: "Presence Nights Tulsa",
    streetAddress: "12231 S. 74th E Ave.",
    addressLocality: "Bixby",
    addressRegion: "OK",
    postalCode: "74008",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/presencenights",
    "https://instagram.com/presencenightstulsa",
    "https://www.youtube.com/@PresenceNights",
    "https://www.tiktok.com/@presencenights.tu",
  ],
  images: {
    home: "/og/presence-nights.jpg",
    activate: "/og/activate-26.jpg",
    leadership: "/og/leadership.jpg",
    logo: "/icon.png",
  },
} as const

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.images.logo),
    image: absoluteUrl(siteConfig.images.home),
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: {
      "@type": "City",
      name: "Tulsa",
      addressRegion: "OK",
      addressCountry: "US",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.venue.streetAddress,
      addressLocality: siteConfig.venue.addressLocality,
      addressRegion: siteConfig.venue.addressRegion,
      postalCode: siteConfig.venue.postalCode,
      addressCountry: siteConfig.venue.addressCountry,
    },
    sameAs: siteConfig.sameAs,
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-US",
    description: siteConfig.shortDescription,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function activate26EventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": absoluteUrl("/activate-26#event"),
    name: "Activate 26 — Presence Nights Tulsa",
    description:
      "Activate 26 is a two-day Presence Nights gathering in Bixby near Tulsa for worship, prayer, discipleship, and commissioning a generation to burn for Jesus.",
    url: absoluteUrl("/activate-26"),
    image: [absoluteUrl(siteConfig.images.activate)],
    startDate: "2026-10-02T19:00:00-05:00",
    endDate: "2026-10-03",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: siteConfig.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.venue.streetAddress,
        addressLocality: siteConfig.venue.addressLocality,
        addressRegion: siteConfig.venue.addressRegion,
        postalCode: siteConfig.venue.postalCode,
        addressCountry: siteConfig.venue.addressCountry,
      },
    },
    organizer: {
      "@id": absoluteUrl("/#organization"),
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}
