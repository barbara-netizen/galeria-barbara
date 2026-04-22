import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { z } from "zod";

const bodySchema = z.object({
  productId: z.string().min(1),
  productType: z.enum(["illustration_license", "ebook"]),
  title: z.string().min(1),
  price: z.number().positive(),
  currency: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { productId, productType, title, price, currency } = parsed.data;

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "Configuración de pago incompleta" }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const result = await preference.create({
      body: {
        items: [
          {
            id: productId,
            title,
            quantity: 1,
            unit_price: price,
            currency_id: currency,
          },
        ],
        metadata: {
          productType,
          productId,
        },
        back_urls: {
          success: `${baseUrl}/gracias?status=success&product=${productId}`,
          failure: `${baseUrl}/gracias?status=failure`,
          pending: `${baseUrl}/gracias?status=pending`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/mercadopago/webhook`,
      },
    });

    return NextResponse.json({ initPoint: result.init_point });
  } catch (err) {
    console.error("MercadoPago error:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
