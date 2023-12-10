"use client";
import {
  Form,
  Input,
  Modal,
  message,
  Radio,
  Rate,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import type { ReactElement } from "react";
import { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import type {
  IQuestionnaire,
  IQuestion,
  IQuestionChoice,
} from "@/types/questionnaire";
import { QuestionTypeEnum } from "@/common/constants";

import { MyButton } from "@/components/MyButton";
import { waitFor } from "@/common/utils";

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
            // onChange={() => {
            //   onSubmitAnswer(question.id);
            // }}
            options={question.choices.map((questionChoice: IQuestionChoice) => {
              return {
                label: questionChoice.text,
                value: questionChoice.code,
              };
            })}
          ></Checkbox.Group>
        </Form.Item>
      );
    case QuestionTypeEnum.DATE:
      return (
        <Form.Item
          name={question.id}
          label={question.name}
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
      );

    default:
      return <></>;
  }
};

const PlayGroundJourney = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [openPlayQuestionModal, setOpenPlayQuestionModal] = useState(false);
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
    <div>
      <Modal
        centered
        open={openPlayQuestionModal}
        title="Play journey"
        cancelText="Cancel"
        okText="Complete"
        onCancel={() => {
          setOpenPlayQuestionModal(false);
        }}
        onOk={() => {
          setOpenPlayQuestionModal(false);
        }}
        okButtonProps={{
          loading: isSubmitting,
        }}
        cancelButtonProps={{
          disabled: isSubmitting,
        }}
        style={{ margin: 50 }}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-question-form-in-modal"
          disabled={isSubmitting}
          validateTrigger="onBlur"
        >
          {questionnaire.questions.map((question: IQuestion) =>
            renderJourneyQuestion(question, onSubmitAnswer, isSubmitting)
          )}
        </Form>
      </Modal>

      <MyButton
        type="primary"
        color="primary"
        icon={<PlayCircleOutlined />}
        onClick={() => {
          setOpenPlayQuestionModal(true);
        }}
      >
        Play Journey
      </MyButton>
    </div>
  );
};

export default PlayGroundJourney;
