import Link from "next/link";

export const metadata = { title: "Sobre mí" };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <header className="mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Artista</p>
        <h1 className="font-serif text-5xl font-light text-charcoal">Bárbara Gutiérrez</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Imagen / retrato */}
        <div className="lg:col-span-1">
          <img
            src="/images/branding/barbara-retrato.jpg"
            alt="Bárbara Gutiérrez"
            className="aspect-[3/4] object-cover w-full"
          />
          <p className="text-xs text-stone mt-3 text-center">Foto: Arturo Villegas</p>
        </div>

        {/* Bio y statement */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-4">Sobre Bárbara</h2>
            <p className="text-charcoal/70 leading-relaxed">
              Bárbara Gutiérrez es una artista visual argentina, pintora, ilustradora,
              animadora y escritora radicada en Buenos Aires. De formación mayormente
              autodidacta, trabaja entre la pintura, el dibujo, la animación
              experimental, la escritura, el textil y el diseño editorial.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-4">Statement</h2>
            <p className="text-charcoal/70 leading-relaxed italic font-serif text-lg">
              &ldquo;Mi obra se centra en la transformación y la potencia expresiva de los procesos manuales.&rdquo;
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-4">Disciplinas</h2>
            <ul className="space-y-2 text-sm text-charcoal/70">
              <li className="flex gap-3">
                <span className="text-terracotta">—</span> Pintura
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta">—</span> Ilustración
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta">—</span> Animación experimental
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta">—</span> Escritura
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta">—</span> Dibujo
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta">—</span> Textil
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta">—</span> Diseño editorial
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
