import type { IListItem, ISearchParam } from "@/types/page";
import type { IQuestionnaire } from "@/types/questionnaire";

export const getListQuestionnaires = async ({
  limit,
  page,
  searchTerm,
}: ISearchParam): Promise<IListItem<IQuestionnaire>> => {
  const data = await fetch(
    `${process.env.BE_HOST}/api/forms?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["list-products"],
      },
    }
  );

  return data.json() as Promise<IListItem<IQuestionnaire>>;
};
