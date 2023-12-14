"use client";
import { Flex, Form, Input, Modal, message, Select } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { addQuestion } from "../../actions";
import type { IQuestionnaire, IQuestion } from "@/types/questionnaire";
import { QuestionTypeEnum } from "@/common/constants";

import {
  renderAdditionQuestionForm,
  renderQuestionTypeSelection,
} from "./AdditionQuestionForm";
import { MyButton } from "@/components/MyButton";

const CreateQuestion = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState(false);
  const [questionType, setQuestionType] = useState<QuestionTypeEnum>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <Modal
        open={openCreateQuestionModal}
        title="Create a new Question"
        okText="Create"
        okButtonProps={{
          loading: isSubmitting,
        }}
        cancelButtonProps={{
          disabled: isSubmitting,
        }}
        cancelText="Cancel"
        onCancel={() => {
          setOpenCreateQuestionModal(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then(async (values: IQuestion) => {
              setIsSubmitting(true);

              try {
                await addQuestion(values);
                form.resetFields();
                setOpenCreateQuestionModal(false);
                message.success("Create Question success!");
              } catch (error) {
                message.error("Create Question failed!");
              }

              setIsSubmitting(false);
            })
            .catch(() => {
              message.error("Form validation failed!");
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-question-form-in-modal"
          disabled={isSubmitting}
          initialValues={{
            questionnaire: questionnaire.id,
            questionType: QuestionTypeEnum.TEXT,
          }}
        >
          <Form.Item name="questionnaire" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="questionType"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a type"
              allowClear
              onChange={(selectedType: QuestionTypeEnum): void => {
                setQuestionType(selectedType);
              }}
            >
              {renderQuestionTypeSelection()}
            </Select>
          </Form.Item>

          {questionType && renderAdditionQuestionForm(questionType)}
        </Form>
      </Modal>

      <Flex justify="flex-start" align="center" style={{ marginBottom: 8 }}>
        <MyButton
          type="primary"
          color="success"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpenCreateQuestionModal(true);
          }}
        >
          Create Question
        </MyButton>
      </Flex>
    </div>
  );
};

export default CreateQuestion;