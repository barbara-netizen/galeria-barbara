import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bárbara Gutiérrez — Artista Visual, Pintora e Ilustradora en Buenos Aires",
  description:
    "Portfolio oficial de Bárbara Gutiérrez: pinturas originales, ilustraciones digitales, animaciones cuadro a cuadro y obra literaria. Artista visual argentina radicada en Buenos Aires.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bárbara Gutiérrez — Artista Visual, Pintora e Ilustradora en Buenos Aires",
    description:
      "Portfolio oficial de Bárbara Gutiérrez: pinturas, ilustraciones, animaciones y escritura. Artista multidisciplinaria argentina radicada en Buenos Aires.",
    url: "/",
    type: "website",
  },
};

const categories = [
  {
    href: "/pintura",
    label: "Pintura",
    description: "Pinturas y piezas hechas a mano.",
    color: "bg-terracotta/10 hover:bg-terracotta/20",
    accent: "text-terracotta",
  },
  {
    href: "/ilustraciones",
    label: "Ilustraciones",
    description: "Ilustraciones para publicar, compartir o encargar.",
    color: "bg-olive/10 hover:bg-olive/20",
    accent: "text-olive",
  },
  {
    href: "/animaciones",
    label: "Animaciones",
    description: "Trabajos en movimiento y proyectos por encargo.",
    color: "bg-stone/20 hover:bg-stone/30",
    accent: "text-charcoal",
  },
  {
    href: "/obra-literaria",
    label: "Obra literaria",
    description: "Textos, libros digitales y escritura.",
    color: "bg-terracotta/5 hover:bg-terracotta/15",
    accent: "text-terracotta",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-5 text-center overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto animate-fade-in">
          <p className="text-sm tracking-[0.25em] uppercase text-stone mb-6">
            Artista visual — Buenos Aires
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl font-light leading-tight text-charcoal mb-6">
            Bárbara <br />
            Gutiérrez
          </h1>
          <p className="text-charcoal/60 text-lg leading-relaxed max-w-md mx-auto mb-10">
            Pintura, ilustración, animación y escritura hechas a mano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pintura"
              className="px-8 py-3 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta transition-colors"
            >
              Ver trabajos
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-3 border border-charcoal/30 text-charcoal text-sm tracking-wide hover:border-charcoal transition-colors"
            >
              Escribime
            </Link>
          </div>
        </div>

        {/* Decoración sutil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-terracotta/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-olive/5 blur-3xl" />
        </div>
      </section>

      {/* Categorías */}
      <section className="py-20 px-5 max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl text-charcoal mb-12 text-center">
          Disciplinas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group block p-8 transition-colors ${cat.color} rounded-sm`}
            >
              <p className={`text-xs tracking-[0.2em] uppercase mb-3 ${cat.accent}`}>
                {cat.label}
              </p>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {cat.description}
              </p>
              <span className="inline-block mt-6 text-xs text-charcoal/40 group-hover:text-charcoal transition-colors">
                Ver →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="py-20 px-5 bg-charcoal text-ivory">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-2xl sm:text-3xl font-light leading-relaxed">
            &ldquo;Trabajo con las manos, con la memoria y con lo que queda cuando algo cambia.&rdquo;
          </p>
          <Link
            href="/sobre-mi"
            className="inline-block mt-10 text-sm tracking-wide text-ivory/50 hover:text-ivory transition-colors"
          >
            Sobre Bárbara →
          </Link>
        </div>
      </section>

      {/* CTA contacto */}
      <section className="py-20 px-5 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="text-charcoal/60 mb-8 leading-relaxed">
            Si querés consultar por una obra, una ilustración o un proyecto, escribime por acá.
          </p>
          <Link
            href="/contacto"
            className="inline-block px-10 py-3 bg-terracotta text-ivory text-sm tracking-wide hover:bg-terracotta/80 transition-colors"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </>
  );
}
