/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { QuestionStatusEnum } from "@/common/constants";
import type {
  IQuestion,
  IQuestionnaire,
  IQuestionnaireSubmission,
} from "@/types/questionnaire";
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
  { timestamps: true },
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
  { timestamps: true },
);

export const FormSubmissionSchema =
  new mongoose.Schema<IQuestionnaireSubmission>(
    {
      id: { type: String, default: (): string => generateKey(10, "base64url") },
      answers: [{ type: Object }],
      questionnaire: { ref: "questionnaire", type: String },
    },
    { timestamps: true },
  );

export const QuestionModel = (mongoose.models["question"] ||
  mongoose.model("question", FormQuestionSchema)) as Model<IQuestion>;

export const FormModel = (mongoose.models["questionnaire"] ||
  mongoose.model("questionnaire", FormSchema)) as Model<IQuestionnaire>;

export const FormSubmissionModel = (mongoose.models["form-submission"] ||
  mongoose.model(
    "form-submission",
    FormSubmissionSchema,
  )) as Model<IQuestionnaireSubmission>;

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
