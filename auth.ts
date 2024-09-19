import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import clientPromise from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise, { databaseName: "User" }),
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      session.user.currency = user.settings?.currency ?? null;
      session.user.budgetSchedule = user.settings?.budgetSchedule ?? null;
      session.user.budgetAmount = user.settings?.budgetAmount ?? null;
      return session;
    },
  },
});
