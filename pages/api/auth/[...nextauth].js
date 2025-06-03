import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

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
    strategy: "database", // ✅ Required for MongoDBAdapter
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user._id = user.id; // ✅ Ensure you pass _id to session
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
