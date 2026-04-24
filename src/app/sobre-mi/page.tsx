import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Bárbara Gutiérrez — Artista Visual Argentina",
  description:
    "Bárbara Gutiérrez es artista visual, pintora, ilustradora y animadora experimental argentina. Autodidacta, trabaja en Buenos Aires entre la pintura, el dibujo, la animación, la escritura y el diseño editorial.",
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: "Sobre Bárbara Gutiérrez — Artista Visual Argentina",
    description:
      "Pintora, ilustradora y animadora experimental argentina radicada en Buenos Aires. Conocé su trayectoria y forma de trabajo.",
    url: "/sobre-mi",
    type: "profile",
    images: [{ url: "/images/branding/barbara-retrato.jpg", alt: "Bárbara Gutiérrez — Artista Visual" }],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <header className="mb-16">
        <h1 className="font-serif text-5xl font-light text-charcoal">Bárbara Gutiérrez</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Imagen / retrato */}
        <div className="lg:col-span-1">
          <img
            src="/images/branding/barbara-retrato.jpg"
            alt="Bárbara Gutiérrez, artista visual y pintora argentina radicada en Buenos Aires"
            className="aspect-[3/4] object-cover w-full"
          />
          <p className="text-xs text-stone mt-3 text-center">Foto: Arturo Villegas</p>
        </div>

        {/* Bio y statement */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4 text-charcoal/70 leading-relaxed">
            <p>
              Tengo 63 años y trabajo en Buenos Aires. Pinto, dibujo, ilustro, animo cuadro a cuadro y escribo. Me formé mayormente sola, pero me ayudó muchísima gente.
            </p>
            <p>
              Defino cómo trabajo, no qué voy a producir.
            </p>
            <p>
              Pinto sobre lo pintado, tacho más de lo que corrijo, y en animación me banco el tiempo muerto porque ahí es donde aparecen los hallazgos. Debajo de cada cuadro hay varios cuadros más.
            </p>
            <p>
              La pregunta que me sostiene es simple: ¿qué imagen ocurre cuando nadie la manda?
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-4">Anti-PROMPT™</h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                El Anti-PROMPT™ nació de una conversación con mi amiga Lety, que en paz descanse. Pasamos horas tejiendo y discutiendo nuestras filosofías del hacer. Ella prefería destejer el punto mal hecho. Yo sostenía el error, porque ese punto fuera de lugar ya estaba diciendo algo. Volver atrás no siempre mejora el trabajo; a veces solo lo vuelve más obediente.
              </p>
              <p>
                Cuando pinto, empiezo con una idea y la idea me abandona a mitad de camino. Pinto sobre lo pintado, recorto, pego, empiezo otra vez. Debajo de lo que se ve hay capas: errores, decisiones, cosas que no funcionaron y se quedaron igual. Ese espesor no es solamente descuido. Es el registro de todo lo que ocurrió antes de que la obra encontrara su forma.
              </p>
              <p>
                Escribo de un tirón, casi sin pensar, y después tacho más de lo que corrijo. No sé qué voy a escribir hasta que ya está escrito. El control llega después, y es mínimo. En animación, el tiempo muerto — ese rato en que nada cierra todavía — es exactamente donde los hallazgos tienen espacio para ocurrir. No hay atajo que no corte algo importante.
              </p>
              <p>
                No es rechazo tecnológico. Uso herramientas digitales, edito en computadora, le pregunto cosas a la IA. La tecnología entra como material, no como dirección.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
