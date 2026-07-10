import { prisma } from "@/lib/prisma";
import { ValidationError } from "@/lib/menu/errors";
import { branchInputSchema, type BranchInput } from "@/lib/menu/schemas";
import { generateUniqueBranchSlug } from "@/lib/menu/slug";
import type { BranchStatus } from "@/lib/constants";

export async function createBranch(input: BranchInput) {
  const parsed = branchInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz şube.");
  }
  const { name, address, phone } = parsed.data;
  const slug = await generateUniqueBranchSlug(name);

  return prisma.branch.create({
    data: { name, slug, address: address || null, phone: phone || null },
  });
}

export async function updateBranch(id: string, input: BranchInput) {
  const parsed = branchInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz şube.");
  }
  const { name, address, phone } = parsed.data;

  return prisma.branch.update({
    where: { id },
    data: { name, address: address || null, phone: phone || null },
  });
}

/** Deactivate/reactivate: branches are never removed, so overrides/QR history stay intact. */
export async function setBranchStatus(id: string, status: BranchStatus) {
  return prisma.branch.update({ where: { id }, data: { status } });
}

/**
 * Deletes a branch from the admin UI (soft-delete: the row is kept for data
 * integrity, but hidden everywhere). Only allowed when nothing depends on the
 * branch yet — assigned managers or price/stock overrides must be cleared
 * (or the branch just deactivated instead) first.
 */
export async function deleteBranch(id: string) {
  const [managerCount, overrideCount] = await Promise.all([
    prisma.user.count({ where: { branchId: id } }),
    prisma.productBranchOverride.count({ where: { branchId: id } }),
  ]);

  if (managerCount > 0 || overrideCount > 0) {
    throw new ValidationError(
      "Bu şubeye atanmış yönetici hesabı veya fiyat/stok kaydı olduğu için silinemez. Önce bunları kaldırın veya şubeyi pasife alın.",
    );
  }

  await prisma.branch.update({ where: { id }, data: { status: "deleted" } });
}

export async function listBranches() {
  return prisma.branch.findMany({
    where: { status: { not: "deleted" } },
    orderBy: { name: "asc" },
  });
}

export async function getBranchById(id: string) {
  const branch = await prisma.branch.findUnique({ where: { id } });
  if (!branch || branch.status === "deleted") {
    return null;
  }
  return branch;
}
