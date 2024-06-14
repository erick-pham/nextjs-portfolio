"use server";

import connectToDatabase from "@/database/db";
import type { IActionResponse } from "@/types/base";
import { revalidatePath } from "next/cache";

import { InternalResponse } from "@/common/InternalResponse";
import type { IAddRuleDecision, IRuleSet } from "@/types/rule";
import { RuleSetModel } from "@/database/rule";

export const addRuleDecision = async (
  formData: IAddRuleDecision
): Promise<IActionResponse<null>> => {
  await connectToDatabase();

  const ruleRecord: IRuleSet | null = await RuleSetModel.findOne({
    id: formData.ruleId,
  });

  if (ruleRecord) {
    await RuleSetModel.updateOne(
      {
        id: formData.ruleId,
      },
      {
        decisions: ruleRecord.decisions.concat([formData]),
      }
    );
  }

  revalidatePath("/rules/[slug]", "page");

  return new InternalResponse<null>().toJSON();
};
