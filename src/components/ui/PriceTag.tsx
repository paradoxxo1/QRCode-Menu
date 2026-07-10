import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface PriceTagProps extends HTMLAttributes<HTMLSpanElement> {
  amount: number;
  emphasis?: boolean;
}

export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `₺${formatted}`;
}

export function PriceTag({ amount, emphasis, className, ...props }: PriceTagProps) {
  return (
    <span
      className={cn(
        "text-[16px] font-semibold [font-variant-numeric:tabular-nums]",
        emphasis ? "text-accent" : "text-fg",
        className,
      )}
      {...props}
    >
      {formatPrice(amount)}
    </span>
  );
}
