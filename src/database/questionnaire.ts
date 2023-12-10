/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { QuestionStatusEnum } from "@/common/constants";
import type { IQuestion, IQuestionnaire } from "@/types/questionnaire";
import { generateKey } from "@/util/crypto";
import type { Model } from "mongoose";
import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema<IQuestion>(
  {
    id: { type: String, default: (): string => generateKey(10, "base64url") },
    choices: [{ type: Object }],
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
