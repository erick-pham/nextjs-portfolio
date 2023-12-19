/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { QuestionStatusEnum } from "@/common/constants";
import type { IQuestion, IQuestionnaire } from "@/types/questionnaire";
import { generateKey } from "@/util/crypto";
import type { Model } from "mongoose";
import mongoose from "mongoose";

export const FormQuestionSchema = new mongoose.Schema<IQuestion>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    choices: [{ type: Object }],
    name: { type: String },
    questionType: { type: String },
    status: { type: String, default: QuestionStatusEnum.DRAFT },
    questionnaire: { ref: "questionnaire", type: String },
  },
  { timestamps: true }
);

export const FormSchema = new mongoose.Schema<IQuestionnaire>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    name: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    status: { type: String, default: QuestionStatusEnum.DRAFT },
    questions: [{ ref: "question", type: String }],
  },
  { timestamps: true }
);

export const QuestionModel = (mongoose.models["question"] ||
  mongoose.model("question", FormQuestionSchema)) as Model<IQuestion>;

export const FormModel = (mongoose.models["questionnaire"] ||
  mongoose.model("questionnaire", FormSchema)) as Model<IQuestionnaire>;
