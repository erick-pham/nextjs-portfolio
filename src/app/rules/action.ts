"use server";

import connectToDatabase from "@/database/db";
import type { IActionResponse } from "@/types/base";
import { revalidateTag } from "next/cache";

import { InternalResponse } from "@/common/InternalResponse";
import type { IRuleSet } from "@/types/rule";
import { RuleSetModel } from "@/database/rule";

export const addRuleSet = async (
  formData: IRuleSet,
): Promise<IActionResponse<null>> => {
  await connectToDatabase();

  const newRuleSetModel = new RuleSetModel(formData);

  await newRuleSetModel.save();

  revalidateTag("list-rule-set");

  return new InternalResponse<null>().toJSON();
};
