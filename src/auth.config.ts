import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import type { DefaultSession, NextAuthConfig, Session } from "next-auth";
import type { NextRequest } from "next/server";
// import type { IUser } from "./database/form";
// import { sql } from "@vercel/postgres";

// type Credential = {
//   email: string;
//   password: string;
//   otpCode?: string;
// };

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

// async function getUser(email: string): Promise<IUser> {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
//     const user = await sql<IUser>`SELECT * FROM users WHERE email=${email}`;
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
//     return user.rows[0];
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

export const authConfig = {
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
    // CredentialsProvider({
    //   async authorize(credentials: Credential): Promise<IUser | null> {
    //     const user = await getUser(credentials.email);
    //     if (!user) return null;

    //     return null;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
