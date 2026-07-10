"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const SUPER_ADMIN_LINKS = [
  { href: "/admin", label: "Anasayfa" },
  { href: "/admin/categories", label: "Kategoriler" },
  { href: "/admin/products", label: "Ürünler" },
  { href: "/admin/overrides", label: "Fiyat & Stok" },
  { href: "/admin/branches", label: "Şubeler" },
];

const BRANCH_MANAGER_LINKS = [
  { href: "/admin", label: "Anasayfa" },
  { href: "/admin/overrides", label: "Fiyat & Stok" },
];

export function AdminNav({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const pathname = usePathname();
  const links = isSuperAdmin ? SUPER_ADMIN_LINKS : BRANCH_MANAGER_LINKS;

  return (
    <nav className="border-b border-border bg-surface px-6">
      <div className="mx-auto flex max-w-5xl gap-6 overflow-x-auto">
        {links.map((link) => {
          const isActive =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 border-b-2 py-3 text-[14px] font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
