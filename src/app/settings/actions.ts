"use server";

import { revalidatePath } from "next/cache";
import type {
  TwoFactor,
  TwoFactorSetupResponse,
} from "../api/auth/two-factor/route";

export const setup2FAAction = async (
  twoFactor: TwoFactor
): Promise<TwoFactorSetupResponse> => {
  // const currentUer = getCurrentUserAction();
  const data = await fetch(`${process.env.BE_HOST}/api/auth/two-factor`, {
    method: "POST",
    body: JSON.stringify(twoFactor),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const setup2FARes = (await data.json()) as TwoFactorSetupResponse;

  if (
    !setup2FARes.error &&
    (twoFactor.type === "disable" || twoFactor.type === "enable")
  ) {
    revalidatePath("/settings", "page");
  }

  return setup2FARes;
};
