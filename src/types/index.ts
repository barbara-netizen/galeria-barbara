// ─── Pintura ─────────────────────────────────────────────────────────────────
export type PaintingStatus = "exhibited" | "available";

export type PaintingCategory =
  | "baile"
  | "flores"
  | "vida"
  | "retratos"
  | "tecnica-mixta"
  | "oleo";

export interface Painting {
  slug: string;
  title: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  series?: string;
  coverImage: string;
  gallery?: string[];
  description?: string;
  status: PaintingStatus;
  category: PaintingCategory;
}

export interface PaintingSeries {
  slug: string;
  title: string;
  description?: string;
  paintings: Painting[];
}

// ─── Ilustraciones ────────────────────────────────────────────────────────────
export type LicenseType = "personal" | "editorial" | "commercial";

export interface IllustrationLicense {
  type: LicenseType;
  label: string;
  description: string;
  price: number;
  currency: "USD";
}

export interface Illustration {
  slug: string;
  title: string;
  description?: string;
  previewImage: string;
  tags?: string[];
  licenses: IllustrationLicense[];
}

// ─── Animaciones ──────────────────────────────────────────────────────────────
export type AnimationCategory =
  | "stop-motion"
  | "redes-sociales"
  | "cuadro-x-cuadro"
  | "gifs"
  | "videos-cortos";

export interface Animation {
  slug: string;
  title: string;
  description: string;
  posterImage: string;
  videoUrl: string;
  category: AnimationCategory;
  duration?: string;
  role?: string;
  tools?: string[];
  client?: string;
  featured?: boolean;
}

// ─── Obra literaria ───────────────────────────────────────────────────────────
export type EbookFormat = "epub" | "pdf";

export interface Ebook {
  slug: string;
  title: string;
  author?: string;
  genre?: string;
  coverImage: string;
  synopsis: string;
  formats: EbookFormat[];
  pages?: number;
  price: number;
  currency: "ARS" | "USD";
  sampleUrl?: string;
  downloadAssetId: string;
  isBundle?: boolean;
}

// ─── MercadoPago ─────────────────────────────────────────────────────────────
export type ProductType = "illustration_license" | "ebook";

export interface PaymentItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  productType: ProductType;
  buyerEmail?: string;
}
