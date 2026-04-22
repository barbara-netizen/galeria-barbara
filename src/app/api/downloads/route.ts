import { NextRequest, NextResponse } from "next/server";

// En producción: validar token de descarga + servir archivo desde storage seguro
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const productId = searchParams.get("productId");

  if (!token || !productId) {
    return NextResponse.json({ error: "Token inválido" }, { status: 400 });
  }

  // TODO: Validar token contra base de datos o KV store
  // Por ahora responde con placeholder
  return NextResponse.json({
    message: "Descarga disponible",
    downloadUrl: `/downloads/${productId}.pdf`,
  });
}
