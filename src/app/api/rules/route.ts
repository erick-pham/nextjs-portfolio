// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDatabase from "@/database/db";
import { RuleSetModel } from "@/database/rule";
import type { IRuleSet } from "@/types/rule";
import type { NextResponse } from "next/server";
import { NextResponse as ServerNextResponse } from "next/server";

export const GET = async (req: Request): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    await connectToDatabase();

    const listRuleSet: IRuleSet[] = await RuleSetModel.find()
      .select("-_id -__v")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ updatedAt: -1 })
      .lean()
      .exec();

    const countRuleSetDocuments = await RuleSetModel.countDocuments();

    return ServerNextResponse.json(
      {
        data: listRuleSet,
        totalCount: countRuleSetDocuments,
        success: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return ServerNextResponse.json(
      {
        message: "Error",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
};
