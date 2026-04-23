import Link from "next/link";
import { ebooks } from "@/data/ebooks";

interface Props {
  searchParams: Promise<{ status?: string; product?: string }>;
}

export const metadata = { title: "Gracias" };

export default async function GraciasPage({ searchParams }: Props) {
  const params = await searchParams;
  const { status, product } = params;

  const isSuccess = status === "success";
  const isPending = status === "pending";

  const ebook = product ? ebooks.find((e) => e.slug === product) : null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <div className="text-left mb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone hover:text-charcoal transition-colors">
            ← Volver
          </Link>
        </div>
        {isSuccess && (
          <>
            <div className="w-16 h-16 rounded-full bg-olive/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl text-charcoal mb-4">Pago aprobado</h1>
            <p className="text-charcoal/60 mb-8 leading-relaxed">
              Gracias por tu compra. Acá están tus archivos de descarga.
            </p>

            {ebook && (
              <div className="space-y-4 mb-10">
                <p className="font-serif text-xl text-charcoal">{ebook.title}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {ebook.formats.map((format) => (
                    <a
                      key={format}
                      href={`/api/downloads?product=${ebook.slug}&format=${format}`}
                      className="inline-block px-8 py-3 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta transition-colors"
                    >
                      Descargar {format.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {isPending && (
          <>
            <div className="w-16 h-16 rounded-full bg-stone/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl text-charcoal mb-4">Pago pendiente</h1>
            <p className="text-charcoal/60 mb-8 leading-relaxed">
              Tu pago todavía se está procesando. Apenas se confirme, te llega un mail.
            </p>
          </>
        )}

        {!isSuccess && !isPending && (
          <>
            <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl text-charcoal mb-4">Algo salió mal</h1>
            <p className="text-charcoal/60 mb-8 leading-relaxed">
              No pude confirmar el pago. Si seguís con el problema, escribime.
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-3 border border-charcoal/30 text-charcoal text-sm tracking-wide hover:border-charcoal transition-colors"
          >
            Ir a contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
