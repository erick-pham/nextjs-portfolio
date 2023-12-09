"use client";
import { format as datefnsFormat } from "date-fns";
import type { ReactElement } from "react";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Card, Flex, Table } from "antd";
import CreateQuestion from "./CreateQuestion";
import type { IQuestion, IQuestionnaire } from "@/database/questionnaire";
import { getBadgeStatus } from "@/common/utils";
import DeleteQuestionPopconfirm from "./DeleteQuestionPopconfirm.component";
import { MyButton } from "@/components/MyButton";
interface DataType extends IQuestion {
  key: string;
}

const QuestionnaireTableQuestion = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): ReactElement => {
  const columns: TableColumnsType<DataType> = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Question Type", dataIndex: "questionType", key: "questionType" },
    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: DataType) => (
        <Badge status={getBadgeStatus(record.status)} text={record.status} />
      ),
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_: unknown, record: DataType) =>
        datefnsFormat(new Date(record.updatedAt), "Pp"),
    },
    {
      title: "Action",
      key: "operation",
      render: (_: unknown, record: DataType) => (
        <Flex gap={8}>
          <MyButton type="primary" color="warning" icon={<EditOutlined />}>
            Edit
          </MyButton>
          <DeleteQuestionPopconfirm
            questionnaireId={questionnaire.id}
            questionId={record.id}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card>
      <CreateQuestion questionnaire={questionnaire} />
      <Table
        bordered
        title={() => "Set of question"}
        columns={columns}
        dataSource={questionnaire.questions.map(
          (question: IQuestion): DataType => {
            return { ...question, key: question.id };
          }
        )}
        pagination={{ position: ["none", "bottomCenter"] }}
      />
    </Card>
  );
};

export default QuestionnaireTableQuestion;
