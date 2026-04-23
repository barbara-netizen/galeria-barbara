import Link from "next/link";
import Image from "next/image";
import { ebooks } from "@/data/ebooks";

export const metadata = { title: "Obra literaria" };

export default function LiteraryPage() {
  const books = ebooks.filter((b) => !b.isBundle);
  const pack = ebooks.find((b) => b.isBundle);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <header className="mb-16 max-w-xl">
        <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Escritura</p>
        <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Obra literaria</h1>
        <p className="text-charcoal/60 leading-relaxed">
          Acá vas a encontrar textos y libros.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {books.map((book) => (
          <Link key={book.slug} href={`/obra-literaria/${book.slug}`} className="group block">
            {/* Portada */}
            <div className="relative aspect-[2/3] bg-stone/10 overflow-hidden mb-5 shadow-sm group-hover:shadow-md transition-shadow">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <p className="text-xs tracking-widest uppercase text-stone mb-1">{book.genre}</p>
            <p className="font-serif text-xl text-charcoal group-hover:text-terracotta transition-colors mb-1">
              {book.title}
            </p>
            <p className="text-sm text-stone">
              {book.formats.join(" · ").toUpperCase()}
            </p>
          </Link>
        ))}
      </div>

      {/* Pack */}
      {pack && (
        <div className="border border-stone/20 p-8 sm:p-12 flex flex-col sm:flex-row gap-8 items-center">
          <div className="text-center sm:text-left flex-1">
            <p className="text-xs tracking-[0.25em] uppercase text-stone mb-2">Colección</p>
            <h2 className="font-serif text-3xl font-light text-charcoal mb-3">{pack.title}</h2>
            <p className="text-charcoal/60 mb-6 leading-relaxed">{pack.synopsis}</p>
            <Link
              href={`/obra-literaria/${pack.slug}`}
              className="inline-block px-8 py-3 border border-charcoal text-charcoal text-sm tracking-wide hover:bg-charcoal hover:text-ivory transition-colors"
            >
              Ver colección
            </Link>
          </div>
          <div className="flex gap-3 shrink-0">
            {books.map((b) => (
              <div key={b.slug} className="relative w-20 aspect-[2/3] shadow-sm">
                <Image src={b.coverImage} alt={b.title} fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Servicios Editoriales */}
      <div className="mt-20 border-t border-stone/20 pt-16 max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Servicios</p>
        <h2 className="font-serif text-3xl font-light text-charcoal mb-4">Servicios Editoriales</h2>
        <p className="text-charcoal/60 leading-relaxed mb-8">
          Si estás escribiendo un libro o tenés un proyecto editorial en mente, puedo acompañarte
          en el proceso. Trabajo en corrección de textos, diseño editorial, ilustración de portadas
          y maquetación. Escribime y charlamos.
        </p>
        <form
          action="https://formspree.io/f/xpqkygdo"
          method="POST"
          className="space-y-6"
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
      </div>
    </div>
  );
}
