import { auth } from "@/auth";
import type { User } from "next-auth";

export const getCurrentUserAction = async (): Promise<User> => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  return session.user;
};
