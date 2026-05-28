import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Presence Nights Tulsa",
    short_name: "Presence Nights",
    description:
      "Tulsa young adults gathering for worship, prayer, community, and His presence.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0C070A",
    theme_color: "#0C070A",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
