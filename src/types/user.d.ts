export type IUser = {
  address: string | null;
  email: string | null;
  firstName: string | null;
  gender: string | null;
  id: string;
  image: string | null;
  lastName: string | null;
  name: string | null;
  password: string | null;
  phoneNumber: string | null;
  twoFactorEnabled: boolean | null;
  twoFactorSecret: string | null;
};

export type IToken = {
  createdAt: Date;
  token: string;
  userId: string;
};
