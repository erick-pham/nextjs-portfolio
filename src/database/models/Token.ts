import type { Model } from "mongoose";
import mongoose from "mongoose";

interface IToken {
  createdAt: Date;
  token: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const tokenSchema = new mongoose.Schema<IToken>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expire in 5 mins
});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const TokenModel = (mongoose.models["token"] ||
  mongoose.model("token", tokenSchema)) as Model<IToken>;

export default TokenModel;
