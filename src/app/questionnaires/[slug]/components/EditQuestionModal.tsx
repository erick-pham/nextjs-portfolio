"use client";
import { Flex, Form, Input, Modal, message, Select } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { updateQuestion } from "../../actions";
import type { IQuestion } from "@/types/questionnaire";
import type { QuestionTypeEnum } from "@/common/constants";

import {
  renderAdditionQuestionForm,
  renderQuestionTypeSelection,
} from "./AdditionQuestionForm";
import { MyButton } from "@/components/MyButton";

const EditQuestionModal = ({
  question,
}: {
  question: IQuestion;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState(false);
  const [questionType, setQuestionType] = useState<QuestionTypeEnum>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <Modal
        open={openCreateQuestionModal}
        title="Update question"
        okText="Update"
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
                await updateQuestion(values);
                form.resetFields();
                setOpenCreateQuestionModal(false);
                message.success("Update Question success!");
              } catch (error) {
                message.error("Update Question failed!");
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
          initialValues={question}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
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
          color="primary"
          icon={<EditOutlined />}
          onClick={() => {
            setOpenCreateQuestionModal(true);
          }}
        >
          Edit
        </MyButton>
      </Flex>
    </div>
  );
};

export default EditQuestionModal;
