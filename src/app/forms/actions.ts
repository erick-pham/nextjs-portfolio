"use server";

import connectToDatabase from "@/database/db";
import type { IQuestion, IQuestionnaire } from "@/types/questionnaire";
import { QuestionnaireModel, QuestionModel } from "@/database/questionnaire";
import type { IListItem, ISearchParam } from "@/types/page";
import { revalidatePath } from "next/cache";

export const addQuestionnaire = async (
  formData: IQuestionnaire
): Promise<void> => {
  await connectToDatabase();
  const newModel = new QuestionnaireModel(formData);

  await newModel.save();

  revalidatePath("/forms");
};

export const listQuestionnaire = async ({
  limit,
  page,
}: ISearchParam): Promise<IListItem<IQuestionnaire>> => {
  await connectToDatabase();

  const listProducts: IQuestionnaire[] = await QuestionnaireModel.find()
    .select("-_id -__v")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ updatedAt: -1 })
    .lean()
    .exec();

  const countQuestionnaireDocuments = await QuestionnaireModel.countDocuments();

  return {
    data: listProducts,
    totalCount: countQuestionnaireDocuments,
  };
};

export const getQuestionnaireById = async (
  id: string
): Promise<IQuestionnaire | null> => {
  await connectToDatabase();

  const questionnaireRecord: IQuestionnaire | null =
    await QuestionnaireModel.findOne({
      id: id,
    })
      .select("-_id -__v")
      .lean()
      .exec();

  const questions = await QuestionModel.find({
    questionnaire: id,
  })
    .select("-_id -__v")
    .lean()
    .exec();

  return questionnaireRecord
    ? {
        ...questionnaireRecord,
        questions,
      }
    : null;
};

export const updateQuestionnaire = async (
  questionnaireObj: IQuestionnaire
): Promise<void> => {
  await connectToDatabase();

  await QuestionnaireModel.findOneAndUpdate(
    {
      id: questionnaireObj.id,
    },
    {
      ...questionnaireObj,
      questions: undefined,
    }
  )
    .lean()
    .exec();

  // revalidatePath("/forms/[slug]");
};

/// Handle CRUD question
export const addQuestion = async (questionObj: IQuestion): Promise<void> => {
  await connectToDatabase();

  const questionnaireRecord = await QuestionnaireModel.findOne({
    id: questionObj.questionnaire,
  });

  if (questionnaireRecord) {
    const newRecord = new QuestionModel(questionObj);
    await newRecord.save();
  }

  revalidatePath("/forms/[slug]", "page");
};

export const updateQuestion = async (questionObj: IQuestion): Promise<void> => {
  await connectToDatabase();

  await QuestionModel.updateOne(
    {
      id: questionObj.id,
      questionnaire: questionObj.questionnaire,
    },
    questionObj
  );

  revalidatePath("/forms/[slug]", "page");
};

export const deleteQuestion = async (
  questionnaireId: string,
  questionId: string
): Promise<void> => {
  await connectToDatabase();

  await QuestionModel.deleteOne({
    id: questionId,
    questionnaire: questionnaireId,
  });

  revalidatePath("/forms/[slug]", "page");
};
