// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@/util/hash";
import { PrismaClient } from "@prisma/client";
import type { NextRequest, NextResponse } from "next/server";
import { NextResponse as ServerNextResponse } from "next/server";

export type INewUser = {
  email: string;
  name: string;
  password: string;
};

export type INewUserResponse = {
  message: string;
  success: boolean;
  userExists?: boolean;
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const newUser = (await req.json()) as INewUser;
    const prisma = new PrismaClient();
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email: newUser.email },
    });

    if (userExists) {
      return ServerNextResponse.json(
        {
          success: false,
          message: "A user with the same email already exists!",
          userExists: true,
        },
        {
          status: 422,
        },
      );
    }

    // Hash Password
    newUser.password = await hashPassword(newUser.password);

    // Store new user
    await prisma.user.create({
      data: newUser,
    });

    return ServerNextResponse.json(
      { success: true, message: "User signed up successfuly" },
      {
        status: 422,
      },
    );
  } catch (error) {
    return ServerNextResponse.json(
      {
        message: "Error",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
};
