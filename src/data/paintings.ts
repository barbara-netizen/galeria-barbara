import type { Painting, PaintingSeries } from "@/types";

// ─── Obra disponible ──────────────────────────────────────────────────────────
// Única sección con status "available" y botón Consultar precio

const obraDisponible: Painting[] = [
  {
    slug: "as-de-espadas",
    title: "As de Espadas",
    medium: "Técnica mixta",
    dimensions: "100 × 50 cm",
    coverImage: "/images/paintings/asdeespadas.jpg",
    status: "available",
    category: "vida",
  },
  {
    slug: "1222-flores",
    title: "1222 Flores",
    medium: "Técnica mixta",
    dimensions: "120 × 150 cm",
    coverImage: "/images/paintings/muchasflores.jpg",
    status: "available",
    category: "flores",
  },
  {
    slug: "derivas",
    title: "Derivas",
    medium: "Técnica mixta",
    dimensions: "100 × 100 cm",
    coverImage: "/images/paintings/derivas.jpg",
    status: "available",
    category: "oleo",
  },
  {
    slug: "la-divorciada",
    title: "La Divorciada",
    medium: "Técnica mixta",
    dimensions: "70 × 80 cm",
    coverImage: "/images/paintings/ladivorciada.jpg",
    status: "available",
    category: "vida",
  },
  {
    slug: "refugios-temporales",
    title: "Refugios temporales para intemperies permanentes",
    medium: "Óleo",
    dimensions: "86 × 66 cm",
    coverImage: "/images/paintings/refugios.jpg",
    status: "available",
    category: "oleo",
  },
  {
    slug: "rocknbilly",
    title: "Rocknbilly",
    medium: "Técnica mixta",
    dimensions: "120 × 80 cm",
    coverImage: "/images/paintings/rocknbilly.jpg",
    status: "available",
    category: "baile",
  },
];

// ─── Quien nos quita lo bailado ───────────────────────────────────────────────

const quienNosQuita: Painting[] = [
  {
    slug: "bailongo",
    title: "Bailongo",
    coverImage: "/images/paintings/bailongo.jpg",
    status: "exhibited",
    category: "baile",
  },
  {
    slug: "aquellos-anos-ii",
    title: "Aquellos años II",
    coverImage: "/images/paintings/aquellosanos2.jpg",
    status: "exhibited",
    category: "baile",
  },
  {
    slug: "vals",
    title: "Vals",
    coverImage: "/images/paintings/vals.jpg",
    status: "exhibited",
    category: "baile",
  },
  {
    slug: "dia-de-saltar-por-las-praderas",
    title: "Día de saltar por las praderas",
    coverImage: "/images/paintings/diadesaltarporlaspraderas.jpg",
    status: "exhibited",
    category: "baile",
  },
  {
    slug: "3-pasitos",
    title: "3 Pasitos",
    coverImage: "/images/paintings/3pasitos.jpg",
    status: "exhibited",
    category: "baile",
  },
  {
    slug: "otros-pasos",
    title: "Otros pasos",
    coverImage: "/images/paintings/otrospasos1.jpg",
    status: "exhibited",
    category: "baile",
  },
  {
    slug: "maneras-de-andar",
    title: "Maneras de andar",
    coverImage: "/images/paintings/manerasdeandar1.jpg",
    status: "exhibited",
    category: "baile",
  },
  {
    slug: "praderas",
    title: "Praderas",
    coverImage: "/images/paintings/praderas.jpg",
    status: "exhibited",
    category: "baile",
  },
];

// ─── Flores ───────────────────────────────────────────────────────────────────

const flores: Painting[] = [
  {
    slug: "flores-marcianas",
    title: "Flores marcianas",
    coverImage: "/images/paintings/marcianas.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "no-me-pisen-las-flores",
    title: "No me pisen las Flores",
    coverImage: "/images/paintings/sacasusflores.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "flor",
    title: "Flor",
    coverImage: "/images/paintings/flor.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "muchas-flores-ii",
    title: "Muchas flores II",
    coverImage: "/images/paintings/muchasflores2.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "otras-amarillas",
    title: "Otras amarillas",
    coverImage: "/images/paintings/otrasamarillas.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "flor-de-cacao",
    title: "Flor de cacao",
    coverImage: "/images/paintings/flordecacao-mucho.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "flores-cacao",
    title: "Cacao",
    coverImage: "/images/paintings/cacao.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "flores-serendipia-blanca",
    title: "Serendipia Blanca",
    coverImage: "/images/paintings/serendipiablanca.jpg",
    status: "exhibited",
    category: "flores",
  },
  {
    slug: "flores-serendipia-florida",
    title: "Serendipia Florida",
    coverImage: "/images/paintings/serendipiaflorida.jpg",
    status: "exhibited",
    category: "flores",
  },
];

// ─── La vida conmigo ──────────────────────────────────────────────────────────

const laVidaConmigo: Painting[] = [
  {
    slug: "la-vida-conmigo",
    title: "La vida conmigo",
    coverImage: "/images/paintings/lavidaconmigo.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "lo-que-vendra",
    title: "Lo que vendrá",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/planeacion.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "la-divorciada-serie",
    title: "La Divorciada",
    coverImage: "/images/paintings/ladivorciada.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "as-de-espadas-serie",
    title: "As de Espadas",
    coverImage: "/images/paintings/asdeespadas.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "crisis",
    title: "Crisis",
    coverImage: "/images/paintings/crisis.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "el-amor",
    title: "El amor",
    coverImage: "/images/paintings/elamor.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "la-virazon",
    title: "La virazón",
    coverImage: "/images/paintings/lavirazon.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "camino",
    title: "Camino",
    coverImage: "/images/paintings/camino.jpg",
    status: "exhibited",
    category: "vida",
  },
  {
    slug: "urbanita",
    title: "Urbanita",
    coverImage: "/images/paintings/urbanita.jpg",
    status: "exhibited",
    category: "vida",
  },
];

// ─── Retratos ─────────────────────────────────────────────────────────────────

const retratos: Painting[] = [
  {
    slug: "dr-stahlberg",
    title: "Dr. Stahlberg",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/drsthalberg.jpg",
    status: "exhibited",
    category: "retratos",
  },
  {
    slug: "lety",
    title: "Lety",
    coverImage: "/images/paintings/lety.jpg",
    status: "exhibited",
    category: "retratos",
  },
  {
    slug: "paula",
    title: "Paula",
    coverImage: "/images/paintings/paula.jpg",
    status: "exhibited",
    category: "retratos",
  },
  {
    slug: "kiki",
    title: "Kiki",
    coverImage: "/images/paintings/kiki.jpg",
    status: "exhibited",
    category: "retratos",
  },
  {
    slug: "mi-viejo",
    title: "Mi Viejo",
    coverImage: "/images/paintings/miviejo.jpg",
    status: "exhibited",
    category: "retratos",
  },
  {
    slug: "autorretrato-con-hermana",
    title: "Autorretrato con Hermana",
    coverImage: "/images/paintings/autorretrato-con-hermana.jpg",
    status: "exhibited",
    category: "retratos",
  },
  {
    slug: "autorretrato-con-nino",
    title: "Autorretrato con Niño",
    coverImage: "/images/paintings/autorretratoconnino.jpg",
    status: "exhibited",
    category: "retratos",
  },
  {
    slug: "lyllien",
    title: "Lyllien",
    coverImage: "/images/paintings/lyllien.jpg",
    status: "exhibited",
    category: "retratos",
  },
];

// ─── Técnica mixta ────────────────────────────────────────────────────────────

const tecnicaMixta: Painting[] = [
  {
    slug: "sensei",
    title: "Sensei",
    coverImage: "/images/paintings/dc.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "las-queens",
    title: "Las Queens",
    coverImage: "/images/paintings/sindicatoamasdecasa.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "die-freiheit",
    title: "Die Freiheit Frei zu sein",
    dimensions: "80 × 120 cm",
    coverImage: "/images/paintings/richtungzukunft.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "4-pasos",
    title: "4 Pasos",
    coverImage: "/images/paintings/aquellosanos3.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "fuego",
    title: "Fuego",
    coverImage: "/images/paintings/arabescas.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "levitar",
    title: "Levitar",
    coverImage: "/images/paintings/gravedadcero.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "recortables",
    title: "Recortables",
    coverImage: "/images/paintings/recortables.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "biografias",
    title: "Biografías",
    coverImage: "/images/paintings/biografias.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "todas",
    title: "Todas",
    coverImage: "/images/paintings/todas.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
  {
    slug: "el-ano-del-conejo",
    title: "El año del conejo",
    coverImage: "/images/paintings/elanodelconejo.jpg",
    status: "exhibited",
    category: "tecnica-mixta",
  },
];

// ─── Óleo sobre tela ──────────────────────────────────────────────────────────

const oleoSobreTela: Painting[] = [
  {
    slug: "zukunft",
    title: "Zukunft",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/zukunft.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "friedrich",
    title: "Friedrich",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/friedrich.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "galicia",
    title: "Galicia",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/galicia.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "orense",
    title: "Orense",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/orense.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "orense-ii",
    title: "Orense II",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/orense2.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "balneario",
    title: "Balneario",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/balneario.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "piedelacuesta",
    title: "Pie de la Cuesta",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/piedelacuesta.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "piedelacuesta-ii",
    title: "Pie de la Cuesta II",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/piedelacuesta2.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "verdoloso",
    title: "Verdoloso",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/verdoloso.jpg",
    status: "exhibited",
    category: "oleo",
  },
  {
    slug: "cap-hielo",
    title: "Cap Hielo",
    medium: "Óleo sobre tela",
    coverImage: "/images/paintings/caphielo.jpg",
    status: "exhibited",
    category: "oleo",
  },
];

// ─── Series exportadas ────────────────────────────────────────────────────────

export const paintingSeries: PaintingSeries[] = [
  {
    slug: "obra-disponible",
    title: "Obra disponible",
    description: "Obras originales disponibles para adquirir. Consultá el precio directamente con Barbara.",
    paintings: obraDisponible,
  },
  {
    slug: "quien-nos-quita-lo-bailado",
    title: "Quien nos quita lo bailado",
    paintings: quienNosQuita,
  },
  {
    slug: "flores",
    title: "Flores",
    paintings: flores,
  },
  {
    slug: "la-vida-conmigo",
    title: "La vida conmigo",
    paintings: laVidaConmigo,
  },
  {
    slug: "retratos",
    title: "Retratos",
    paintings: retratos,
  },
  {
    slug: "tecnica-mixta",
    title: "Técnica mixta",
    paintings: tecnicaMixta,
  },
  {
    slug: "oleo-sobre-tela",
    title: "Óleo sobre tela",
    paintings: oleoSobreTela,
  },
];

// Exportar lista plana para el detalle individual ([slug]/page.tsx)
export const paintings: Painting[] = paintingSeries.flatMap((s) => s.paintings);
