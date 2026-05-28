import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://i.ytimg.com",
      "font-src 'self' data:",
      "media-src 'self' blob:",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "connect-src 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()",
  },
];

const publicAssetCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
  },
];

const htmlVaryHeaders = [
  {
    key: "Vary",
    value:
      "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept-Encoding, User-Agent",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [65, 68, 70, 72, 75, 80],
    minimumCacheTTL: 31536000,
  },

  // Allow LAN access during dev (e.g., testing on phone via Wi-Fi).
  allowedDevOrigins: ["192.168.0.202"],

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "d3",
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      ...["/", "/activate-26", "/leadership"].map((source) => ({
        source,
        headers: htmlVaryHeaders,
      })),
      {
        source: "/:path*\\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|avif|AVIF|gif|GIF|ico|ICO|svg|SVG|mp4|MP4|mov|MOV|mp3|MP3|json|JSON)",
        headers: publicAssetCacheHeaders,
      },
      ...["/curated/:path*", "/gallery/:path*", "/audio/:path*", "/video/:path*", "/data/:path*"].map(
        (source) => ({
          source,
          headers: publicAssetCacheHeaders,
        }),
      ),
    ];
  },
};

export default nextConfig;
