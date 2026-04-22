import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { paintings, paintingSeries } from "@/data/paintings";
import PaintingInquiryForm from "@/components/forms/PaintingInquiryForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return paintings.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const painting = paintings.find((p) => p.slug === slug);
  return { title: painting?.title ?? "Obra" };
}

export default async function PaintingDetailPage({ params }: Props) {
  const { slug } = await params;
  const painting = paintings.find((p) => p.slug === slug);

  if (!painting) notFound();

  // Find which series this painting belongs to
  const serie = paintingSeries.find((s) => s.paintings.some((p) => p.slug === slug));

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/pintura" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      {/* Breadcrumb */}
      <nav className="text-xs text-stone mb-10 flex gap-2">
        <Link href="/" className="hover:text-charcoal transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/pintura" className="hover:text-charcoal transition-colors">Pintura</Link>
        {serie && (
          <>
            <span>/</span>
            <Link
              href={`/pintura#${serie.slug}`}
              className="hover:text-charcoal transition-colors"
            >
              {serie.title}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-charcoal">{painting.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Imagen */}
        <div className="relative aspect-[4/5] bg-stone/10">
          <Image
            src={painting.coverImage}
            alt={painting.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
          {painting.status === "available" && (
            <span className="absolute top-4 right-4 text-xs px-3 py-1.5 tracking-wide bg-terracotta text-ivory">
              Disponible
            </span>
          )}
        </div>

        {/* Detalle */}
        <div className="flex flex-col justify-center">
          <h1 className="font-serif text-4xl font-light text-charcoal mb-2">
            {painting.title}
          </h1>
          {serie && (
            <p className="text-sm text-stone mb-6">Serie: {serie.title}</p>
          )}

          {/* Ficha técnica solo si hay datos */}
          {(painting.medium || painting.dimensions || painting.year) && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mb-8 border-t border-b border-stone/20 py-6">
              {painting.year && (
                <div>
                  <dt className="text-stone mb-1">Año</dt>
                  <dd className="text-charcoal">{painting.year}</dd>
                </div>
              )}
              {painting.medium && (
                <div>
                  <dt className="text-stone mb-1">Técnica</dt>
                  <dd className="text-charcoal">{painting.medium}</dd>
                </div>
              )}
              {painting.dimensions && (
                <div>
                  <dt className="text-stone mb-1">Dimensiones</dt>
                  <dd className="text-charcoal">{painting.dimensions}</dd>
                </div>
              )}
            </dl>
          )}

          {painting.description && (
            <p className="text-charcoal/70 leading-relaxed mb-8">{painting.description}</p>
          )}

          {painting.status === "available" && (
            <div className="mt-4">
              <p className="text-sm text-stone mb-6">
                Esta obra está disponible. Consultá el precio directamente con Barbara.
              </p>
              <PaintingInquiryForm paintingTitle={painting.title} />
            </div>
          )}

          {painting.status === "exhibited" && (
            <p className="text-sm text-stone/70 italic">
              Esta obra forma parte de una colección y no está disponible para adquirir en este momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
