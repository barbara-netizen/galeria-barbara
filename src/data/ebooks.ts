import type { Ebook } from "@/types";

export const ebooks: Ebook[] = [
  {
    slug: "cuentos-extranjera",
    title: "Los cuentos de la extranjera",
    author: "Bárbara Gutiérrez",
    genre: "Cuentos",
    coverImage: "/images/books/cuentos-extranjera-cover.jpg",
    synopsis:
      "Cuentos de una argentina afuera. Ser extranjera como lente: lo que se ve distinto, lo que no encaja, lo que de repente tiene sentido.",
    formats: ["epub", "pdf"],
    price: 3.99,
    currency: "USD",
    downloadAssetId: "cuentos-extranjera-v1",
  },
  {
    slug: "letra-chica",
    title: "La letra chica",
    author: "Bárbara Gutiérrez",
    genre: "Novela/relato",
    coverImage: "/images/books/letra-chica-cover.jpg",
    synopsis:
      "Una mujer que abre los ojos y decide que ese cuerpo es suyo. Relato íntimo con algo de ciencia ficción, mucho de presente.",
    formats: ["epub", "pdf"],
    price: 3.99,
    currency: "USD",
    downloadAssetId: "letra-chica-v1",
  },
  {
    slug: "poemario-corrido",
    title: "Poemario corrido",
    author: "Bárbara Gutiérrez",
    genre: "Poesía",
    coverImage: "/images/books/poemario-corrido-cover.jpg",
    synopsis:
      "Poemas que empujan hacia adelante. Sobre el pasado que muerde y el cuerpo que igual camina.",
    formats: ["epub", "pdf"],
    price: 2.99,
    currency: "USD",
    downloadAssetId: "poemario-corrido-v1",
  },
  {
    slug: "pack-completo",
    title: "Pack completo — los tres libros",
    author: "Bárbara Gutiérrez",
    genre: "Pack",
    coverImage: "/images/books/cuentos-extranjera-cover.jpg",
    synopsis:
      "Los tres libros en un solo paquete: cuentos, relato y poesía. Precio especial.",
    formats: ["epub", "pdf"],
    price: 8.99,
    currency: "USD",
    downloadAssetId: "pack-completo-v1",
    isBundle: true,
  },
];
