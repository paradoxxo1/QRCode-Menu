import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CategoryPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function CategoryPill({ active, className, ...props }: CategoryPillProps) {
  return (
    <button
      type="button"
      className={cn(
        "shrink-0 rounded-pill px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        active ? "bg-accent text-surface" : "bg-surface-2 text-fg",
        className,
      )}
      {...props}
    />
  );
}
