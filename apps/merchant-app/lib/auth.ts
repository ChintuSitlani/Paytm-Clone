import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import db from "@repo/db/client";

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

      await db.merchant.upsert({
        where: {
          email: user.email,
        },
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

      return true;
    },
  },

  secret: requiredEnv("NEXTAUTH_SECRET"),
};

  function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
  }
  