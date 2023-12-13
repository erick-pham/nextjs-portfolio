"use client";
import {
  Form,
  Input,
  message,
  Radio,
  Rate,
  Select,
  DatePicker,
  Checkbox,
  Space,
  Card,
} from "antd";
import type { ReactElement } from "react";
import { useState } from "react";
import type {
  IQuestionnaire,
  IQuestion,
  IQuestionChoice,
} from "@/types/questionnaire";
import { QuestionTypeEnum } from "@/common/constants";

import { MyButton } from "@/components/MyButton";
import { waitFor } from "@/common/utils";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const renderJourneyQuestion = (
  question: IQuestion,
  onSubmitAnswer: (questionId: string) => void,
  isDisabled?: boolean
): ReactElement => {
  switch (question.questionType) {
    case QuestionTypeEnum.TEXT:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
        >
          <Input
            onBlur={() => {
              onSubmitAnswer(question.id);
            }}
          />
        </Form.Item>
      );
    case QuestionTypeEnum.RATING:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
        >
          <Rate
            disabled={isDisabled}
            onChange={() => {
              onSubmitAnswer(question.id);
            }}
          />
        </Form.Item>
      );
    case QuestionTypeEnum.YES_NO:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
        >
          <Radio.Group
            onChange={() => {
              onSubmitAnswer(question.id);
            }}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      );
    case QuestionTypeEnum.SINGLE_CHOICE:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
        >
          <Select
            onChange={() => {
              onSubmitAnswer(question.id);
            }}
          >
            {question.choices.map((questionChoice: IQuestionChoice) => (
              <Select.Option
                key={questionChoice.code}
                value={questionChoice.code}
              >
                {questionChoice.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    case QuestionTypeEnum.MULTIPLE_CHOICE:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
        >
          <Checkbox.Group
            style={{ display: "inline-block", marginRight: 10 }}
            onChange={() => {
              onSubmitAnswer(question.id);
            }}
          >
            <Space direction="vertical">
              {question.choices.map((questionChoice: IQuestionChoice) => (
                <Checkbox
                  key={`MULTIPLE_CHOICE_CHECKBOX_${questionChoice.code}`}
                  value={`${questionChoice.code}`}
                >
                  {questionChoice.text}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
      );
    case QuestionTypeEnum.DATE:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
          getValueFromEvent={(eventDate: Dayjs) =>
            eventDate.format("YYYY-MM-DD")
          }
          getValueProps={(eventDateValue: string) => ({
            value: eventDateValue ? dayjs(eventDateValue) : "",
          })}
        >
          <DatePicker
            format="YYYY-MM-DD"
            onChange={() => {
              onSubmitAnswer(question.id);
            }}
          />
        </Form.Item>
      );
    case QuestionTypeEnum.RADIO:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
        >
          <Radio.Group
            onChange={() => {
              onSubmitAnswer(question.id);
            }}
          >
            <Space direction="vertical">
              {question.choices.map((questionChoice: IQuestionChoice) => (
                <Radio
                  key={`RADIO_${questionChoice.code}`}
                  value={`${questionChoice.code}`}
                >
                  {questionChoice.text}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      );
    default:
      return <></>;
  }
};

const ViewForm = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitAnswer = (questionId: string): void => {
    form
      .validateFields([questionId])
      .then(async () => {
        if (form.getFieldError(questionId).length === 0) {
          setIsSubmitting(true);
          await waitFor(2000);
          message.success(
            `Saved: [${questionId}]. Answer: [${form.getFieldValue(
              questionId
            )}]`
          );
        }
      })
      .catch((): void => {
        return;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Card title={questionnaire.name} bordered={false}>
      <Form
        form={form}
        layout="vertical"
        name="create-question-form-in-modal"
        disabled={isSubmitting}
        validateTrigger="onBlur"
      >
        {questionnaire.questions.map((question: IQuestion) => (
          <div key={question.id}>
            {renderJourneyQuestion(question, onSubmitAnswer, isSubmitting)}
          </div>
        ))}
        <Form.Item>
          <MyButton type="primary" htmlType="submit">
            Submit
          </MyButton>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ViewForm;
