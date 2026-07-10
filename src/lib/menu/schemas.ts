import { z } from "zod";
import { STOCK_STATUSES } from "@/lib/constants";

export const categoryInputSchema = z.object({
  nameTr: z.string().trim().min(1, "Türkçe kategori adı zorunludur."),
  nameEn: z.string().trim().optional(),
  displayOrder: z.number().int().optional(),
});
export type CategoryInput = z.infer<typeof categoryInputSchema>;

export const productInputSchema = z.object({
  nameTr: z.string().trim().min(1, "Türkçe ürün adı zorunludur."),
  nameEn: z.string().trim().optional(),
  descTr: z.string().trim().optional(),
  descEn: z.string().trim().optional(),
  imagePath: z.string().trim().optional(),
  defaultPrice: z
    .number()
    .nonnegative("Fiyat negatif olamaz.")
    .refine((value) => Number.isFinite(value), "Geçerli bir fiyat giriniz."),
  calories: z.number().int().nonnegative("Kalori negatif olamaz.").nullable().optional(),
  categoryId: z.string().min(1, "Kategori seçilmelidir."),
  displayOrder: z.number().int().optional(),
});
export type ProductInput = z.infer<typeof productInputSchema>;

export const overrideInputSchema = z.object({
  productId: z.string().min(1),
  branchId: z.string().min(1),
  price: z.number().nonnegative("Fiyat negatif olamaz.").nullable().optional(),
  stockStatus: z.enum(STOCK_STATUSES).optional(),
});
export type OverrideInput = z.infer<typeof overrideInputSchema>;

export const branchInputSchema = z.object({
  name: z.string().trim().min(1, "Şube adı zorunludur."),
  address: z.string().trim().optional(),
  phone: z.string().trim().optional(),
});
export type BranchInput = z.infer<typeof branchInputSchema>;
