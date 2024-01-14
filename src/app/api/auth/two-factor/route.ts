// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from "@/auth";
import { ErrorCode } from "@/common/errorCode";
import type { NextAuthRequest } from "@/types/base";
import { symmetricDecrypt, symmetricEncrypt } from "@/util/hash";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import type { NextResponse } from "next/server";
import { NextResponse as ServerNextResponse } from "next/server";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";

export type TwoFactor = {
  type: "disable" | "enable" | "setup";
  otpCode?: string;
};

export type TwoFactorSetupResponse = {
  dataUri: string;
  error: boolean;
  keyUri: string;
  message: string;
  secret: string;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const POST = auth(
  async (req: NextAuthRequest): Promise<NextResponse> => {
    if (!req.auth) {
      return ServerNextResponse.json(
        { message: "Not authenticated", error: true },
        { status: 401 },
      );
    }
    const TwoFactorReq = (await req.json()) as TwoFactor;
    const prisma = new PrismaClient();

    const userExists = await prisma.user.findUnique({
      where: { id: req.auth.user.id },
    });

    if (!userExists) {
      return ServerNextResponse.json(
        { message: "Not authenticated", error: true },
        { status: 401 },
      );
    }

    switch (TwoFactorReq.type) {
      case "disable": {
        await prisma.user.update({
          where: {
            id: userExists.id,
          },
          data: {
            twoFactorEnabled: false,
            twoFactorSecret: null,
          },
        });
        revalidatePath("/settings", "page");
        return ServerNextResponse.json({
          message: "Success",
        });
      }
      case "setup": {
        const secret = authenticator.generateSecret(20);
        const name = userExists.email;
        const keyUri = authenticator.keyuri(name, "ErickApp", secret);
        const dataUri = await toDataURL(keyUri);
        await prisma.user.update({
          where: {
            id: userExists.id,
          },
          data: {
            twoFactorEnabled: false,
            twoFactorSecret: symmetricEncrypt(
              secret,
              String(process.env.ENCRYPTION_KEY),
            ),
          },
        });
        revalidatePath("/user-profile", "page");
        return ServerNextResponse.json({ dataUri });
      }
      case "enable": {
        if (userExists.twoFactorEnabled) {
          return ServerNextResponse.json(
            { message: ErrorCode.TwoFactorAlreadyEnabled, error: true },
            { status: 400 },
          );
        }

        if (!userExists.twoFactorSecret) {
          return ServerNextResponse.json(
            { message: ErrorCode.TwoFactorSetupRequired, error: true },
            { status: 400 },
          );
        }

        const secret = symmetricDecrypt(
          userExists.twoFactorSecret,
          String(process.env.ENCRYPTION_KEY),
        );

        if (secret.length !== 32) {
          console.error(
            `Two factor secret decryption failed. Expected key with length 32 but got ${secret.length}`,
          );
          return ServerNextResponse.json(
            { message: ErrorCode.InternalServerError, error: true },
            { status: 400 },
          );
        }

        const isValidToken = authenticator.check(
          TwoFactorReq.otpCode || "",
          secret,
        );

        if (!isValidToken) {
          return ServerNextResponse.json(
            { message: ErrorCode.IncorrectTwoFactorCode, error: true },
            { status: 400 },
          );
        }

        await prisma.user.update({
          where: {
            id: userExists.id,
          },
          data: {
            twoFactorEnabled: true,
          },
        });

        revalidatePath("/settings", "page");
        return ServerNextResponse.json({ message: "Success" });
      }
      default:
        return ServerNextResponse.json({ message: "Success" });
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;
