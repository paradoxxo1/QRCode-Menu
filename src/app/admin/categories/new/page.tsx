import { requireSuperAdminSession } from "@/lib/admin/guards";
import { Card } from "@/components/ui/Card";
import { CategoryForm } from "../CategoryForm";
import { createCategoryAction } from "../actions";

export default async function NewCategoryPage() {
  await requireSuperAdminSession();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-coffee">Yeni kategori</h1>
      <Card className="max-w-md p-6">
        <CategoryForm action={createCategoryAction} submitLabel="Oluştur" />
      </Card>
    </div>
  );
}
