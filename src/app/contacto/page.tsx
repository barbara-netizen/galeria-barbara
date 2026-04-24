import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — Bárbara Gutiérrez",
  description:
    "Escribile a Bárbara Gutiérrez para consultar por pinturas originales, encargar una ilustración o hablar de un proyecto de animación. Artista visual radicada en Buenos Aires.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Bárbara Gutiérrez",
    description:
      "Consultá por obras, ilustraciones o proyectos de animación. Artista visual argentina, Buenos Aires.",
    url: "/contacto",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <header className="mb-16 max-w-xl">
        <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Contacto</h1>
        <p className="text-charcoal/60 leading-relaxed">
          Escribime. No garantizo resultados, pero sí que va a haber una respuesta real.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Formulario */}
        <ContactForm />

        {/* Info de contacto */}
        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone mb-3">Email directo</p>
            <a
              href="mailto:gutierrez.barbarita@gmail.com"
              className="font-serif text-xl text-charcoal hover:text-terracotta transition-colors"
            >
              gutierrez.barbarita@gmail.com
            </a>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone mb-3">Redes</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/barbaragutierrez63/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
              >
                @barbaragutierrez63 — Instagram
              </a>
            </div>
          </div>

          <div className="border-t border-stone/20 pt-8">
            <p className="text-xs tracking-[0.2em] uppercase text-stone mb-3">¿Querés contratar?</p>
            <div className="flex flex-col gap-3 text-sm text-charcoal/70">
              <p>
                Si buscás una ilustración →{" "}
                <a href="/ilustraciones" className="underline underline-offset-4 hover:text-charcoal transition-colors">
                  ver ilustraciones
                </a>
              </p>
              <p>
                Si querés una animación →{" "}
                <a href="/animaciones/contratar" className="underline underline-offset-4 hover:text-charcoal transition-colors">
                  completar formulario
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
