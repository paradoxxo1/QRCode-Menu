"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { assertIsSuperAdmin } from "@/lib/authz";
import { toActionErrorMessage } from "@/lib/actionError";
import { createBranch, updateBranch, setBranchStatus, deleteBranch } from "@/lib/menu/branches";
import { createBranchManager, setUserActive, deleteUser } from "@/lib/admin/users";
import type { BranchStatus } from "@/lib/constants";

function readBranchForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    address: String(formData.get("address") ?? "") || undefined,
    phone: String(formData.get("phone") ?? "") || undefined,
  };
}

export async function createBranchAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await createBranch(readBranchForm(formData));
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/branches");
  redirect("/admin/branches");
}

export async function updateBranchAction(
  id: string,
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await updateBranch(id, readBranchForm(formData));
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/branches");
  redirect("/admin/branches");
}

export async function toggleBranchStatusAction(id: string, nextStatus: BranchStatus) {
  const session = await auth();
  assertIsSuperAdmin(session);
  await setBranchStatus(id, nextStatus);
  revalidatePath("/admin/branches");
}

export async function deleteBranchAction(
  id: string,
  _prevState: string | undefined,
  _formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await deleteBranch(id);
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath("/admin/branches");
  return undefined;
}

export async function createManagerAction(
  branchId: string,
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  try {
    assertIsSuperAdmin(session);
    await createBranchManager({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      branchId,
    });
  } catch (error) {
    return toActionErrorMessage(error);
  }
  revalidatePath(`/admin/branches/${branchId}`);
  return undefined;
}

export async function toggleManagerActiveAction(
  userId: string,
  branchId: string,
  nextActive: boolean,
) {
  const session = await auth();
  assertIsSuperAdmin(session);
  await setUserActive(userId, nextActive);
  revalidatePath(`/admin/branches/${branchId}`);
}

export async function deleteManagerAction(userId: string, branchId: string) {
  const session = await auth();
  assertIsSuperAdmin(session);
  await deleteUser(userId);
  revalidatePath(`/admin/branches/${branchId}`);
}
