import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

/**
 * Type system — one serif, two jobs, plus a mono for figures.
 *
 * Source Serif 4 does both text and display. Hierarchy comes from size and
 * weight rather than a second family: display serifs like Instrument Serif or
 * Playfair are narrow, high-contrast and long in the ascenders, which at
 * headline size reads as vertically stretched no matter what the line-height
 * says. Source Serif is wide and sturdy, so it stays planted when it's big.
 */
const sans = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wellkeptestates.space"),
  title: {
    default: "Well Kept Estates — Estate sales in the San Fernando Valley",
    template: "%s · Well Kept Estates",
  },
  description:
    "Estate sales across the San Fernando Valley — pricing, staging, and running the sale, with a written settlement report on every job. 30% of gross, $1,500 minimum.",
  openGraph: {
    title: "Well Kept Estates",
    description:
      "Estate sales in the San Fernando Valley, with a written settlement report on every sale.",
    type: "website",
    locale: "en_US",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
