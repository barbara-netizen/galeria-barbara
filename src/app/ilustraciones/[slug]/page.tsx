import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { illustrations } from "@/data/illustrations";
import MercadoPagoButton from "@/components/commerce/MercadoPagoButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return illustrations.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const ill = illustrations.find((i) => i.slug === slug);
  return { title: ill?.title ?? "Ilustración" };
}

export default async function IllustrationDetailPage({ params }: Props) {
  const { slug } = await params;
  const ill = illustrations.find((i) => i.slug === slug);

  if (!ill) notFound();

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/ilustraciones" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <nav className="text-xs text-stone mb-10 flex gap-2">
        <Link href="/" className="hover:text-charcoal transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/ilustraciones" className="hover:text-charcoal transition-colors">Ilustraciones</Link>
        <span>/</span>
        <span className="text-charcoal">{ill.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Imagen */}
        <div className="relative aspect-square bg-stone/10">
          <Image
            src={ill.previewImage}
            alt={ill.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Detalle */}
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.2em] uppercase text-stone mb-2">Ilustración original</p>
          <h1 className="font-serif text-4xl font-light text-charcoal mb-4">{ill.title}</h1>
          {ill.description && (
            <p className="text-charcoal/70 leading-relaxed mb-6">{ill.description}</p>
          )}

          {/* Niveles de licencia */}
          <div className="mb-8">
            <p className="text-xs tracking-wide uppercase text-stone mb-4">Licencias disponibles</p>
            <div className="flex flex-col gap-4">
              {ill.licenses.map((license) => (
                <div key={license.type} className="border border-stone/20 p-5 bg-ivory">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-serif text-lg text-charcoal">{license.label}</p>
                      <p className="text-xs text-stone/70 mt-1">{license.description}</p>
                    </div>
                    <p className="font-serif text-2xl text-charcoal whitespace-nowrap ml-4">
                      USD {license.price}
                    </p>
                  </div>
                  <div className="mt-4">
                    <MercadoPagoButton
                      productId={`${ill.slug}-${license.type}`}
                      productType="illustration_license"
                      title={`${ill.title} — Licencia ${license.label}`}
                      price={license.price}
                      currency={license.currency}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-stone/60 text-center">
            Pago seguro vía MercadoPago · Archivo entregado por email
          </p>
        </div>
      </div>
    </div>
  );
}
