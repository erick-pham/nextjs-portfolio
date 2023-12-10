import * as React from "react";
import CreateProduct from "./components/CreateQuestionnaire";
import { Flex } from "antd";
import type { PageProps } from "@/types/page";
import ListCardQuestionnaire from "./components/ListCardQuestionnaire";
import { listQuestionnaire } from "./actions";

const QuestionnairePage: React.FC<PageProps> = async (props: PageProps) => {
  const LIMIT = 10;
  const currentPage = Number(props.searchParams.page || 1);

  const listQuestionnairesRes = await listQuestionnaire({
    limit: LIMIT,
    page: currentPage,
    searchTerm: "",
  });

  return (
    <Flex gap={8} justify="flex-start" vertical>
      <CreateProduct />
      <ListCardQuestionnaire listQuestionnaires={listQuestionnairesRes.data} />
    </Flex>
  );
};

export default QuestionnairePage;
