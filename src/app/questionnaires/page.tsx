import * as React from "react";
import CreateProduct from "./components/CreateQuestionnaire";
import { Flex } from "antd";
import { getListQuestionnaires } from "@/lib/question.api";
import { PageProps } from "@/types/page";
import TableQuestionnaire from "./components/TableQuestionnaire";

export default async function QuestionnairePage(props: PageProps) {
  const LIMIT = 10;
  const currentPage = Number(props.searchParams.page ?? 1);

  const listQuestionnairesRes = await getListQuestionnaires({
    limit: LIMIT,
    page: currentPage,
    searchTerm: "",
  });

  return (
    <Flex gap={8} justify="flex-start" vertical>
      <CreateProduct />
      <TableQuestionnaire listQuestionnaires={listQuestionnairesRes.data} />
    </Flex>
  );
}
