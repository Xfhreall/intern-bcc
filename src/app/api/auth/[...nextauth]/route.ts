import type { NextAuthOptions, Profile } from "next-auth";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

import { api } from "@/lib/axios";

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
      },
      async authorize(credentials) {
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        try {
          const response = await api.get(`/auth/google`, {
            params: {
              code: account.code,
              scope: account.scope,
              authuser: 0,
              prompt: "consent",
            },
          });

          if (response.data.accessToken && response.data.refreshToken) {
            account.backendAccessToken = response.data.accessToken;
            account.backendRefreshToken = response.data.refreshToken;
          }

          return true;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return true;
        }
      }

      return true;
    },
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
    maxAge: 7 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as DELETE, handler as PUT };
