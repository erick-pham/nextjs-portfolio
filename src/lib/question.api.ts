import { IListItem, ISearchParam } from "@/types/page";
import { Question } from "@/types/question";

export const getQuestionList = async ({
  limit,
  page,
  searchTerm,
}: ISearchParam): Promise<IListItem<Question>> => {
  const data = await fetch(
    `http://localhost:3000/api/questions?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
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
