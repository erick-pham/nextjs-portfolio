import type { INewUser, INewUserResponse } from "@/app/api/auth/signup/route";
import type {
  TwoFactor,
  TwoFactorSetupResponse,
} from "@/app/api/auth/two-factor/route";

export const signUp = async (newUsers: INewUser): Promise<INewUserResponse> => {
  const data = await fetch(`/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(newUsers),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json() as Promise<INewUserResponse>;
};

export const setup2FA = async (
  twoFactor: TwoFactor,
): Promise<TwoFactorSetupResponse> => {
  const data = await fetch(`/api/auth/two-factor`, {
    method: "POST",
    body: JSON.stringify(twoFactor),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json() as Promise<TwoFactorSetupResponse>;
};
