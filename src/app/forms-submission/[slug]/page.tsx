import * as React from "react";
import { Col, Row } from "antd";
import type { PageProps } from "@/types/page";
import { notFound } from "next/navigation";
import { getQuestionnaireById } from "../../forms/actions";
import ViewForm from "./components/ViewForm";

const QuestionDetailPage: React.FC<PageProps> = async (props: PageProps) => {
  const { slug } = props.params;

  const question = await getQuestionnaireById(slug);

  if (!question) {
    return notFound();
  }

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={8} />
      <Col className="gutter-row" span={8}>
        <ViewForm questionnaire={question}></ViewForm>
      </Col>
      <Col className="gutter-row" span={8} />
    </Row>
  );
};

export default QuestionDetailPage;
