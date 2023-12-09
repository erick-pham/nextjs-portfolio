"use client";
import { Form, Input, Upload, Radio, message, Card } from "antd";
import type { Questionnaire } from "@/types/questionnaire";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { updateQuestionnaire } from "../../actions";
import { MyButton } from "@/components/MyButton";

// const normFile = (e: string): string[] | string => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e.fileList;
// };

const QuestionnaireDetailPage = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateQuestionnaire = (): void => {
    form
      .validateFields()
      .then(async (values: Questionnaire) => {
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
          label="Thumbnail"
          name="thumbnail"
          valuePropName="thumbnail"
          // getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
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
