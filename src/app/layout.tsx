import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n";
import { Aurora } from "@/components/shared/Aurora";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const SITE_URL = "https://alonsovine.github.io";
const SITE_PATH = "/portfolioR/";
const SITE_FULL_URL = `${SITE_URL}${SITE_PATH}`;
const DEFAULT_TITLE =
  "Alonso Viñé | Full Stack Developer (Angular · Java · React · DevOps)";
const DESCRIPTION =
  "Alonso Viñé Barrancos · Full Stack Developer en Madrid. 5+ años construyendo software para Defensa, FCC, Inetum y Seres. Especialización en IA y agentes.";
const OG_IMAGE = "/portfolioR/assets/og-portfolio.png";

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
  image: `${SITE_URL}/portfolioR/images/mi-foto.png`,
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
    <html lang="es" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased bg-slate-950 text-white`}
      >
        <Aurora />
        <div
          aria-hidden="true"
          className="bg-noise pointer-events-none fixed inset-0 z-[9999] opacity-[0.06] mix-blend-overlay"
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
