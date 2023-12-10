"use client";
import { Form, Input, Modal, message, Radio, Rate } from "antd";
import type { ReactElement } from "react";
import { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import type { IQuestionnaire, IQuestion } from "@/types/questionnaire";
import { QuestionTypeEnum } from "@/common/constants";

import { MyButton } from "@/components/MyButton";
import { waitFor } from "@/common/utils";

const renderJourneyQuestion = (
  question: IQuestion,
  onBlurSubmitAnswer: (questionId: string) => void
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
              onBlurSubmitAnswer(question.id);
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
            onBlur={() => {
              onBlurSubmitAnswer(question.id);
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
            onBlur={() => {
              onBlurSubmitAnswer(question.id);
            }}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
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

  const onBlurSubmitAnswer = (questionId: string): void => {
    setIsSubmitting(true);
    waitFor(2000).then(() => {
      setIsSubmitting(false);
      message.success("Saved:" + questionId);
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
        >
          {questionnaire.questions.map((question: IQuestion) =>
            renderJourneyQuestion(question, onBlurSubmitAnswer)
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
