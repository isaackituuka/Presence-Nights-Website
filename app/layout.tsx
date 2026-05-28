import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Space_Grotesk } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, organizationJsonLd, siteConfig, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const OG_IMAGE = absoluteUrl(siteConfig.images.home);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Worship gathering",
  title: {
    default: siteConfig.title,
    template: "%s · Presence Nights",
  },
  description: siteConfig.description,
  keywords: [
    "Presence Nights",
    "Presence Nights Tulsa",
    "Tulsa young adults",
    "Tulsa worship night",
    "young adults worship",
    "prayer gathering Tulsa",
    "Christian community Tulsa",
    "Activate 26",
  ],
  authors: [{ name: "Presence Nights" }],
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    locale: siteConfig.locale,
    images: [
      {
        url: OG_IMAGE,
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
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0C070A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body suppressHydrationWarning className="bg-[#0C070A] text-[#EBE6E2] min-h-screen">
        <JsonLd id="presence-organization-jsonld" data={organizationJsonLd()} />
        <JsonLd id="presence-website-jsonld" data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
