import Link from "next/link";
import { requireSuperAdminSession } from "@/lib/admin/guards";
import { listProducts } from "@/lib/menu/products";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/components/ui/PriceTag";
import { toggleProductPublishedAction } from "./actions";

export default async function ProductsPage() {
  await requireSuperAdminSession();
  const products = await listProducts();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee">Ürünler</h1>
        <Link href="/admin/products/new">
          <Button>Yeni ürün</Button>
        </Link>
      </div>

      <Card className="p-0">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-border text-[13px] text-muted">
              <th className="px-4 py-3 font-medium">Ad</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Varsayılan fiyat</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="h-12 border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-fg">{product.nameTr}</td>
                <td className="px-4 py-3 text-muted">{product.category.nameTr}</td>
                <td className="px-4 py-3 text-fg [font-variant-numeric:tabular-nums]">
                  {formatPrice(product.defaultPrice.toNumber())}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={product.isActive ? "success" : "danger"}>
                    {product.isActive ? "Yayında" : "Yayından kaldırıldı"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-[13px] font-medium text-accent hover:text-accent-hover"
                    >
                      Düzenle
                    </Link>
                    <form
                      action={toggleProductPublishedAction.bind(
                        null,
                        product.id,
                        !product.isActive,
                      )}
                    >
                      <button
                        type="submit"
                        className="text-[13px] font-medium text-muted hover:text-fg"
                      >
                        {product.isActive ? "Yayından kaldır" : "Yayına al"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Henüz ürün yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
