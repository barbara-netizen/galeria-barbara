import { notFound } from "next/navigation";
import Link from "next/link";
import { animations } from "@/data/animations";
import AnimationInquiryForm from "@/components/forms/AnimationInquiryForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [...animations.map((a) => ({ slug: a.slug })), { slug: "contratar" }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug === "contratar") return { title: "Contratar animación" };
  const anim = animations.find((a) => a.slug === slug);
  return { title: anim?.title ?? "Animación" };
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

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
      <Link href="/animaciones" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors mb-8">
        ← Volver
      </Link>
      <nav className="text-xs text-stone mb-10 flex gap-2">
        <Link href="/" className="hover:text-charcoal transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/animaciones" className="hover:text-charcoal transition-colors">Animaciones</Link>
        <span>/</span>
        <span className="text-charcoal">{anim.title}</span>
      </nav>

      {/* Video embed */}
      <div className="relative aspect-video bg-charcoal mb-10">
        {anim.videoUrl.startsWith("/videos/") ? (
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
