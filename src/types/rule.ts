import type { RuleFactorTypeEnum } from "@/common/constants";

export interface IRuleFactor {
  name: string;
  type: RuleFactorTypeEnum;
}

export interface IRuleSet {
  createdAt: Date | string;
  decisions: [];
  factors: IRuleFactor[];
  id: string;
  name: string;
  updatedAt: Date;
}

export interface IAddRuleFactor {
  factorName: string;
  factorType: RuleFactorTypeEnum;
  ruleId: IRuleSet["id"];
}

export interface IDeleteRuleFactor {
  factorIndex: number;
  ruleId: IRuleSet["id"];
}
