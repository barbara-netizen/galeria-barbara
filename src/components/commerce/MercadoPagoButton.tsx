"use client";

import { useState } from "react";
import type { ProductType } from "@/types";

interface Props {
  productId: string;
  productType: ProductType;
  title: string;
  price: number;
  currency: string;
}

export default function MercadoPagoButton({
  productId,
  productType,
  title,
  price,
  currency,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, productType, title, price, currency }),
      });

      if (!res.ok) throw new Error("Error al crear la preferencia de pago.");

      const data = await res.json();
      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        throw new Error("No se recibió la URL de pago.");
      }
    } catch (err) {
      setError("No pudimos conectar con el sistema de pago. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full px-10 py-4 bg-charcoal text-ivory text-sm tracking-wide hover:bg-terracotta disabled:opacity-60 transition-colors"
      >
        {loading ? "Redirigiendo..." : "Comprar con MercadoPago"}
      </button>
      {error && <p className="text-sm text-terracotta mt-3 text-center">{error}</p>}
    </div>
  );
}
