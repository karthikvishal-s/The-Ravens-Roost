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
      authorization:{
        params:{
          prompt:'login'
        }
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database", // Changed from "jwt" to "database"
    // When using MongoDBAdapter, you should use database sessions
    // This ensures the session contains the actual database user ID
  },
  callbacks: {
    async session({ session, user }) {
      // When using database strategy, 'user' parameter contains the database user
      if (session?.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?._id) {
        token.id = user._id;
      }
      return token;
    }
  },
};

export default NextAuth(authOptions);

