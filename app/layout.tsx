import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, IBM_Plex_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.pi.name}, ${site.pi.credentials}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Moustafa Gabr",
    "molecular imaging",
    "medicinal chemistry",
    "immune checkpoints",
    "TREM2",
    "CHI3L1",
    "glioblastoma",
    "Alzheimer's disease",
    "PET probes",
    "Columbia Radiology",
  ],
  authors: [{ name: site.pi.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.pi.name}, ${site.pi.credentials}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${site.pi.twitter}`,
    title: `${site.name} — ${site.pi.name}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

// Light is the default look, so the browser chrome matches it rather than the
// reader's system preference.
export const viewport: Viewport = {
  themeColor: "#fbfbf9",
};

/**
 * Runs before paint. The site is light by default — the system preference is
 * deliberately ignored — and turns dark only for a reader who picked dark with
 * the toggle. Also marks the document as scripted so the scroll-in transitions
 * may hide their content (without JS everything stays visible).
 */
const bootScript = `(function(){var e=document.documentElement;e.classList.add("js");try{e.classList.toggle("dark",localStorage.getItem("theme")==="dark");}catch(x){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.pi.name,
  jobTitle: site.pi.title,
  email: `mailto:${site.pi.email}`,
  url: site.url,
  affiliation: {
    "@type": "Organization",
    name: site.pi.institution,
    department: site.pi.department,
  },
  sameAs: [site.links.scholar, site.links.twitter, site.links.pubmed].filter(Boolean),
  knowsAbout: [
    "Medicinal chemistry",
    "Molecular imaging",
    "Chemical biology",
    "Immunopharmacology",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variables belong on <html>: the @theme tokens that reference them
    // are declared on :root, and a var() inside a custom property is substituted
    // at the element that declares it — not where it is finally used.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-paper)]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
