export enum QuestionStatusEnum {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum QuestionTypeEnum {
  YES_NO = "YES_NO",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  DATE = "DATE",
  RATING = "RATING",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
}

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
    code: QuestionTypeEnum.SINGLE_CHOICE,
    label: "Single choice",
  },
  {
    code: QuestionTypeEnum.MULTIPLE_CHOICE,
    label: "Multiple choice",
  },
];
