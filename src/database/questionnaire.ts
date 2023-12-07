/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { Nullable } from "@/types/base";
import { generateKey } from "@/util/crypto";
import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

export interface IQuestionnaire extends Document {
  createdAt: Date | string;
  description: string;
  id: string;
  name: string;
  questions: Nullable<object>;
  status: string;
  thumbnail: string;
  updatedAt: Date;
}

export const QuestionnaireSchema = new mongoose.Schema<IQuestionnaire>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    name: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    status: { type: String },
    questions: { type: Object },
  },
  { timestamps: true }
);

export default (mongoose.models["Questionnaire"] ||
  mongoose.model(
    "Questionnaire",
    QuestionnaireSchema
  )) as Model<IQuestionnaire>;
