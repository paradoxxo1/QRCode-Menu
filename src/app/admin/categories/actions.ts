"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { assertIsSuperAdmin } from "@/lib/authz";
import { toActionErrorMessage } from "@/lib/actionError";
import { createCategory, updateCategory, setCategoryActive } from "@/lib/menu/categories";

function readCategoryForm(formData: FormData) {
  const displayOrder = formData.get("displayOrder");
  return {
    nameTr: String(formData.get("nameTr") ?? ""),
    nameEn: String(formData.get("nameEn") ?? "") || undefined,
    displayOrder: displayOrder ? Number(displayOrder) : undefined,
  };
}

export async function createCategoryAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await createCategory(readCategoryForm(formData));
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(
  id: string,
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await updateCategory(id, readCategoryForm(formData));
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function toggleCategoryActiveAction(id: string, nextActive: boolean) {
  const session = await auth();
  assertIsSuperAdmin(session);
  await setCategoryActive(id, nextActive);
  revalidatePath("/admin/categories");
}
