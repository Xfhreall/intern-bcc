import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
    email: string;
  }

  interface Session {
    user: {
      email: string;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    email: string;
  }
}
