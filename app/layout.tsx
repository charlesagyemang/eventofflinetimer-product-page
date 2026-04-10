import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eventofflinetimer.com"),
  title: "Offline Event Timer — Professional Countdown for Live Events",
  description:
    "Free desktop app that runs a countdown timer offline and shares it to any screen on your network. No internet. No accounts. Mac, Windows, Linux.",
  keywords: [
    "event timer",
    "countdown timer",
    "offline timer",
    "conference timer",
    "presentation timer",
    "event countdown",
    "LAN timer",
    "projector timer",
    "church timer",
    "hackathon timer",
    "speaker timer",
  ],
  openGraph: {
    title: "Offline Event Timer — The event timer that never drops out",
    description:
      "Professional countdown. Works offline. Shares to any screen.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
