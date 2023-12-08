"use client";
import type { ReactElement, Validator } from "react";
import React, { useState } from "react";
import {
  EditOutlined,
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
import type { Questionnaire } from "@/types/questionnaire";

interface DataType {
  id: string;
  key: string;
  name: string;
  questionType: string;
  status: string;
  updatedAt: string;
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

const renderQuestionTypeSelection = (): ReactElement[] => {
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

const data: DataType[] = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i.toString(),
    id: i.toString(),
    name: "Screen",
    questionType: QuestionTypeEnum.MULTIPLE_CHOICE,
    updatedAt: "2014-12-24 23:12:00",
    status: "success",
  });
}

const QuestionnaireTableQuestion = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}): ReactElement => {
  const [questionType, setQuestionType] = useState<QuestionTypeEnum>(
    QuestionTypeEnum.MULTIPLE_CHOICE
  );
  const [expandedRowKey, setExpandedRowKey] = useState<string>("");
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
        return <>no render input field</>;
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
                          len: 255,
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
    { title: "Last Update", dataIndex: "updatedAt", key: "updatedAt" },
    {
      title: "Action",
      key: "operation",
      render: (_: unknown, record: DataType) => (
        <Flex gap={8}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={(): void => {
              setExpandedRowKey(
                expandedRowKey === record.key ? "" : record.key
              );
            }}
          >
            Edit
          </Button>
          <Button danger type="primary" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  const defaultExpandable = {
    expandedRowRender: (record: DataType): ReactElement => (
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
              defaultValue={QuestionTypeEnum.TEXT}
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
    expandedRowKeys: [expandedRowKey],
  };

  return (
    <Card>
      <CreateQuestion questionnaire={questionnaire} />
      <Table
        bordered
        title={() => "Set of question"}
        columns={columns}
        expandable={defaultExpandable}
        dataSource={data}
        pagination={{ position: ["none", "bottomCenter"] }}
      />
    </Card>
  );
};

export default QuestionnaireTableQuestion;
