import type { NextAuthRequest } from "@/types/base";
import { auth } from "@/auth";
import type { NextResponse } from "next/server";
import { NextResponse as ServerNextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const GET = auth((req: NextAuthRequest): NextResponse => {
  if (req.auth) {
    return ServerNextResponse.json({ data: "Protected data" });
  }

  return ServerNextResponse.json(
    { message: "Not authenticated" },
    { status: 401 },
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
