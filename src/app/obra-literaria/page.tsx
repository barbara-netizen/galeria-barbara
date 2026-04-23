import Link from "next/link";

export const metadata = { title: "Obra literaria" };

export default function LiteraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>

      <header className="mb-20 max-w-xl">
        <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Escritura</p>
        <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Obra literaria</h1>
        <p className="text-charcoal/60 leading-relaxed">
          Textos, antologías y servicios editoriales.
        </p>
      </header>

      {/* ─── SERVICIOS EDITORIALES ─────────────────────────────────────────── */}
      <section className="mb-24">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Servicios</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal mb-6">
            Servicios Editoriales
          </h2>
          <p className="text-charcoal/60 leading-relaxed mb-10 max-w-2xl">
            Si estás escribiendo un libro o tenés un proyecto editorial en mente, puedo acompañarte
            en el proceso. Trabajo en corrección de textos, diseño editorial, ilustración de portadas
            y maquetación. Escribime y charlamos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              { title: "Corrección", desc: "Revisión ortotipográfica, de estilo y de consistencia." },
              { title: "Diseño editorial", desc: "Propuesta visual para el interior del libro." },
              { title: "Portadas", desc: "Ilustración y diseño de tapa a medida." },
              { title: "Maquetación", desc: "Armado profesional de archivos para imprenta o digital." },
            ].map((s) => (
              <div key={s.title} className="border border-stone/20 p-6">
                <h3 className="font-serif text-lg text-charcoal mb-2">{s.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <form
          action="https://formspree.io/f/xpqkygdo"
          method="POST"
          className="max-w-2xl space-y-6"
        >
          <div>
            <label htmlFor="ed-name" className="block text-sm text-charcoal/70 mb-1">Nombre</label>
            <input
              id="ed-name"
              name="name"
              type="text"
              required
              className="w-full border border-stone/30 px-4 py-3 text-sm text-charcoal bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="ed-email" className="block text-sm text-charcoal/70 mb-1">Email</label>
            <input
              id="ed-email"
              name="email"
              type="email"
              required
              className="w-full border border-stone/30 px-4 py-3 text-sm text-charcoal bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="ed-project" className="block text-sm text-charcoal/70 mb-1">Contame sobre tu proyecto</label>
            <textarea
              id="ed-project"
              name="project"
              rows={5}
              required
              className="w-full border border-stone/30 px-4 py-3 text-sm text-charcoal bg-transparent focus:outline-none focus:border-charcoal transition-colors resize-none"
              placeholder="¿En qué etapa estás? ¿Qué tipo de libro es? ¿Qué necesitás?"
            />
          </div>
          <button
            type="submit"
            className="inline-block px-8 py-3 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta transition-colors"
          >
            Enviar consulta
          </button>
        </form>
      </section>

      {/* ─── MUESTRA LITERARIA ─────────────────────────────────────────────── */}
      <section className="border-t border-stone/20 pt-20">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Muestra literaria</p>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-2">Turistas</h2>
          <p className="text-charcoal/60 leading-relaxed mb-8">
            Antología de 18 cuentos · Bárbara Gutiérrez
          </p>
          <p className="text-charcoal/70 leading-relaxed mb-10 max-w-xl">
            Una selección de cuentos para conocer mi escritura. Te lo regalo de corazón.
            Leelo acá mismo o llevatelo para tu lector.
          </p>

          {/* Visor PDF */}
          <div className="w-full mb-10">
            <iframe
              src="/downloads/turistas.pdf"
              title="Turistas — vista previa"
              className="w-full border border-stone/20 bg-stone/5"
              style={{ aspectRatio: "1 / 1.414", maxHeight: "80vh" }}
            />
          </div>

          {/* Descarga EPUB */}
          <div className="mb-10">
            <a
              href="/downloads/turistas.epub"
              download
              className="inline-block text-center px-8 py-3 border border-charcoal text-charcoal text-sm tracking-wide hover:bg-charcoal hover:text-ivory transition-colors"
            >
              Descargar para dispositivos de lectura (EPUB)
            </a>
          </div>

          <p className="text-xs text-stone leading-relaxed max-w-lg">
            © Bárbara Gutiérrez. Todos los derechos reservados. Para cualquier tipo de difusión
            y/o uso comercial, contactarse con la autora.
          </p>
        </div>
      </section>
    </div>
  );
}
