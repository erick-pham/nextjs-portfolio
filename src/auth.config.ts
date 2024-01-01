import GoogleProvider from "@auth/core/providers/google";
import CredentialsProvider from "@auth/core/providers/credentials";
import type { DefaultSession, NextAuthConfig, Session, User } from "next-auth";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isPasswordValid, symmetricDecrypt } from "./util/hash";
import { ErrorCode } from "./common/errorCode";
import { authenticator } from "otplib";
import type { IUser } from "./types/user";
import type { Credential } from "@/types/auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] & {
      /** The user's postal address. */
      address: string;
      id: string;
    };
  }
}

type AuthorizedProp = {
  auth: Session | null;
  request: NextRequest;
};

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    session({ session, token }): Session {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.sub || "";
      return session;
    },
    authorized({
      auth,
      // request: { nextUrl },
    }: AuthorizedProp): Response | boolean {
      const isLoggedIn = !!auth?.user;

      return isLoggedIn;
      // const isOnDashboard = nextUrl.pathname.startsWith("/forms");
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL("/dashboard", nextUrl));
      // }
      // return true;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      async authorize(credentials: Credential): Promise<User | null> {
        const prisma = new PrismaClient();
        const user: IUser | null = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Check if user exists
        if (!user) {
          throw new Error(ErrorCode.UserNotFound);
        }

        // Validate password
        const isPasswordMatch = await isPasswordValid(
          credentials.password,
          user.password,
        );

        if (!isPasswordMatch) {
          const secret = symmetricDecrypt(
            String(user.twoFactorSecret),
            process.env.ENCRYPTION_KEY!,
          );

          if (!authenticator.check(String(credentials.password), secret)) {
            return null;
          }
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
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
        },
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
