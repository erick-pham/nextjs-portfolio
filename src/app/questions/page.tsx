import * as React from "react";
import CreateProduct from "./components/CreateQuestion";
import TableProduct from "./components/TableQuestion";
import { Flex } from "antd";
import { getQuestionList } from "@/lib/question.api";
import { PageProps } from "@/types/page";

export default async function QuestionsPage(props: PageProps) {
  const LIMIT = 10;
  const currentPage = Number(props.searchParams.page ?? 1);

  const listProductRes = await getQuestionList({
    limit: LIMIT,
    page: currentPage,
    searchTerm: "",
  });

  return (
    <Flex gap={8} justify="flex-start" vertical>
      <CreateProduct />
      <TableProduct
        products={listProductRes.data}
        totalCount={listProductRes.totalCount}
      />
    </Flex>
  );
}
