import Link from "next/link";
import { requireSuperAdminSession } from "@/lib/admin/guards";
import { listCategories } from "@/lib/menu/categories";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toggleCategoryActiveAction } from "./actions";

export default async function CategoriesPage() {
  await requireSuperAdminSession();
  const categories = await listCategories();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee">Kategoriler</h1>
        <Link href="/admin/categories/new">
          <Button>Yeni kategori</Button>
        </Link>
      </div>

      <Card className="p-0">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-border text-[13px] text-muted">
              <th className="px-4 py-3 font-medium">Ad (TR)</th>
              <th className="px-4 py-3 font-medium">Ad (EN)</th>
              <th className="px-4 py-3 font-medium">Sıra</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="h-12 border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-fg">{category.nameTr}</td>
                <td className="px-4 py-3 text-muted">{category.nameEn ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{category.displayOrder}</td>
                <td className="px-4 py-3">
                  <Badge variant={category.isActive ? "success" : "danger"}>
                    {category.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className="text-[13px] font-medium text-accent hover:text-accent-hover"
                    >
                      Düzenle
                    </Link>
                    <form
                      action={toggleCategoryActiveAction.bind(
                        null,
                        category.id,
                        !category.isActive,
                      )}
                    >
                      <button
                        type="submit"
                        className="text-[13px] font-medium text-muted hover:text-fg"
                      >
                        {category.isActive ? "Pasife al" : "Aktifleştir"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Henüz kategori yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
