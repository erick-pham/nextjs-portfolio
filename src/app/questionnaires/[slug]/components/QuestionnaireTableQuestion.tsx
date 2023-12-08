"use client";
import { format as datefnsFormat } from "date-fns";
import type { ReactElement, Validator } from "react";
import React, { useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type {
  FormListFieldData,
  FormListOperation,
  TableColumnsType,
} from "antd";
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Table,
} from "antd";
import { QuestionTypeEnum, QUESTION_TYPE_LABEL } from "@/common/constants";
import type { Label } from "@/common/interface";
import TextArea from "antd/es/input/TextArea";
import CreateQuestion from "./CreateQuestion";
import type { IQuestion, IQuestionnaire } from "@/database/questionnaire";

interface DataType extends IQuestion {
  key: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    // xs: { span: 24, offset: 0 },
    // sm: { span: 20, offset: 4 },
    offset: 8,
    span: 16,
  },
};

export const renderQuestionTypeSelection = (): ReactElement[] => {
  return QUESTION_TYPE_LABEL.map(
    (questionTypeLabel: Label): ReactElement => (
      <Select.Option
        key={questionTypeLabel.code}
        value={questionTypeLabel.code}
      >
        {questionTypeLabel.label}
      </Select.Option>
    )
  );
};

const QuestionnaireTableQuestion = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): ReactElement => {
  const [questionType, setQuestionType] = useState<QuestionTypeEnum>(
    QuestionTypeEnum.MULTIPLE_CHOICE
  );
  const [form] = Form.useForm();

  const onReset = (): void => {
    form.resetFields();
  };

  const onFinish = (values: object): void => {
    console.log(values);
  };

  const renderQuestionForm = (questionType: QuestionTypeEnum): ReactElement => {
    switch (questionType) {
      case QuestionTypeEnum.TEXT:
      case QuestionTypeEnum.NUMBER:
      case QuestionTypeEnum.DATE:
        return <></>;
      case QuestionTypeEnum.MULTIPLE_CHOICE:
        return (
          <Form.List
            name="choices"
            rules={[
              {
                validator: async (
                  _: unknown,
                  names: string[] | null
                ): Promise<Validator<string> | void> => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error("At least 2 choices"));
                  }
                },
              },
            ]}
          >
            {(
              fields: FormListFieldData[],
              { add, remove }: FormListOperation,
              { errors }: { errors: React.ReactNode[] }
            ) => (
              <>
                {fields.map((field: FormListFieldData) => (
                  <Form.Item
                    {...formItemLayoutWithOutLabel}
                    required={false}
                    key={field.key}
                  >
                    <Divider />
                    <Form.Item
                      {...field}
                      name={[field.name, "code"]}
                      rules={[
                        {
                          required: true,
                          min: 2,
                          max: 5,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Short code"
                        style={{ width: "60%" }}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "value"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          min: 1,
                          max: 255,
                        },
                      ]}
                      noStyle
                    >
                      <TextArea placeholder="Enter new choice" />
                    </Form.Item>

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}

                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add choice
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        );
      default:
        return <></>;
    }
  };

  const columns: TableColumnsType<DataType> = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Question Type", dataIndex: "questionType", key: "questionType" },
    {
      title: "Status",
      key: "status",
      render: () => <Badge status="success" text="Finished" />,
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
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={(): void => {
              alert(record.id);
            }}
          >
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  const defaultExpandable = {
    onExpand: (expanded: boolean, record: IQuestion): void => {
      if (expanded) {
        setQuestionType(record.questionType as QuestionTypeEnum);
      }
    },
    expandedRowRender: (record: IQuestion): ReactElement => (
      <Card>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={{
            name: record.name,
            questionType: record.questionType,
          }}
        >
          <Form.Item
            name="questionType"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a type"
              allowClear
              onChange={(selectedType: QuestionTypeEnum) => {
                setQuestionType(selectedType);
              }}
            >
              {renderQuestionTypeSelection()}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Question"
            rules={[
              {
                required: true,
                message: "Please input the question!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {renderQuestionForm(questionType)}
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    ),
    expandRowByClick: false,
    showExpandColumn: true,
    // columnTitle: "columnTitle",
    // expandedRowKeys: [expandedRowKey],
  };

  return (
    <Card>
      <CreateQuestion questionnaire={questionnaire} />
      <Table
        bordered
        title={() => "Set of question"}
        columns={columns}
        expandable={defaultExpandable}
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
