import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "popular" | "vegan" | "soldout" | "success" | "warn" | "danger";

const variants: Record<BadgeVariant, string> = {
  popular: "bg-accent-soft text-accent",
  vegan: "bg-surface-2 text-coffee",
  soldout: "bg-danger-soft text-danger",
  success: "bg-success-soft text-success",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "popular", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-1 text-[11px] font-medium tracking-[0.04em] uppercase",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
