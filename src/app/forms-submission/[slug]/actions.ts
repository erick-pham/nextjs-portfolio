"use server";

import connectToDatabase from "@/database/db";
import type { IQuestion, ISubmissionAnswer } from "@/types/questionnaire";
import { FormSubmissionModel, QuestionModel } from "@/database/form";

import { QuestionTypeEnum } from "@/common/constants";
import { redirect } from "next/navigation";

const formatAnswerValue = (
  formData: Record<string, object | undefined>,
  questionItem: IQuestion
): string[] | boolean | number | object | string | null => {
  if (formData[questionItem.id] === undefined) return null;

  if (questionItem.questionType === QuestionTypeEnum.NUMBER) {
    return Number(formData[questionItem.id]);
  }
  if (questionItem.questionType === QuestionTypeEnum.YES_NO) {
    return Boolean(formData[questionItem.id]);
  }

  return formData[questionItem.id] || null;
};

export const submitForm = async (
  formData: Record<string, object | undefined>
): Promise<void> => {
  await connectToDatabase();

  const questionnaire = formData["questionnaire"];
  const questions = await QuestionModel.find({
    questionnaire,
  })
    .select("-_id -__v")
    .lean()
    .exec();

  const answers: ISubmissionAnswer[] = [];

  questions.forEach((questionItem: IQuestion) => {
    answers.push({
      ...questionItem,
      answer: formatAnswerValue(formData, questionItem),
    });
  });

  const newFormSubmissionModel = new FormSubmissionModel({
    answers,
    questionnaire,
  });

  await newFormSubmissionModel.save();

  redirect(
    `/forms-submission/${questionnaire}?result_id=${newFormSubmissionModel.id}`
  );
};
