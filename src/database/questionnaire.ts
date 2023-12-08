/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { generateKey } from "@/util/crypto";
import type { Model } from "mongoose";
import mongoose from "mongoose";

export interface IQuestion {
  choices: string[];
  createdAt: Date | string;
  id: string;
  name: string;
  questionType: string;
  questionnaire: string;
  updatedAt: Date;
}

export interface IQuestionnaire {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  questions: IQuestion[];
  status: string;
  thumbnail: string;
  updatedAt: Date;
}

export const QuestionSchema = new mongoose.Schema<IQuestion>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    choices: [{ type: String }],
    name: { type: String },
    questionType: { type: String },
    questionnaire: { ref: "questionnaire", type: String },
  },
  { timestamps: true }
);

export const QuestionnaireSchema = new mongoose.Schema<IQuestionnaire>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    name: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    status: { type: String },
    questions: [{ ref: "question", type: String }],
  },
  { timestamps: true }
);

export const QuestionModel = (mongoose.models["question"] ||
  mongoose.model("question", QuestionSchema)) as Model<IQuestion>;

export const QuestionnaireModel = (mongoose.models["questionnaire"] ||
  mongoose.model(
    "questionnaire",
    QuestionnaireSchema
  )) as Model<IQuestionnaire>;
