"use client";
import { Flex, Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import addQuestionnaire from "../actions";

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
            .then(async (values: FormData) => {
              setIsSubmitting(true);
              return addQuestionnaire(values);
            })
            .catch((info: Error) => {
              console.log("Validate Failed:", info);
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
          action={addQuestionnaire}
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
            <Input disabled={isSubmitting} />
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
            <Input disabled={isSubmitting} />
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
