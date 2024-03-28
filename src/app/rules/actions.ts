"use server";

import connectToDatabase from "@/database/db";
import type { IActionResponse } from "@/types/base";
import { revalidatePath } from "next/cache";

import { InternalResponse } from "@/common/InternalResponse";
import type {
  IAddRuleFactor,
  IDeleteRuleFactor,
  IRuleFactor,
  IRuleSet,
} from "@/types/rule";
import { RuleSetModel } from "@/database/rule";

export const addRuleSet = async (
  formData: IRuleSet
): Promise<IActionResponse<null>> => {
  await connectToDatabase();

  const newRuleSetModel = new RuleSetModel(formData);

  await newRuleSetModel.save();

  revalidatePath("rules", "page");

  return new InternalResponse<null>().toJSON();
};

export const getRuleById = async (id: string): Promise<IRuleSet | null> => {
  await connectToDatabase();

  const ruleRecord: IRuleSet | null = await RuleSetModel.findOne({
    id: id,
  })
    .select("-_id -__v")
    .lean()
    .exec();

  return ruleRecord;
};

export const addFactor = async (
  formData: IAddRuleFactor
): Promise<IActionResponse<null>> => {
  const ruleRecord: IRuleSet | null = await RuleSetModel.findOne({
    id: formData.ruleId,
  });

  if (ruleRecord) {
    const existFactor = ruleRecord.factors.find(
      (factorItem: IRuleFactor) => factorItem.name === formData.factorName
    );

    if (existFactor) {
      return new InternalResponse<null>({
        message: "Factor existed",
        success: false,
      }).toJSON();
    }

    await RuleSetModel.updateOne(
      {
        id: formData.ruleId,
      },
      {
        factors: ruleRecord.factors.concat([
          {
            name: formData.factorName,
            type: formData.factorType,
          },
        ]),
      }
    );
  }

  revalidatePath("/rules/[slug]", "page");

  return new InternalResponse<null>().toJSON();
};

export const deleteFactor = async (
  formData: IDeleteRuleFactor
): Promise<IActionResponse<null>> => {
  const ruleRecord: IRuleSet | null = await RuleSetModel.findOne({
    id: formData.ruleId,
  });

  if (ruleRecord) {
    await RuleSetModel.updateOne(
      {
        id: formData.ruleId,
      },
      {
        factors: ruleRecord.factors.filter(
          (_: IRuleFactor, factorIndex: number) =>
            factorIndex !== formData.factorIndex
        ),
      }
    );
  }

  revalidatePath("/rules/[slug]", "page");

  return new InternalResponse<null>().toJSON();
};
