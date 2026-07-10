"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FormError } from "@/components/ui/FormError";
import { formatPrice } from "@/components/ui/PriceTag";
import { updateOverridePriceAction, toggleOverrideStockAction } from "./actions";
import type { StockStatus } from "@/lib/constants";

export function OverrideRow({
  productId,
  branchId,
  name,
  categoryName,
  defaultPrice,
  overridePrice,
  stockStatus,
}: {
  productId: string;
  branchId: string;
  name: string;
  categoryName: string;
  defaultPrice: number;
  overridePrice: number | null;
  stockStatus: StockStatus;
}) {
  const action = updateOverridePriceAction.bind(null, productId, branchId);
  const [error, formAction, isPending] = useActionState(action, undefined);
  const isSoldOut = stockStatus === "sold_out";

  return (
    <tr className="h-14 border-b border-border align-top last:border-0">
      <td className="px-4 py-3">
        <div className="font-medium text-fg">{name}</div>
        <div className="text-[13px] text-muted">{categoryName}</div>
      </td>
      <td className="px-4 py-3 text-muted [font-variant-numeric:tabular-nums]">
        {formatPrice(defaultPrice)}
      </td>
      <td className="px-4 py-3">
        <form action={formAction} className="flex items-start gap-2">
          <Input
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder={String(defaultPrice)}
            defaultValue={overridePrice ?? ""}
            className="h-9 w-28"
          />
          <button
            type="submit"
            disabled={isPending}
            className="h-9 rounded-md border border-border px-3 text-[13px] font-medium text-fg hover:bg-surface-2"
          >
            Kaydet
          </button>
        </form>
        <FormError message={error} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Badge variant={isSoldOut ? "soldout" : "success"}>
            {isSoldOut ? "Tükendi" : "Mevcut"}
          </Badge>
          <form
            action={toggleOverrideStockAction.bind(
              null,
              productId,
              branchId,
              (isSoldOut ? "available" : "sold_out") satisfies StockStatus,
            )}
          >
            <button
              type="submit"
              className="text-[13px] font-medium text-accent hover:text-accent-hover"
            >
              {isSoldOut ? "Mevcut yap" : "Tükendi olarak işaretle"}
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}
