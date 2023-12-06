import * as React from "react";
import { Flex } from "antd";
import { PageProps } from "@/types/page";

export default async function QuestionDetailPage(props: PageProps) {
  const { slug } = props?.params;

  return (
    <Flex gap={8} justify="flex-start" vertical>
      aaaaaaaaaaaaaaa===={slug}
    </Flex>
  );
}
