export interface Questionnaire {
  createdAt: Date | string;
  description: string;
  id: string;
  name: string;
  questions: Nullable<object>;
  status: string;
  thumbnail: string;
  updatedAt: Date | string;
}
