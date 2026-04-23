import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { validateToken, markTokenUsed } from "@/lib/tokens";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const productId = searchParams.get("product");
  const format = searchParams.get("format") ?? "pdf";

  if (!token || !productId) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  const entry = validateToken(token);
  if (!entry || entry.productId !== productId) {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 403 });
  }

  // Determinar nombre de archivo
  const fileName = `${productId}.${format}`;
  const filePath = join(process.cwd(), "public", "downloads", fileName);

  try {
    const fileBuffer = readFileSync(filePath);
    markTokenUsed(token);

    const contentType = format === "epub" ? "application/epub+zip" : "application/pdf";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
  }
}
