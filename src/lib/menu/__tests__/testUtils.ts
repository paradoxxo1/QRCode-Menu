import { prisma } from "@/lib/prisma";

/** Wipes all menu-related tables in FK-safe order, for isolation between tests. */
export async function resetDb() {
  await prisma.productBranchOverride.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.branch.deleteMany();
}
