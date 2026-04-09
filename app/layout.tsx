import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SearchProvider } from "@/context/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ADIPA | Cursos de Psicología",
    template: "%s | ADIPA",
  },
  description: "Educación profesional en psicología y salud mental",
  metadataBase: new URL("https://adipa.cl"),

  // Canonical
  alternates: {
    canonical: "https://adipa.cl",
  },

  // Open Graph
  openGraph: {
    title: "ADIPA | Cursos de Psicología",
    description: "Educación profesional en psicología y salud mental",
    url: "https://adipa.cl",
    siteName: "ADIPA",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/logo-adipa.png",
        width: 1200,
        height: 630,
        alt: "ADIPA logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ADIPA | Cursos de Psicología",
    description: "Educación profesional en psicología y salud mental",
    images: ["/logo-adipa.png"],
  },

  // Icons
  icons: {
    icon: "/logo-adipa.png",
    apple: "/logo-adipa.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SearchProvider>
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </SearchProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ADIPA",
              url: "https://adipa.cl",
              logo: "https://adipa.cl/logo-adipa.png",
            }),
          }}
        />
      </body>
    </html>
  );
}