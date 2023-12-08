"use client";
import { Flex, Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { addQuestionnaire } from "../../actions";
import type { Questionnaire } from "@/types/questionnaire";

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
            .then(async (values: Questionnaire) => {
              setIsSubmitting(true);
              return addQuestionnaire(values);
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
            questionnaireId: questionnaire.id,
          }}
        >
          <Form.Item name="questionnaireId" hidden>
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
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the description!",
              },
            ]}
          >
            <Input />
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
