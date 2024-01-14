import type { RuleFactorTypeEnum } from "@/common/constants";

export interface IIRuleFactor {
  name: string;
  type: RuleFactorTypeEnum;
}

export interface IRuleSet {
  createdAt: Date | string;
  decisions: [];
  factors: IIRuleFactor[];
  id: string;
  name: string;
  updatedAt: Date;
}
