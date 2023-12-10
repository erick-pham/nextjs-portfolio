"use client";
import { Form, Input, Radio, message, Card } from "antd";
import type { IQuestionnaire } from "@/types/questionnaire";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { updateQuestionnaire } from "../../actions";
import { MyButton } from "@/components/MyButton";
import Image from "next/image";

const QuestionnaireDetailPage = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const thumbnail = Form.useWatch<string>("thumbnail", form);

  const handleUpdateQuestionnaire = (): void => {
    form
      .validateFields()
      .then(async (values: IQuestionnaire) => {
        setIsSubmitting(true);
        return updateQuestionnaire(values);
      })
      .then(() => {
        message.success("Update Questionnaire success!");
      })
      .catch(() => {
        message.error("Update Questionnaire failed!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Card
    // gap={8}
    // justify="flex-start"
    // vertical
    // style={{ border: "2px", borderRadius: "4px" }}
    >
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        form={form}
        initialValues={{ ...questionnaire }}
        disabled={isSubmitting}
        // onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="id" name="id" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          label="Thumbnail"
          rules={[
            { type: "url" },
            // { type: "string", min: 6, warningOnly: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          {thumbnail && form.getFieldError("thumbnail").length === 0 && (
            <Image
              alt="thumbnail invalid"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "400px", height: "auto" }}
              loading="lazy"
              src={`${thumbnail}`}
            />
          )}
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Radio.Group buttonStyle="solid" optionType="button">
            <Radio.Button value="NEW">New</Radio.Button>
            <Radio value="ACTIVE">Active</Radio>
            <Radio value="INACTIVE">InActive</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <MyButton
            type="primary"
            color="success"
            onClick={handleUpdateQuestionnaire}
          >
            Update
          </MyButton>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QuestionnaireDetailPage;
