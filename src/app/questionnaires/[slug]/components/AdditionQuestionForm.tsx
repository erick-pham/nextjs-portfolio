"use client";
import type { ReactElement, Validator } from "react";
import React from "react";
import { PlusOutlined, MinusCircleTwoTone } from "@ant-design/icons";
import type { FormListFieldData, FormListOperation } from "antd";
import { Button, Form, Input, Tooltip, Space, Select } from "antd";
import { QUESTION_TYPE_LABEL, QuestionTypeEnum } from "@/common/constants";
import TextArea from "antd/es/input/TextArea";
import type { ILabel } from "@/types/base";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
    offset: 8,
    span: 16,
  },
};

export const renderAdditionQuestionForm = (
  questionType: QuestionTypeEnum
): ReactElement => {
  switch (questionType) {
    case QuestionTypeEnum.MULTIPLE_CHOICE:
    case QuestionTypeEnum.SINGLE_CHOICE:
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
                <Form.Item {...formItemLayoutWithOutLabel} key={field.key}>
                  <Form.Item
                    {...field}
                    name={[field.name, "code"]}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Space direction="horizontal">
                      <Input placeholder="Short code" />
                      <Tooltip title="Delete">
                        <MinusCircleTwoTone
                          style={{ color: "#08c" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Tooltip>
                    </Space>
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "text"]}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                      },
                    ]}
                    noStyle
                  >
                    <TextArea placeholder="Description" />
                  </Form.Item>
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

export const renderQuestionTypeSelection = (): ReactElement[] => {
  return QUESTION_TYPE_LABEL.map(
    (questionTypeLabel: ILabel): ReactElement => (
      <Select.Option
        key={questionTypeLabel.code}
        value={questionTypeLabel.code}
      >
        {questionTypeLabel.label}
      </Select.Option>
    )
  );
};
