import * as React from "react";
import { Flex } from "antd";
import type { PageProps } from "@/types/page";
import { notFound } from "next/navigation";
import { getQuestionnaireById } from "../actions";
import QuestionnaireDetails from "./components/details";

const QuestionDetailPage: React.FC<PageProps> = async (props: PageProps) => {
  const { slug } = props.params;

  const question = await getQuestionnaireById(slug);

  if (!question) {
    return notFound();
  }

  return (
    <Flex gap={8} justify="flex-start" vertical>
      <QuestionnaireDetails questionnaire={question}></QuestionnaireDetails>
    </Flex>
  );
};

export default QuestionDetailPage;
