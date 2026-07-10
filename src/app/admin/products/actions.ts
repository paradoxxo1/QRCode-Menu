"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { assertIsSuperAdmin } from "@/lib/authz";
import { toActionErrorMessage } from "@/lib/actionError";
import { createProduct, updateProduct, setProductPublished } from "@/lib/menu/products";
import { saveProductImage } from "@/lib/upload";

async function resolveImagePath(formData: FormData): Promise<string | undefined> {
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    return saveProductImage(file);
  }
  const current = String(formData.get("currentImagePath") ?? "").trim();
  return current || undefined;
}

async function readProductForm(formData: FormData) {
  const displayOrder = formData.get("displayOrder");
  const calories = String(formData.get("calories") ?? "").trim();
  return {
    nameTr: String(formData.get("nameTr") ?? ""),
    nameEn: String(formData.get("nameEn") ?? "") || undefined,
    descTr: String(formData.get("descTr") ?? "") || undefined,
    descEn: String(formData.get("descEn") ?? "") || undefined,
    imagePath: await resolveImagePath(formData),
    defaultPrice: Number(formData.get("defaultPrice")),
    calories: calories === "" ? null : Number(calories),
    categoryId: String(formData.get("categoryId") ?? ""),
    displayOrder: displayOrder ? Number(displayOrder) : undefined,
  };
}

export async function createProductAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await createProduct(await readProductForm(formData));
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  id: string,
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await updateProduct(id, await readProductForm(formData));
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function toggleProductPublishedAction(id: string, nextActive: boolean) {
  const session = await auth();
  assertIsSuperAdmin(session);
  await setProductPublished(id, nextActive);
  revalidatePath("/admin/products");
}
