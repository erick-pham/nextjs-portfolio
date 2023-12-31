import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  toJSON(): object;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    twoFactorEnabled: { type: Boolean, required: false, default: false },
    twoFactorSecret: { type: String, required: false },
  },
  {
    toObject: {
      transform: function (doc: Document, ret: Record<string, object>): object {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      transform: function (doc: Document, ret: Record<string, object>): object {
        delete ret._id;
        return ret;
      },
    },
  },
);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const UserModel = (mongoose.models["user"] ||
  mongoose.model("user", userSchema)) as Model<IUser>;
