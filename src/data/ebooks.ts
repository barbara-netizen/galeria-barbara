import type { Ebook } from "@/types";

export const ebooks: Ebook[] = [
  {
    slug: "turistas",
    title: "Turistas",
    author: "Bárbara Gutiérrez",
    genre: "Antología de cuentos",
    coverImage: "/images/books/turistas-cover.jpg",
    synopsis:
      "Dieciocho cuentos que recorren lugares, personas y situaciones con la mirada de quien observa desde afuera. Una antología para leer de a poco o de una sentada.",
    formats: ["epub", "pdf"],
    pages: 120,
  },
];
