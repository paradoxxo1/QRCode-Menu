import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { auth } from "@/auth";
import { assertIsSuperAdmin } from "@/lib/authz";
import { getBranchById } from "@/lib/menu/branches";
import { buildMenuUrl } from "@/lib/qr";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
  } catch {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 403 });
  }

  const { id } = await params;
  const branch = await getBranchById(id);
  if (!branch) {
    return NextResponse.json({ error: "Şube bulunamadı." }, { status: 404 });
  }

  const format = request.nextUrl.searchParams.get("format") === "svg" ? "svg" : "png";
  const menuUrl = buildMenuUrl(branch.slug);

  if (format === "svg") {
    const svg = await QRCode.toString(menuUrl, { type: "svg", margin: 1 });
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Disposition": `attachment; filename="${branch.slug}-qr.svg"`,
      },
    });
  }

  const png = await QRCode.toBuffer(menuUrl, { type: "png", margin: 1, width: 512 });
  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${branch.slug}-qr.png"`,
    },
  });
}
