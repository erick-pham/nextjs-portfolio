"use client";
import { Flex, Button, Form, Input, Upload } from "antd";

import type { Questionnaire } from "@/types/questionnaire";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import TextArea from "antd/es/input/TextArea";

// const normFile = (e: string): string[] | string => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e.fileList;
// };

const QuestionnaireDetails = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}): React.ReactElement => {
  const [form] = Form.useForm();
  return (
    <Flex gap={8} justify="flex-start" vertical>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        form={form}
        initialValues={{ ...questionnaire }}
        // onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Upload"
          name="thumbnail"
          // getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary">Update</Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default QuestionnaireDetails;
