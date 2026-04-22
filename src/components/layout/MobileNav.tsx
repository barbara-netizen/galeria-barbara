"use client";

import Link from "next/link";
import { useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: NavLink[];
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileNav({ links, open, onClose, pathname }: MobileNavProps) {
  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ivory">
      {/* Header del drawer */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-stone/20">
        <span className="font-serif text-xl text-charcoal">Bárbara Gutiérrez</span>
        <button
          aria-label="Cerrar menú"
          onClick={onClose}
          className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col px-5 py-8 gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`py-4 text-2xl font-serif border-b border-stone/15 transition-colors ${
              pathname === link.href
                ? "text-terracotta"
                : "text-charcoal/80 hover:text-charcoal"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
