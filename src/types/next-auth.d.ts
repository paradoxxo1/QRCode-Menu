import type { Role } from "@/lib/constants";

declare module "next-auth" {
  interface User {
    role: Role;
    branchId: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
      branchId: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    branchId?: string | null;
  }
}
