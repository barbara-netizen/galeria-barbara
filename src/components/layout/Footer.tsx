import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone/20 bg-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Identidad */}
        <div>
          <p className="font-serif text-lg text-charcoal mb-1">Bárbara Gutiérrez</p>
          <p className="text-sm text-stone">Pintora · Ilustradora · Animadora · Escritora</p>
        </div>

        {/* Nav footer */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/60">
          <Link href="/pintura" className="hover:text-charcoal transition-colors">Pintura</Link>
          <Link href="/ilustraciones" className="hover:text-charcoal transition-colors">Ilustraciones</Link>
          <Link href="/animaciones" className="hover:text-charcoal transition-colors">Animaciones</Link>
          <Link href="/obra-literaria" className="hover:text-charcoal transition-colors">Obra literaria</Link>
          <Link href="/contacto" className="hover:text-charcoal transition-colors">Contacto</Link>
        </nav>

        {/* Legal */}
        <div className="text-xs text-stone text-right">
          <p>© {currentYear} Bárbara Gutiérrez</p>
          <p className="mt-1">
            <Link href="/contacto" className="hover:text-charcoal transition-colors">Licencias y términos</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
