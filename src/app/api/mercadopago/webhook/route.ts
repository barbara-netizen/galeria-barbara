import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createDownloadToken } from "@/lib/tokens";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // Solo procesamos notificaciones de pago
    if (type !== "payment" || !data?.id) {
      return NextResponse.json({ received: true });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "Config incompleta" }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const paymentClient = new Payment(client);

    // Verificar el estado real del pago (nunca confiar solo en el webhook)
    const payment = await paymentClient.get({ id: data.id });

    if (payment.status === "approved") {
      const productType = payment.metadata?.product_type;
      const productId = payment.metadata?.product_id;
      const buyerEmail = payment.payer?.email;

      if (productType === "ebook" && productId) {
        const token = createDownloadToken(productId);
        console.log(`Pago aprobado: ${productType} - ${productId} - ${buyerEmail} - Token: ${token}`);
        // Aquí podrías enviar email con el link de descarga
      } else {
        console.log(`Pago aprobado: ${productType} - ${productId} - ${buyerEmail}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 });
  }
}
