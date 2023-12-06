import { Questionnaire } from "@/types/questionnaire";
import { IListItem, ISearchParam } from "@/types/page";

export const getQuestionList = async ({
  limit,
  page,
  searchTerm,
}: ISearchParam): Promise<IListItem<Questionnaire>> => {
  const data = await fetch(
    `http://localhost:3000/api/questionnaires?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["list-products"],
      },
    }
  );

  return data.json();
};
