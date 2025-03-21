import type { NextAuthOptions, Profile } from "next-auth";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import { api } from "./axios";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      picture?: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    picture?: string;
    accessToken: string;
    refreshToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        accessToken: { label: "Access Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.accessToken && credentials?.refreshToken) {
          try {
            return {
              id: "token-auth-user",
              email: credentials.email || "user@example.com",
              name: credentials.email.split("@")[0],
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
            };
          } catch (error) {
            console.error("Token validation error:", error);

            return null;
          }
        }

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await api.post(
            `/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const data = response.data;

          const user = {
            id: "user-id",
            email: credentials.email,
            name: credentials.email.split("@")[0],
            picture: "",
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };

          return user;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(
              error.response.data.message || "Authentication failed"
            );
          }
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: any;
      user?: any;
      account?: any;
      profile?: Profile;
    }) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.name = user.name || "";
        token.picture = (user as any).picture || "";
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      if (account?.provider === "google" && profile) {
        if (account.backendAccessToken && account.backendRefreshToken) {
          token.accessToken = account.backendAccessToken as string;
          token.refreshToken = account.backendRefreshToken as string;
        } else {
          token.accessToken = account.access_token as string;
          token.refreshToken = (account.refresh_token as string) || "";
        }

        token.email = profile.email || "";
        token.name = profile.name || "";
        token.picture = profile.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.picture = token.picture as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        const urlObj = new URL(url);
        const callbackUrl = urlObj.searchParams.get("callbackUrl");

        if (callbackUrl) {
          return callbackUrl;
        }

        return `${baseUrl}/dashboard`;
      }

      return `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
