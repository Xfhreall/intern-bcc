import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}

const handler = NextAuth({
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
          const user = {
            id: "user-id",
            email: credentials.email,
            name: credentials.email.split("@")[0],
            accessToken: "dummy-access-token",
            refreshToken: "dummy-refresh-token",
          };

          return user;
        } catch (error) {
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
          scope: "openid email profile",
          redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "google") {
          token.accessToken = account.access_token as string;
          token.refreshToken = account.refresh_token as string;
          token.email = user.email;
        }
        if (account.provider === "credentials") {
          token.accessToken = (user as any).accessToken;
          token.refreshToken = (user as any).refreshToken;
          token.email = user.email;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email;
        session.user.name = token.name as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 1 minggu
  },
});

export { handler as GET, handler as POST };
