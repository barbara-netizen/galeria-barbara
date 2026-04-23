import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { animations } from "@/data/animations";

export const metadata: Metadata = {
  title: "Animaciones — Bárbara Gutiérrez, animadora experimental argentina",
  description:
    "Portfolio de animaciones de Bárbara Gutiérrez: trabajos cuadro a cuadro, stop motion y proyectos por encargo. Animadora experimental argentina radicada en Buenos Aires.",
  alternates: { canonical: "/animaciones" },
  openGraph: {
    title: "Animaciones — Bárbara Gutiérrez",
    description:
      "Animaciones cuadro a cuadro, stop motion y proyectos por encargo. Animadora experimental argentina, Buenos Aires.",
    url: "/animaciones",
    type: "website",
  },
};

export default function AnimationsPage() {
  const featured = animations.find((a) => a.featured);
  const rest = animations.filter((a) => !a.featured);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <header className="mb-16 max-w-xl">
        <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Portfolio</p>
        <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Animaciones</h1>
        <p className="text-charcoal/60 leading-relaxed">
          Acá reuní trabajos de animación hechos cuadro a cuadro y otros proyectos
          por encargo.
        </p>
      </header>

      {/* Vimeo embed destacado */}
      {featured?.vimeoId && featured.vimeoId !== "VIDEO_ID" && (
        <section className="mb-20">
          <div className="relative aspect-video bg-charcoal/10 overflow-hidden">
            <iframe
              src={`https://player.vimeo.com/video/${featured.vimeoId}?title=0&byline=0&portrait=0`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={featured.title}
            />
          </div>
          <p className="text-xs text-stone mt-3">Promocional de animación</p>
        </section>
      )}

      {/* Reel destacado */}
      {featured && (
        <section className="mb-20">
          <Link href={`/animaciones/${featured.slug}`} className="group block">
            <div className="relative aspect-video bg-charcoal/10 overflow-hidden mb-5">
              <Image
                src={featured.posterImage}
                alt={featured.title}
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-ivory/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-charcoal ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute top-4 left-4 text-xs px-3 py-1 bg-terracotta text-ivory tracking-wide">
                Reel destacado
              </span>
            </div>
            <h2 className="font-serif text-2xl text-charcoal group-hover:text-terracotta transition-colors">
              {featured.title}
            </h2>
            {featured.duration && (
              <p className="text-sm text-stone mt-1">{featured.duration}</p>
            )}
          </Link>
        </section>
      )}

      {/* Resto de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((anim) => (
          <Link key={anim.slug} href={`/animaciones/${anim.slug}`} className="group block">
            <div className="relative aspect-video bg-charcoal/10 overflow-hidden mb-4">
              <Image
                src={anim.posterImage}
                alt={anim.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-ivory/90 flex items-center justify-center">
                  <svg className="w-4 h-4 text-charcoal ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="font-serif text-xl text-charcoal group-hover:text-terracotta transition-colors">
              {anim.title}
            </p>
            <p className="text-sm text-stone mt-1">
              {[anim.client, anim.duration].filter(Boolean).join(" · ")}
            </p>
          </Link>
        ))}
      </div>

      {/* CTA contratar */}
      <div className="mt-20 border-t border-stone/20 pt-16 text-center">
        <h2 className="font-serif text-3xl text-charcoal mb-4">
          ¿Tenés un proyecto de animación?
        </h2>
        <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
          Si querés contarme una idea o pedir presupuesto, mandame los detalles.
        </p>
        <Link
          href="/animaciones/contratar"
          className="inline-block px-10 py-3 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta transition-colors"
        >
          Pedir presupuesto
        </Link>
      </div>

      {/* ANIMATE! — invitación a conversar */}
      <div className="mt-20 border-t border-stone/20 pt-16 text-center">
        <h2 className="font-serif text-3xl text-charcoal mb-4">ANIMATE!</h2>
        <p className="text-charcoal/60 mb-8 max-w-lg mx-auto leading-relaxed">
          Si te interesa la animación cuadro a cuadro, la rotoscopia o las técnicas manuales,
          charlemos. No es un curso con precio fijo: es una invitación a sentarnos con un café
          (virtual o de verdad) y ver qué proyecto tenés en mente. A veces basta con hablarlo
          para que empiece a moverse.
        </p>
        <Link
          href="/animaciones/contratar"
          className="inline-block px-10 py-3 border border-charcoal text-charcoal text-sm tracking-wide hover:bg-charcoal hover:text-ivory transition-colors"
        >
          Charlemos
        </Link>
      </div>
    </div>
  );
}
