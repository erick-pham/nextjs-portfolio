/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { QuestionStatusEnum } from "@/common/constants";
import type { QuestionTypeEnum } from "@/common/constants";
import { generateKey } from "@/util/crypto";
import type { Model } from "mongoose";
import mongoose from "mongoose";

export interface IQuestionChoice {
  code: string;
  text: string;
}
export interface IQuestion {
  choices: IQuestionChoice[];
  createdAt: Date | string;
  id: string;
  name: string;
  questionType: QuestionTypeEnum;
  questionnaire: string;
  status: QuestionStatusEnum;
  updatedAt: Date;
}

export interface IQuestionnaire {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  questions: IQuestion[];
  status: QuestionStatusEnum;
  thumbnail: string;
  updatedAt: Date;
}

export const QuestionSchema = new mongoose.Schema<IQuestion>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    choices: [{ type: [Object] }],
    name: { type: String },
    questionType: { type: String },
    status: { type: String, default: QuestionStatusEnum.NEW },
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
    status: { type: String, default: QuestionStatusEnum.NEW },
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
