import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { paintingSeries } from "@/data/paintings";
import type { Painting } from "@/types";

export const metadata: Metadata = {
  title: "Pintura — Obras originales de Bárbara Gutiérrez",
  description:
    "Galería de pinturas originales de Bárbara Gutiérrez: técnica mixta, óleo y acrílico. Algunas obras están disponibles para adquirir. Pintora argentina contemporánea radicada en Buenos Aires.",
  alternates: { canonical: "/pintura" },
  openGraph: {
    title: "Pintura — Bárbara Gutiérrez",
    description:
      "Obras originales de Bárbara Gutiérrez, pintora argentina contemporánea. Técnica mixta, series y piezas disponibles para adquirir.",
    url: "/pintura",
    type: "website",
  },
};

export default function PaintingPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      {/* Header */}
      <header className="mb-16 max-w-xl">
        <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Galería</p>
        <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Pintura</h1>
        <p className="text-charcoal/60 leading-relaxed">
          Acá está mi trabajo en pintura. Algunas obras están disponibles y otras
          forman parte de colecciones particulares.
        </p>
      </header>

      {/* Índice de series */}
      <nav className="mb-16 flex flex-wrap gap-3" aria-label="Series">
        {paintingSeries.map((serie) => (
          <a
            key={serie.slug}
            href={`#${serie.slug}`}
            className="text-xs tracking-wide px-4 py-2 border border-stone/30 text-stone hover:border-charcoal hover:text-charcoal transition-colors"
          >
            {serie.title}
          </a>
        ))}
      </nav>

      {/* Secciones por serie */}
      <div className="flex flex-col gap-24">
        {paintingSeries.map((serie) => (
          <section key={serie.slug} id={serie.slug}>
            <div className="mb-8 border-b border-stone/20 pb-4 flex items-end justify-between">
              <div>
                <h2 className="font-serif text-3xl font-light text-charcoal">{serie.title}</h2>
                {serie.description && (
                  <p className="text-sm text-stone mt-2">{serie.description}</p>
                )}
              </div>
              {serie.slug === "obra-disponible" && (
                <span className="text-xs px-3 py-1 bg-terracotta text-ivory tracking-wide">
                  Disponible
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {serie.paintings.map((painting) => (
                <PaintingCard
                  key={painting.slug}
                  painting={painting}
                  showAvailableBadge={painting.status === "available"}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function PaintingCard({
  painting,
  showAvailableBadge,
}: {
  painting: Painting;
  showAvailableBadge: boolean;
}) {
  return (
    <div className="group">
      <Link href={`/pintura/${painting.slug}`} className="block">
        <div className="relative aspect-[4/5] bg-stone/10 overflow-hidden mb-4">
          <Image
            src={painting.coverImage}
            alt={painting.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {showAvailableBadge && (
            <span className="absolute top-3 right-3 text-xs px-2 py-1 bg-terracotta text-ivory tracking-wide">
              Disponible
            </span>
          )}
        </div>
        <p className="font-serif text-xl text-charcoal group-hover:text-terracotta transition-colors">
          {painting.title}
        </p>
        {(painting.medium || painting.dimensions) && (
          <p className="text-sm text-stone mt-1">
            {[painting.medium, painting.dimensions].filter(Boolean).join(" · ")}
          </p>
        )}
      </Link>
      {showAvailableBadge && (
        <a
          href="/contacto"
          className="inline-block mt-3 text-xs tracking-[0.15em] uppercase border border-terracotta text-terracotta px-4 py-2 hover:bg-terracotta hover:text-ivory transition-colors"
        >
          Consultar precio
        </a>
      )}
    </div>
  );
}
