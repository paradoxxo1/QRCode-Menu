import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Page-level guard for routes only super_admin may view (proxy.ts only checks "is logged in"). */
export async function requireSuperAdminSession() {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    redirect("/admin");
  }
  return session;
}

export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
}
