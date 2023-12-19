"use server";

import connectToDatabase from "@/database/db";
import type { IQuestion, IQuestionnaire } from "@/types/questionnaire";
import { FormModel, QuestionModel } from "@/database/form";
import type { IActionResponse } from "@/types/page.interface";
import type { IListItem, ISearchParam } from "@/types/page.interface";
import { revalidatePath, revalidateTag } from "next/cache";
import { QuestionStatusEnum } from "@/common/constants";
import { InternalResponse } from "@/common/InternalResponse";

export const addQuestionnaire = async (
  formData: IQuestionnaire
): Promise<IActionResponse<null>> => {
  await connectToDatabase();
  if (!formData.thumbnail) {
    formData.thumbnail = "https://picsum.photos/300";
  }
  const newModel = new FormModel(formData);

  await newModel.save();

  revalidateTag("list-form");

  return new InternalResponse<null>().toJSON();
};

export const listQuestionnaire = async ({
  limit,
  page,
}: ISearchParam): Promise<IListItem<IQuestionnaire>> => {
  await connectToDatabase();

  const listProducts: IQuestionnaire[] = await FormModel.find()
    .select("-_id -__v")
    .where({
      status: [QuestionStatusEnum.DRAFT, QuestionStatusEnum.ACTIVE],
    })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ updatedAt: -1 })
    .lean()
    .exec();

  const countQuestionnaireDocuments = await FormModel.countDocuments();

  return {
    data: listProducts,
    totalCount: countQuestionnaireDocuments,
    success: true,
  };
};

export const getQuestionnaireById = async (
  id: string
): Promise<IQuestionnaire | null> => {
  await connectToDatabase();

  const questionnaireRecord: IQuestionnaire | null = await FormModel.findOne({
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

export const updateFormAction = async (
  questionnaireObj: IQuestionnaire
): Promise<IActionResponse<null>> => {
  await connectToDatabase();

  await FormModel.findOneAndUpdate(
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

  // revalidatePath("/forms", "page");
  revalidateTag("list-form");
  return new InternalResponse<null>().toJSON();
};

/// Handle CRUD question
export const addQuestion = async (
  questionObj: IQuestion
): Promise<IActionResponse<null>> => {
  await connectToDatabase();

  const questionnaireRecord = await FormModel.findOne({
    id: questionObj.questionnaire,
  });

  if (questionnaireRecord) {
    const newRecord = new QuestionModel(questionObj);
    await newRecord.save();
  }

  revalidatePath("/forms/[slug]", "page");
  return new InternalResponse<null>().toJSON();
};

export const updateQuestion = async (
  questionObj: IQuestion
): Promise<IActionResponse<null>> => {
  await connectToDatabase();

  await QuestionModel.updateOne(
    {
      id: questionObj.id,
      questionnaire: questionObj.questionnaire,
    },
    questionObj
  );

  revalidatePath("/forms/[slug]", "page");
  return new InternalResponse<null>().toJSON();
};

export const deleteQuestion = async (
  questionnaireId: string,
  questionId: string
): Promise<IActionResponse<null>> => {
  await connectToDatabase();

  await QuestionModel.deleteOne({
    id: questionId,
    questionnaire: questionnaireId,
  });

  revalidatePath("/forms/[slug]", "page");

  return new InternalResponse<null>().toJSON();
};
