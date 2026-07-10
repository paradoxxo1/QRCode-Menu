import QRCode from "qrcode";

export function buildMenuUrl(slug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${baseUrl}/menu/${slug}`;
}

/** Inline PNG data URL for on-page preview (downloads go through /api/branches/[id]/qr instead). */
export async function getQrPreviewDataUrl(slug: string): Promise<string> {
  return QRCode.toDataURL(buildMenuUrl(slug), { margin: 1, width: 240 });
}
