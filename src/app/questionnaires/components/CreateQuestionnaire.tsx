"use client";
import { Flex, Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { addQuestionnaire } from "../actions";
import type { Questionnaire } from "@/types/questionnaire";

const CreateQuestionnaire = (): React.ReactElement => {
  const [form] = Form.useForm();
  const [openCreateQuestionnaireModal, setOpenCreateQuestionnaireModal] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <Modal
        open={openCreateQuestionnaireModal}
        title="Create a new question"
        okText="Create"
        okButtonProps={{
          loading: isSubmitting,
        }}
        cancelButtonProps={{
          disabled: isSubmitting,
        }}
        cancelText="Cancel"
        onCancel={() => {
          setOpenCreateQuestionnaireModal(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then(async (values: Questionnaire) => {
              setIsSubmitting(true);
              return addQuestionnaire(values);
            })
            .then(() => {
              message.success("Create Questionnaire success!");
            })
            .catch(() => {
              message.error("Create Questionnaire failed!");
            })
            .finally(() => {
              form.resetFields();
              setOpenCreateQuestionnaireModal(false);
              setIsSubmitting(false);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
          disabled={isSubmitting}
        >
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

      <Flex justify={"flex-end"} align={"center"}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpenCreateQuestionnaireModal(true);
          }}
        >
          New Questionnaire
        </Button>
      </Flex>
    </div>
  );
};

export default CreateQuestionnaire;
