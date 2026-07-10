"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { assertCanEditBranch } from "@/lib/authz";
import { toActionErrorMessage } from "@/lib/actionError";
import { ValidationError } from "@/lib/menu/errors";
import { setBranchOverride, setStockStatus } from "@/lib/menu/overrides";
import type { StockStatus } from "@/lib/constants";

export async function updateOverridePriceAction(
  productId: string,
  branchId: string,
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertCanEditBranch(session, branchId);
    const raw = String(formData.get("price") ?? "").trim();
    const price = raw === "" ? null : Number(raw);
    if (price !== null && (Number.isNaN(price) || price < 0)) {
      throw new ValidationError("Geçerli bir fiyat giriniz.");
    }
    await setBranchOverride({ productId, branchId, price });
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/overrides");
  return undefined;
}

export async function toggleOverrideStockAction(
  productId: string,
  branchId: string,
  nextStatus: StockStatus,
) {
  const session = await auth();
  assertCanEditBranch(session, branchId);
  await setStockStatus(productId, branchId, nextStatus);
  revalidatePath("/admin/overrides");
}
