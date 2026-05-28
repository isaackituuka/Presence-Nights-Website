import type { MetadataRoute } from "next"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const routes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    images: [siteConfig.images.home],
  },
  {
    path: "/activate-26",
    changeFrequency: "monthly",
    priority: 0.9,
    images: [siteConfig.images.activate],
  },
  {
    path: "/leadership",
    changeFrequency: "monthly",
    priority: 0.8,
    images: [siteConfig.images.leadership],
  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-28T00:00:00-05:00")

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.images.map(absoluteUrl),
  }))
}
