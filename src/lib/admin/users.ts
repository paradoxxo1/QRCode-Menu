import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ValidationError } from "@/lib/menu/errors";

const createManagerSchema = z.object({
  email: z.string().trim().toLowerCase().email("Geçerli bir e-posta giriniz."),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır."),
  branchId: z.string().min(1),
});
export type CreateManagerInput = z.infer<typeof createManagerSchema>;

export async function createBranchManager(input: CreateManagerInput) {
  const parsed = createManagerSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz kullanıcı bilgisi.");
  }
  const { email, password, branchId } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ValidationError("Bu e-posta adresi zaten kullanılıyor.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, passwordHash, role: "branch_manager", branchId, isActive: true },
  });
}

export async function listUsersByBranch(branchId: string) {
  return prisma.user.findMany({ where: { branchId }, orderBy: { email: "asc" } });
}

export async function setUserActive(id: string, isActive: boolean) {
  return prisma.user.update({ where: { id }, data: { isActive } });
}

/** Permanently removes a manager account (frees its email and unblocks branch deletion). */
export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
}
