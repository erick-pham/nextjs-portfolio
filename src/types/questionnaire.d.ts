export interface IQuestionChoice {
  code: string;
  text: string;
}

export interface IQuestion {
  choices: IQuestionChoice[];
  createdAt: Date | string;
  id: string;
  name: string;
  questionType: QuestionTypeEnum;
  questionnaire: string;
  status: QuestionStatusEnum;
  updatedAt: Date;
}

export interface IQuestionnaire {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  questions: IQuestion[];
  status: QuestionStatusEnum;
  thumbnail: string;
  updatedAt: Date;
}

type IAnswerData = Record<
  string,
  string[] | boolean | number | object | string | null
> | null;

type ISubmissionAnswer = IQuestion & {
  answer: string[] | boolean | number | object | string | null;
};

export interface IQuestionnaireSubmission {
  answers: ISubmissionAnswer[];
  createdAt: string;
  id: string;
  questionnaire: string;
  updatedAt: Date;
}
