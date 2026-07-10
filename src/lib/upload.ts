import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { ValidationError } from "@/lib/menu/errors";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

/** Validates and writes a product photo to the VPS local disk, returning its public path. */
export async function saveProductImage(file: File): Promise<string> {
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new ValidationError("Yalnızca JPG, PNG veya WEBP dosyaları yüklenebilir.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new ValidationError("Görsel boyutu 5MB'ı geçemez.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/products/${filename}`;
}
