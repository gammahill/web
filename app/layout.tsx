import type React from "react"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import "./globals.css"

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
  weight: ["400", "500", "600", "700"],
})

const DEFAULT_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://gammahill.com";

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: "Gammahill",
  description: "Gammahill — end-to-end software product development",
  keywords: [
    "software development",
    "product development",
    "web development",
    "mobile apps",
    "SaaS",
    "startup",
    "engineering",
    "design",
    "consulting",
    "Gammahill"
  ],
  authors: [{ name: "Gammahill", url: DEFAULT_URL }],
  icons: {
    icon: "/images/icon.png",
  },
  openGraph: {
    title: "Gammahill",
    description: "Gammahill — end-to-end software product development",
    url: DEFAULT_URL,
    siteName: "Gammahill",
    images: [
      {
        url: "/images/gammahill.png",
        width: 1200,
        height: 630,
        alt: "Gammahill Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gammahill",
    description: "Gammahill — end-to-end software product development",
    creator: "@gammahill",
    images: [
      {
        url: "/images/gammahill.png",
        width: 1200,
        height: 630,
        alt: "Gammahill Open Graph Image",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${lexend.className} font-light antialiased`}>{children}</body>
    </html>
  )
}
