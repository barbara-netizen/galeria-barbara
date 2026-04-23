import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ebooks } from "@/data/ebooks";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ebooks.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const book = ebooks.find((b) => b.slug === slug);
  return { title: book?.title ?? "Libro" };
}

export default async function EbookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = ebooks.find((b) => b.slug === slug);

  if (!book) notFound();

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/obra-literaria" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <nav className="text-xs text-stone mb-10 flex gap-2">
        <Link href="/" className="hover:text-charcoal transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/obra-literaria" className="hover:text-charcoal transition-colors">Obra literaria</Link>
        <span>/</span>
        <span className="text-charcoal">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Portada */}
        <div className="relative aspect-[2/3] bg-stone/10 shadow-md max-w-sm mx-auto lg:mx-0 w-full">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Detalle */}
        <div>
          {book.genre && (
            <p className="text-xs tracking-[0.25em] uppercase text-stone mb-2">{book.genre}</p>
          )}
          <h1 className="font-serif text-4xl font-light text-charcoal mb-2">{book.title}</h1>
          {book.author && (
            <p className="text-sm text-stone mb-6">{book.author}</p>
          )}
          <p className="text-charcoal/70 leading-relaxed mb-8">{book.synopsis}</p>

          {/* Metadata */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm border-t border-b border-stone/20 py-5 mb-8">
            <div>
              <dt className="text-stone mb-1">Formato</dt>
              <dd className="text-charcoal">{book.formats.join(", ").toUpperCase()}</dd>
            </div>
            {book.pages && (
              <div>
                <dt className="text-stone mb-1">Páginas</dt>
                <dd className="text-charcoal">{book.pages}</dd>
              </div>
            )}
          </dl>

          {/* Muestra */}
          {book.sampleUrl && (
            <a
              href={book.sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mb-4 text-sm text-charcoal/60 hover:text-charcoal underline underline-offset-4 transition-colors"
            >
              Leer muestra gratuita →
            </a>
          )}

          <Link
            href="/contacto"
            className="block text-center px-6 py-3 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta transition-colors"
          >
            Consultar por este libro
          </Link>
        </div>
      </div>
    </div>
  );
}
