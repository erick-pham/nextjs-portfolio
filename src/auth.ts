import NextAuth from "next-auth";
import type { NextAuthConfig, Session, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextRequest } from "next/server";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] & {
      /** The user's postal address. */
      address: string;
    };
  }
}

type AuthorizedProp = {
  auth: Session | null;
  request: NextRequest;
};

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: AuthorizedProp): Response | boolean {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/forms");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/forms", nextUrl));
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
