import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { illustrations } from "@/data/illustrations";

export const metadata: Metadata = {
  title: "Ilustraciones — Licencias digitales de Bárbara Gutiérrez",
  description:
    "Ilustraciones originales de Bárbara Gutiérrez disponibles en licencias digitales: personal, editorial y comercial. Ilustradora argentina radicada en Buenos Aires.",
  alternates: { canonical: "/ilustraciones" },
  openGraph: {
    title: "Ilustraciones — Bárbara Gutiérrez",
    description:
      "Ilustraciones originales con licencias digitales. Uso personal, editorial y comercial. Ilustradora argentina, Buenos Aires.",
    url: "/ilustraciones",
    type: "website",
  },
};

export default function IllustrationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <header className="mb-16 max-w-xl">
        <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Catálogo</p>
        <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Ilustraciones</h1>
        <p className="text-charcoal/60 leading-relaxed">
          Estas ilustraciones están disponibles en formato digital. Cada una tiene
          su tipo de uso y se envía después de la compra.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {illustrations.map((ill) => (
          <Link key={ill.slug} href={`/ilustraciones/${ill.slug}`} className="group block">
            <div className="relative aspect-square bg-stone/10 overflow-hidden mb-4">
              <Image
                src={ill.previewImage}
                alt={ill.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 text-xs px-2 py-1 bg-ivory/90 text-charcoal tracking-wide">
                Licencia digital
              </span>
            </div>
            <p className="font-serif text-xl text-charcoal group-hover:text-terracotta transition-colors">
              {ill.title}
            </p>
            <p className="text-sm text-stone mt-1">
              Desde USD {ill.licenses[0]?.price ?? 25}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
