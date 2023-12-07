"use server";

import connectToDatabase from "@/database/db";
import QuestionnaireModel from "@/database/questionnaire";
import type { IListItem, ISearchParam } from "@/types/page";
import type { Questionnaire } from "@/types/questionnaire";
import { revalidatePath } from "next/cache";

export const addQuestionnaire = async (
  formData: Questionnaire
): Promise<void> => {
  await connectToDatabase();
  const newModel = new QuestionnaireModel(formData);

  await newModel.save();

  revalidatePath("/questionnaire");
};

export const listQuestionnaire = async ({
  limit,
  page,
}: ISearchParam): Promise<IListItem<Questionnaire>> => {
  await connectToDatabase();

  const listProducts: Questionnaire[] = await QuestionnaireModel.find()
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
): Promise<Questionnaire | null> => {
  await connectToDatabase();

  const questionnaireRecord: Questionnaire | null =
    await QuestionnaireModel.findOne({
      id: id,
    })
      .select("-_id -__v")
      .lean()
      .exec();

  return questionnaireRecord;
};
