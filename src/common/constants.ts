export type RefOption = {
  code: string;
  label: string;
};

export const GENDERS: RefOption[] = [
  {
    code: "",
    label: "NONE",
  },
  {
    code: "MALE",
    label: "Nam",
  },
  {
    code: "Female",
    label: "Nữ",
  },
];

export enum QuestionStatusEnum {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVE = "ARCHIVE",
}

export enum QuestionTypeEnum {
  YES_NO = "YES_NO",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  DATE = "DATE",
  RATING = "RATING",
  RADIO = "RADIO",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTIPLE_CHECKBOX = "MULTIPLE_CHECKBOX",
}

type StatusOption = {
  code: QuestionStatusEnum;
  label: string;
};

export const STATUS_OPTIONS: StatusOption[] = [
  {
    code: QuestionStatusEnum.DRAFT,
    label: "Draft",
  },
  {
    code: QuestionStatusEnum.ACTIVE,
    label: "Active",
  },
  {
    code: QuestionStatusEnum.ARCHIVE,
    label: "Archive",
  },
];

export const QUESTION_TYPE_LABEL: {
  code: QuestionTypeEnum;
  label: string;
}[] = [
  {
    code: QuestionTypeEnum.TEXT,
    label: "Text",
  },
  {
    code: QuestionTypeEnum.NUMBER,
    label: "Number",
  },
  {
    code: QuestionTypeEnum.DATE,
    label: "Date",
  },
  {
    code: QuestionTypeEnum.YES_NO,
    label: "Yes/No",
  },
  {
    code: QuestionTypeEnum.RATING,
    label: "Rating",
  },
  {
    code: QuestionTypeEnum.RADIO,
    label: "Radio",
  },
  {
    code: QuestionTypeEnum.SINGLE_CHOICE,
    label: "Single choice",
  },
  {
    code: QuestionTypeEnum.MULTIPLE_CHECKBOX,
    label: "Multiple checkbox",
  },
];

export enum RuleFactorTypeEnum {
  STRING = "STRING",
  NUMBER = "NUMBER",
  ARRAY = "ARRAY",
  OBJECT = "OBJECT",
}

export const RULE_FACTOR_TYPE_LABEL: {
  code: RuleFactorTypeEnum;
  label: string;
}[] = [
  {
    code: RuleFactorTypeEnum.STRING,
    label: "String",
  },
  {
    code: RuleFactorTypeEnum.NUMBER,
    label: "Number",
  },
  {
    code: RuleFactorTypeEnum.ARRAY,
    label: "Array",
  },
  {
    code: RuleFactorTypeEnum.OBJECT,
    label: "Object",
  },
];

export const DECISION_OPERATOR_LABEL: {
  code: string;
  label: string;
}[] = [
  {
    code: "lte",
    label: "Lower than or equal",
  },
  {
    code: "gte",
    label: "Greater  than or equal",
  },
  {
    code: "in",
    label: "In",
  },
  {
    code: "eq",
    label: "Equal",
  },
];
