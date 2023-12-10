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
