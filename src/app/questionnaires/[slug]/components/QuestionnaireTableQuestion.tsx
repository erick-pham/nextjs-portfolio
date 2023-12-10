"use client";
import { format as datefnsFormat } from "date-fns";
import type { ReactElement } from "react";
import React from "react";
import type { TableColumnsType } from "antd";
import { Badge, Card, Flex, Table } from "antd";
import CreateQuestion from "./CreateQuestionModal";
import { getBadgeStatus, getLabelText } from "@/common/utils";
import DeleteQuestionPopconfirm from "./DeleteQuestionPopconfirm.component";
import EditQuestionModal from "./EditQuestionModal";
import { QUESTION_TYPE_LABEL } from "@/common/constants";
import type { IQuestion, IQuestionnaire } from "@/types/questionnaire";
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
    {
      title: "Question Type",
      dataIndex: "questionType",
      key: "questionType",
      render: (_: unknown, record: DataType) =>
        getLabelText(QUESTION_TYPE_LABEL, record.questionType as string),
    },
    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: DataType) => (
        <Badge
          color={getBadgeStatus(record.status as string)}
          count={record.status as string}
        />
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
          <EditQuestionModal question={record as IQuestion} />
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
