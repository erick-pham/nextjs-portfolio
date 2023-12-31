/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import type { NextAuthConfig, Session, DefaultSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextRequest } from "next/server";
import { isPasswordValid, symmetricDecrypt } from "./util/hash";
import { ErrorCode } from "./common/errorCode";
import { authenticator } from "otplib";
import type { IUser } from "./database/form";
import pg from "pg";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
