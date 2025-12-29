import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alonsovine.github.io"),
  title: "Alonso Viñé | Software Developer Portfolio",
  description:
    "Mi portfolio profesional.",
  alternates: {
    canonical: "/portfolioR/",
  },
  openGraph: {
    title: "Alonso Viñé | Software Developer Portfolio",
    description:
      "Mi portfolio profesional.",
    url: "/portfolioR/",
    siteName: "Alonso Viñé",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/portfolioR/assets/og-portfolio.png",
        width: 1200,
        height: 630,
        alt: "Alonso Viñé | Software Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alonso Viñé | Software Developer Portfolio",
    description:
      "Mi portfolio profesional.",
    images: ["/portfolioR/assets/og-portfolio.png"],
  },
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
