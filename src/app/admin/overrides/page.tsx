import { notFound } from "next/navigation";
import Link from "next/link";
import { requireSession } from "@/lib/admin/guards";
import { listBranches } from "@/lib/menu/branches";
import { listProducts } from "@/lib/menu/products";
import { listBranchOverrides } from "@/lib/menu/overrides";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { OverrideRow } from "./OverrideRow";
import type { StockStatus } from "@/lib/constants";

export default async function OverridesPage({
  searchParams,
}: {
  searchParams: Promise<{ branchId?: string }>;
}) {
  const session = await requireSession();
  const branches = await listBranches();
  const { branchId: queryBranchId } = await searchParams;

  const isSuperAdmin = session.user.role === "super_admin";
  const branchId = isSuperAdmin
    ? queryBranchId || branches[0]?.id
    : session.user.branchId;

  const branch = branches.find((b) => b.id === branchId);
  if (!branch) {
    notFound();
  }

  const [products, overrides] = await Promise.all([
    listProducts(),
    listBranchOverrides(branch.id),
  ]);
  const overrideByProductId = new Map(overrides.map((o) => [o.productId, o]));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-coffee">
        Fiyat &amp; Stok — {branch.name}
      </h1>

      {isSuperAdmin && branches.length > 1 && (
        <div className="flex gap-2">
          {branches.map((b) => (
            <Link
              key={b.id}
              href={`/admin/overrides?branchId=${b.id}`}
              className={cn(
                "rounded-pill px-3.5 py-2 text-[13px] font-medium",
                b.id === branch.id ? "bg-accent text-surface" : "bg-surface-2 text-fg",
              )}
            >
              {b.name}
            </Link>
          ))}
        </div>
      )}

      <Card className="p-0">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-border text-[13px] text-muted">
              <th className="px-4 py-3 font-medium">Ürün</th>
              <th className="px-4 py-3 font-medium">Merkezi fiyat</th>
              <th className="px-4 py-3 font-medium">Şube fiyatı</th>
              <th className="px-4 py-3 font-medium">Stok</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => product.isActive)
              .map((product) => {
                const override = overrideByProductId.get(product.id);
                return (
                  <OverrideRow
                    key={product.id}
                    productId={product.id}
                    branchId={branch.id}
                    name={product.nameTr}
                    categoryName={product.category.nameTr}
                    defaultPrice={product.defaultPrice.toNumber()}
                    overridePrice={override?.price?.toNumber() ?? null}
                    stockStatus={(override?.stockStatus ?? "available") as StockStatus}
                  />
                );
              })}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted">
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
