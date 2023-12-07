import * as React from "react";
import { Flex } from "antd";
import type { PageProps } from "@/types/page";

const QuestionDetailPage: React.FC<PageProps> = (props: PageProps) => {
  const { slug } = props.params;

  return (
    <Flex gap={8} justify="flex-start" vertical>
      aaaaaaaaaaaaaaa===={slug}
    </Flex>
  );
};

export default QuestionDetailPage;
