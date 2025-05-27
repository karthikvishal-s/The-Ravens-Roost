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

// Alternative configuration if you want to stick with JWT strategy:
/*
export const authOptions = {
  // Remove adapter if using JWT strategy
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // On first sign in, save the user info to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.sub; // token.sub is the unique user ID from Google
        session.user.email = token.email;
      }
      return session;
    },
  },
};
*/