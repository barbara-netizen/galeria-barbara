import { notFound } from "next/navigation";
import Link from "next/link";
import { animations } from "@/data/animations";
import AnimationInquiryForm from "@/components/forms/AnimationInquiryForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://barbaragutierrez.com.ar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [...animations.map((a) => ({ slug: a.slug })), { slug: "contratar" }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug === "contratar") {
    return {
      title: "Contratar animación — Bárbara Gutiérrez",
      description:
        "Pedí presupuesto para un proyecto de animación con Bárbara Gutiérrez: animación cuadro a cuadro, stop motion, rotoscopia. Animadora experimental argentina, Buenos Aires.",
      alternates: { canonical: "/animaciones/contratar" },
    };
  }
  const anim = animations.find((a) => a.slug === slug);
  if (!anim) return { title: "Animación no encontrada" };

  const description =
    anim.description ??
    `"${anim.title}" — animación de Bárbara Gutiérrez. Animadora experimental argentina radicada en Buenos Aires.`;

  return {
    title: `${anim.title} — Animación de Bárbara Gutiérrez`,
    description,
    alternates: { canonical: `/animaciones/${slug}` },
    openGraph: {
      title: `${anim.title} — Bárbara Gutiérrez`,
      description,
      url: `/animaciones/${slug}`,
      type: "video.other",
      images: [{ url: anim.posterImage, alt: `${anim.title}, animación de Bárbara Gutiérrez` }],
    },
  };
}

export default async function AnimationDetailPage({ params }: Props) {
  const { slug } = await params;

  // Página de contratación especial
  if (slug === "contratar") {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16">
        <Link href="/animaciones" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
          ← Volver
        </Link>
        <header className="mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3">Servicios</p>
          <h1 className="font-serif text-4xl font-light text-charcoal mb-4">
            Contratar animación
          </h1>
          <p className="text-charcoal/60 leading-relaxed">
            Contame sobre tu proyecto y te respondo con disponibilidad y presupuesto orientativo.
          </p>
        </header>
        <AnimationInquiryForm />
      </div>
    );
  }

  const anim = animations.find((a) => a.slug === slug);
  if (!anim) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: anim.title,
    description: anim.description,
    url: `${siteUrl}/animaciones/${slug}`,
    thumbnailUrl: `${siteUrl}${anim.posterImage}`,
    creator: {
      "@type": "Person",
      name: "Bárbara Gutiérrez",
      url: siteUrl,
    },
    ...(anim.duration && { duration: anim.duration }),
    ...(anim.client && { producer: { "@type": "Organization", name: anim.client } }),
  };

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/animaciones" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <nav className="text-xs text-stone mb-10 flex gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-charcoal transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/animaciones" className="hover:text-charcoal transition-colors">Animaciones</Link>
        <span>/</span>
        <span className="text-charcoal">{anim.title}</span>
      </nav>

      {/* Video embed */}
      <div className="relative aspect-video bg-charcoal mb-10">
        {anim.videoUrl ? (
          anim.videoUrl.startsWith("/videos/") ? (
            <video
              src={anim.videoUrl}
              controls
              playsInline
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <iframe
              src={anim.videoUrl}
              title={anim.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )
        ) : anim.vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${anim.vimeoId}?title=0&byline=0&portrait=0`}
            title={anim.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ivory/60 text-sm">
            Video no disponible
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info principal */}
        <div className="lg:col-span-2">
          <h1 className="font-serif text-4xl font-light text-charcoal mb-4">{anim.title}</h1>
          <p className="text-charcoal/70 leading-relaxed mb-8">{anim.description}</p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm border-t border-stone/20 pt-6">
            {anim.role && (
              <div>
                <dt className="text-stone mb-1">Rol</dt>
                <dd className="text-charcoal">{anim.role}</dd>
              </div>
            )}
            {anim.client && (
              <div>
                <dt className="text-stone mb-1">Cliente</dt>
                <dd className="text-charcoal">{anim.client}</dd>
              </div>
            )}
            {anim.duration && (
              <div>
                <dt className="text-stone mb-1">Duración</dt>
                <dd className="text-charcoal">{anim.duration}</dd>
              </div>
            )}
            {anim.tools && anim.tools.length > 0 && (
              <div>
                <dt className="text-stone mb-1">Herramientas</dt>
                <dd className="text-charcoal">{anim.tools.join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* CTA */}
        <div className="border-l border-stone/20 pl-8 flex flex-col justify-start">
          <p className="text-sm text-charcoal/60 mb-6 leading-relaxed">
            ¿Querés algo similar? Consultá disponibilidad y presupuesto.
          </p>
          <Link
            href="/animaciones/contratar"
            className="block text-center px-6 py-3 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta transition-colors"
          >
            Contratar servicio
          </Link>
        </div>
      </div>
    </div>
  );
}
