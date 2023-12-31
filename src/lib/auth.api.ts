import type { INewUser, INewUserResponse } from "@/app/api/auth/signup/route";

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
