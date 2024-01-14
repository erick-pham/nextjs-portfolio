import type { IListItem, ISearchParam } from "@/types/base";
import type { IRuleSet } from "@/types/rule";

export const getListRule = async (
  listRuleParams?: ISearchParam,
): Promise<IListItem<IRuleSet>> => {
  const { limit = 1000000, page = 1, searchTerm = "" } = listRuleParams || {};

  const data = await fetch(
    `${process.env.BE_HOST}/api/rules?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["list-rule"],
      },
    },
  );

  return data.json() as Promise<IListItem<IRuleSet>>;
};
