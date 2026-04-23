import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://barbaragutierrez.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bárbara Gutiérrez — Artista Visual, Pintora e Ilustradora en Buenos Aires",
    template: "%s | Bárbara Gutiérrez",
  },
  description:
    "Bárbara Gutiérrez es artista visual, pintora, ilustradora y animadora experimental argentina radicada en Buenos Aires. Portfolio con pinturas originales, ilustraciones digitales, animaciones cuadro a cuadro y obra literaria.",
  keywords: [
    "Bárbara Gutiérrez",
    "Barbara Gutierrez artista",
    "artista visual Buenos Aires",
    "pintora argentina contemporánea",
    "ilustradora Buenos Aires",
    "animadora experimental Argentina",
    "artista multidisciplinaria Argentina",
    "pintura técnica mixta Argentina",
    "ilustración digital Buenos Aires",
    "animación cuadro a cuadro Argentina",
  ],
  authors: [{ name: "Bárbara Gutiérrez", url: siteUrl }],
  creator: "Bárbara Gutiérrez",
  openGraph: {
    siteName: "Bárbara Gutiérrez",
    locale: "es_AR",
    type: "website",
    url: siteUrl,
    title: "Bárbara Gutiérrez — Artista Visual, Pintora e Ilustradora en Buenos Aires",
    description:
      "Portfolio de Bárbara Gutiérrez: pinturas originales, ilustraciones, animaciones experimentales y obra literaria. Artista multidisciplinaria radicada en Buenos Aires.",
    images: [
      {
        url: "/images/branding/barbara-retrato.jpg",
        width: 800,
        height: 1000,
        alt: "Bárbara Gutiérrez — Artista Visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bárbara Gutiérrez — Artista Visual, Pintora e Ilustradora en Buenos Aires",
    description:
      "Portfolio de Bárbara Gutiérrez: pinturas, ilustraciones, animaciones y obra literaria.",
    images: ["/images/branding/barbara-retrato.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Bárbara Gutiérrez",
        url: siteUrl,
        image: `${siteUrl}/images/branding/barbara-retrato.jpg`,
        description:
          "Artista visual argentina, pintora, ilustradora, animadora experimental y escritora radicada en Buenos Aires.",
        jobTitle: "Artista visual",
        nationality: { "@type": "Country", name: "Argentina" },
        address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
        sameAs: ["https://www.instagram.com/barbaragutierrez63/"],
        knowsAbout: [
          "Pintura",
          "Ilustración",
          "Animación experimental",
          "Animación cuadro a cuadro",
          "Escritura",
          "Diseño editorial",
          "Textil",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Bárbara Gutiérrez",
        description:
          "Portfolio y galería oficial de Bárbara Gutiérrez: pinturas, ilustraciones, animaciones y obra literaria.",
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "es-AR",
      },
    ],
  };

  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
