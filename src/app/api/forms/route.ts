// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { QuestionStatusEnum } from "@/common/constants";
import connectToDatabase from "@/database/db";
import { FormModel } from "@/database/form";
import type { IQuestionnaire } from "@/types/questionnaire";
import type { NextResponse } from "next/server";
import { NextResponse as ServerNextResponse } from "next/server";

export const GET = async (req: Request): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

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

    return ServerNextResponse.json(
      {
        data: listProducts,
        totalCount: countQuestionnaireDocuments,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ServerNextResponse.json(
      {
        message: "Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
};
