"use client";
import { Flex, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { addQuestionnaire } from "../actions";
import { MyButton } from "@/components/MyButton";
import type { IQuestionnaire } from "@/types/questionnaire";

const CreateQuestionnaire = (): React.ReactElement => {
  const [form] = Form.useForm();
  const [openCreateQuestionnaireModal, setOpenCreateQuestionnaireModal] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <Modal
        open={openCreateQuestionnaireModal}
        title="Create a Form"
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
            .then(async (values: IQuestionnaire) => {
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
        <MyButton
          type="primary"
          color="success"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpenCreateQuestionnaireModal(true);
          }}
        >
          New Form
        </MyButton>
      </Flex>
    </div>
  );
};

export default CreateQuestionnaire;
