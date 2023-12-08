"use client";
import { Flex, Button, Form, Input, Modal, message, Select } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { addQuestion } from "../../actions";
import type { Questionnaire } from "@/types/questionnaire";
import type { IQuestion } from "@/database/questionnaire";
import { QuestionTypeEnum } from "@/common/constants";
import { renderQuestionTypeSelection } from "./QuestionnaireTableQuestion";

const CreateQuestion = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState(false);
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
              return addQuestion(values);
            })
            .then(() => {
              message.success("Create Question success!");
            })
            .catch(() => {
              message.error("Create Question failed!");
            })
            .finally(() => {
              form.resetFields();
              setOpenCreateQuestionModal(false);
              setIsSubmitting(false);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
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
            <Select placeholder="Select a type" allowClear>
              {renderQuestionTypeSelection()}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Flex justify="flex-start" align="center" style={{ marginBottom: 8 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpenCreateQuestionModal(true);
          }}
        >
          New Question
        </Button>
      </Flex>
    </div>
  );
};

export default CreateQuestion;
