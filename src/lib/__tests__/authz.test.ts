import { describe, it, expect } from "vitest";
import type { Session } from "next-auth";
import { assertCanEditBranch, ForbiddenError, UnauthorizedError } from "@/lib/authz";

function makeSession(role: "super_admin" | "branch_manager", branchId: string | null): Session {
  return {
    user: { id: "u1", email: "user@example.com", role, branchId },
    expires: new Date(Date.now() + 60_000).toISOString(),
  };
}

describe("assertCanEditBranch", () => {
  it("allows super_admin to edit any branch", () => {
    const session = makeSession("super_admin", null);
    expect(() => assertCanEditBranch(session, "branch-1")).not.toThrow();
    expect(() => assertCanEditBranch(session, "branch-2")).not.toThrow();
  });

  it("allows a branch_manager to edit their own branch", () => {
    const session = makeSession("branch_manager", "branch-1");
    expect(() => assertCanEditBranch(session, "branch-1")).not.toThrow();
  });

  it("rejects a branch_manager editing another branch with a 403", () => {
    const session = makeSession("branch_manager", "branch-1");

    expect(() => assertCanEditBranch(session, "branch-2")).toThrow(ForbiddenError);
    try {
      assertCanEditBranch(session, "branch-2");
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenError);
      expect((error as ForbiddenError).status).toBe(403);
    }
  });

  it("rejects an unauthenticated request", () => {
    expect(() => assertCanEditBranch(null, "branch-1")).toThrow(UnauthorizedError);
  });
});
