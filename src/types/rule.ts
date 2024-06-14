import type { RuleFactorTypeEnum } from "@/common/constants";

export interface IRuleFactor {
  name: string;
  type: RuleFactorTypeEnum;
}

export interface IRuleSet {
  createdAt: Date | string;
  decisions: IAddRuleDecision[];
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

export interface IRule {
  factor: string;
  operator: string;
  value: string;
}

export interface IDecision {
  param: string;
  value: string;
}

export interface IAddRuleDecision {
  decisionName: string;
  decisions: IDecision[];
  ruleId: IRuleSet["id"];
  rules: IRule[];
}
