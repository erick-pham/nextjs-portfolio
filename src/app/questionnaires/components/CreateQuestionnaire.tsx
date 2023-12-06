"use client";
import { Flex, Button } from "antd";
import { useState } from "react";
import QuestionCreateForm from "./CreateQuestionnaireModel";
import { PlusOutlined } from "@ant-design/icons";

const CreateQuestionnaire = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <div>
      <Flex justify={"flex-end"} align={"center"}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true);
          }}
        >
          New Question
        </Button>
      </Flex>

      <QuestionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default CreateQuestionnaire;
