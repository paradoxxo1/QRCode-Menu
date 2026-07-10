import { requireSuperAdminSession } from "@/lib/admin/guards";
import { listCategories } from "@/lib/menu/categories";
import { Card } from "@/components/ui/Card";
import { ProductForm } from "../ProductForm";
import { createProductAction } from "../actions";

export default async function NewProductPage() {
  await requireSuperAdminSession();
  const categories = await listCategories();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-coffee">Yeni ürün</h1>
      <Card className="max-w-2xl p-6">
        <ProductForm action={createProductAction} categories={categories} submitLabel="Oluştur" />
      </Card>
    </div>
  );
}
