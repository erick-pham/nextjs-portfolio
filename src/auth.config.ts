import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { DefaultSession, NextAuthConfig, Session, User } from "next-auth";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isPasswordValid, symmetricDecrypt } from "./util/hash";
import { ErrorCode } from "./common/errorCode";
import { authenticator } from "otplib";
import type { IUser } from "./types/user";
// import type { IUser } from "./database/form";
// import { sql } from "@vercel/postgres";

type Credential = {
  email: string;
  password: string;
  otpCode?: string;
};

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
    session({ session, token }): Session {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.sub || "";
      return session;
    },
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
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
        otpCode: {
          label: "Two-factor Code",
          type: "input",
          placeholder: "Code from authenticator app",
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
          return null;
        }

        // Validate password
        const isPasswordMatch = await isPasswordValid(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        if (user.twoFactorEnabled) {
          if (!credentials.otpCode) {
            throw new Error(ErrorCode.SecondFactorRequired);
          }

          if (!user.twoFactorSecret) {
            console.error(
              `Two factor is enabled for user ${user.email} but they have no secret`
            );
            throw new Error(ErrorCode.InternalServerError);
          }

          if (!process.env.ENCRYPTION_KEY) {
            console.error(
              `"Missing encryption key; cannot proceed with two factor login."`
            );
            throw new Error(ErrorCode.InternalServerError);
          }

          const secret = symmetricDecrypt(
            user.twoFactorSecret!,
            process.env.ENCRYPTION_KEY!
          );
          if (secret.length !== 32) {
            console.error(
              `Two factor secret decryption failed. Expected key with length 32 but got ${secret.length}`
            );
            throw new Error(ErrorCode.InternalServerError);
          }

          const isValidToken = authenticator.check(credentials.otpCode, secret);
          if (!isValidToken) {
            throw new Error(ErrorCode.IncorrectTwoFactorCode);
          }
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        // const user = await getUser(credentials.email);
        // if (!user) return null;

        // return null;
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
