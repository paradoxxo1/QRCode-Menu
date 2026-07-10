import type { StockStatus } from "@/lib/constants";

export interface ResolvedProduct {
  id: string;
  name: string;
  description: string | null;
  imagePath: string | null;
  price: number;
  calories: number | null;
  /** True when the price shown differs from the product's central default. */
  hasBranchPrice: boolean;
  stockStatus: StockStatus;
  displayOrder: number;
}

export interface ResolvedCategory {
  id: string;
  name: string;
  displayOrder: number;
  products: ResolvedProduct[];
}

export interface BranchMenu {
  branch: {
    id: string;
    name: string;
    slug: string;
  };
  categories: ResolvedCategory[];
}
