"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/pintura", label: "Pintura" },
  { href: "/ilustraciones", label: "Ilustraciones" },
  { href: "/animaciones", label: "Animaciones" },
  { href: "/obra-literaria", label: "Obra literaria" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-ivory/90 backdrop-blur-sm border-b border-stone/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl tracking-wide text-charcoal hover:text-terracotta transition-colors"
          >
            Bárbara Gutiérrez
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname.startsWith(link.href)
                    ? "text-terracotta"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            aria-label="Abrir menú"
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block w-6 h-px bg-charcoal" />
            <span className="block w-6 h-px bg-charcoal" />
            <span className="block w-4 h-px bg-charcoal" />
          </button>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      <MobileNav
        links={navLinks}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
