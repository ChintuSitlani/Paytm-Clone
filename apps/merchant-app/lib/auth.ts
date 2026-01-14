import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import db from "@repo/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: requiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email || !account) {
        return false;
      }

      const merchant = await db.merchant.upsert({
        where: { email: user.email },
        create: {
          email: user.email,
          name: user.name ?? "",
          auth_type: account.provider === "google" ? "Google" : "Github",
        },
        update: {
          name: user.name ?? "",
          auth_type: account.provider === "google" ? "Google" : "Github",
        },
      });

      // IMPORTANT: attach DB id to user
      (user as any).id = merchant.id;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },

    async session({ session, token }) {

      return session;
    },
  },

  secret: requiredEnv("NEXTAUTH_SECRET"),
};

function requiredEnv(name: string): any {
  const value = process.env[name];
  // if (!value) {
  //   throw new Error(`Missing environment variable: ${name}`);
  // }
  return value;
}
