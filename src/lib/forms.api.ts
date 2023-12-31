import type { IListItem, ISearchParam } from "@/types/base";
import type { IQuestionnaire } from "@/types/questionnaire";

export const getListForm = async (
  listFormParams?: ISearchParam,
): Promise<IListItem<IQuestionnaire>> => {
  const { limit = 1000000, page = 1, searchTerm = "" } = listFormParams || {};

  const data = await fetch(
    `${process.env.BE_HOST}/api/forms?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["list-form"],
      },
    },
  );

  return data.json() as Promise<IListItem<IQuestionnaire>>;
};
