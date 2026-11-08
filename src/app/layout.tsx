import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Instrument_Serif, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n";
import { ConsoleSignature } from "@/components/shared/ConsoleSignature";
import { GoogleAnalyticsEvents } from "@/components/shared/GoogleAnalyticsEvents";
import { MotionGate } from "@/components/shared/MotionGate";
import { RetroEasterEgg } from "@/components/shared/RetroEasterEgg";
import { SkipToContent } from "@/components/shared/SkipToContent";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { StickyContactCTA } from "@/components/ui/StickyContactCTA";

const display = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const text = Schibsted_Grotesk({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://alonsovine.github.io";
const SITE_PATH = "/portfolioR/";
const SITE_FULL_URL = `${SITE_URL}${SITE_PATH}`;
const DEFAULT_TITLE =
  "Alonso Viñé | Full Stack Developer (Angular · Java · React · DevOps)";
const DESCRIPTION =
  "Alonso Viñé Barrancos, Full Stack Developer en Madrid. Desde 2021 en proyectos para Defensa con Atos, Fervimax (FCC), Inetum y, ahora, Seres como DevOps Engineer. Formación en IA y agentes.";
const OG_IMAGE = "/portfolioR/assets/og-portfolio.webp";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const HERO_AVATAR_PATH = `${BASE_PATH}/images/retrato-recorte.webp`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
    { media: "(prefers-color-scheme: light)", color: "#f2f1ed" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Alonso Viñé",
  },
  description: DESCRIPTION,
  keywords: [
    "Alonso Viñé",
    "Alonso Viñé Barrancos",
    "Full Stack Developer Madrid",
    "Angular Developer",
    "Java Developer",
    "Spring Boot",
    "DevOps Engineer",
    "GitLab CI/CD",
    "React Developer",
    "Portfolio",
  ],
  authors: [
    {
      name: "Alonso Viñé Barrancos",
      url: "https://www.linkedin.com/in/alonso-viñé-barrancos/",
    },
  ],
  creator: "Alonso Viñé Barrancos",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_PATH,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    url: SITE_PATH,
    siteName: "Alonso Viñé",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Alonso Viñé | Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alonso Viñé Barrancos",
  alternateName: "Alonso Viñé",
  url: SITE_FULL_URL,
  image: `${SITE_URL}/portfolioR/images/mi-foto.webp`,
  jobTitle: "Full Stack Developer",
  worksFor: { "@type": "Organization", name: "Seres" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressCountry: "ES",
  },
  sameAs: [
    "https://github.com/AlonsoVine",
    "https://www.linkedin.com/in/alonso-viñé-barrancos/",
  ],
  knowsAbout: [
    "Angular",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "Node.js",
    "DevOps",
    "GitLab CI/CD",
    "AI Agents",
    "Prompt Engineering",
  ],
};

const themeScript = `
(() => {
  document.documentElement.dataset.js = '1';
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored ?? (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    window.__theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'dark';
    window.__theme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" className={`${display.variable} ${text.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SCJHRK7TQ7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SCJHRK7TQ7');
          `}
        </Script>
        <link
          rel="preload"
          as="image"
          href={HERO_AVATAR_PATH}
          type="image/webp"
          fetchPriority="high"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className="antialiased"
      >
        <GoogleAnalyticsEvents />
        <ConsoleSignature />
        <ReadingProgress />
        <LanguageProvider>
          <MotionGate>
            <SkipToContent />
            {children}
            <StickyContactCTA />
            <RetroEasterEgg />
          </MotionGate>
        </LanguageProvider>
      </body>
    </html>
  );
}
