import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User"; // ✅ Add this

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'login',
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user) {
        session.user._id = user.id;
        session.user.name2 = user.name2 || null; // ✅ add name2
        session.user.sigil = user.sigil || null; // (optional: to ensure it's always available)
        session.user.username = user.username || null; // (same)
      }
      return session;
    },
  }
  ,
};

export default NextAuth(authOptions);
