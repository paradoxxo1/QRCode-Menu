import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { cn } from "@/lib/cn";

export interface ProductCardProps {
  name: string;
  description?: string | null;
  price: number;
  calories?: number | null;
  imagePath?: string | null;
  soldOut?: boolean;
  soldOutLabel?: string;
  badges?: { label: string; variant: "popular" | "vegan" }[];
}

export function ProductCard({
  name,
  description,
  price,
  calories,
  imagePath,
  soldOut,
  soldOutLabel = "Tükendi",
  badges,
}: ProductCardProps) {
  return (
    <Card className={cn("min-h-11", soldOut && "opacity-55")}>
      {imagePath && (
        <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-sm">
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      )}
      <div className="grid grid-cols-[1fr_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold text-fg">{name}</h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-[13px] text-muted">
              {description}
            </p>
          )}
          {calories != null && (
            <p className="mt-1 text-[12px] tracking-[0.01em] text-muted">{calories} kcal</p>
          )}
        </div>
        <PriceTag amount={price} className="mt-0.5" />
      </div>
      {(soldOut || (badges && badges.length > 0)) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {soldOut && <Badge variant="soldout">{soldOutLabel}</Badge>}
          {badges?.map((badge) => (
            <Badge key={badge.label} variant={badge.variant}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}
