// SQL Server has no native enum type, so these values are stored as plain
// strings (see prisma/schema.prisma). This file is the single source of
// truth for the allowed literals.

export const ROLES = ["super_admin", "branch_manager"] as const;
export type Role = (typeof ROLES)[number];

// "deleted" is a soft-delete: the row is kept (managers/overrides/QR history
// stay intact) but the branch is hidden everywhere in the admin UI and its
// public menu 404s, same as "inactive".
export const BRANCH_STATUSES = ["active", "inactive", "deleted"] as const;
export type BranchStatus = (typeof BRANCH_STATUSES)[number];

export const STOCK_STATUSES = ["available", "sold_out"] as const;
export type StockStatus = (typeof STOCK_STATUSES)[number];

export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";
