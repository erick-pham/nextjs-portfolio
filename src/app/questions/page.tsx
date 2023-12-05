import * as React from "react";
import CreateProduct from "./components/CreateProduct";
import TableProduct from "./components/TableProduct";
import { Flex } from "antd";
import { getProductList } from "@/lib/product.api";

export default async function QuestionsPage() {
  const data = await getProductList();

  return (
    <Flex gap={8} justify="flex-start" vertical>
      <CreateProduct />
      <TableProduct products={data} />
    </Flex>
  );
}
