import type { Session } from "next-auth";

export class ForbiddenError extends Error {
  status = 403 as const;
  constructor(message = "Bu işlem için yetkiniz yok.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends Error {
  status = 401 as const;
  constructor(message = "Giriş yapmanız gerekiyor.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Enforces the PRD's authorization rule server-side (not just in the UI):
 * super_admin can edit any branch's data; branch_manager only their own.
 */
export function assertCanEditBranch(
  session: Session | null,
  branchId: string,
): void {
  if (!session?.user) {
    throw new UnauthorizedError();
  }
  if (session.user.role === "super_admin") {
    return;
  }
  if (session.user.role === "branch_manager" && session.user.branchId === branchId) {
    return;
  }
  throw new ForbiddenError("Yalnızca kendi şubenizin verisini güncelleyebilirsiniz.");
}

export function assertIsSuperAdmin(session: Session | null): void {
  if (!session?.user) {
    throw new UnauthorizedError();
  }
  if (session.user.role !== "super_admin") {
    throw new ForbiddenError("Bu işlem yalnızca genel admin tarafından yapılabilir.");
  }
}
