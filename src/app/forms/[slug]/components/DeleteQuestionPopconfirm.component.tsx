"use client";
import { Popconfirm, message } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteQuestion } from "../../actions";
import { MyButton } from "@/components/MyButton";

type DeleteQuestionPopconfirmProp = {
  questionId: string;
  questionnaireId: string;
};

const DeleteQuestionPopconfirm = ({
  questionId,
  questionnaireId,
}: DeleteQuestionPopconfirmProp): React.ReactElement => {
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = (): void => {
    setConfirmLoading(true);

    deleteQuestion(questionnaireId, questionId)
      .then(() => {
        message.success("Delete Question success!");
      })
      .catch(() => {
        message.error("Delete Question failed!");
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <Popconfirm
      title="Delete item"
      description="You cannot undo action!"
      open={openPopconfirm}
      onConfirm={handleOk}
      disabled={confirmLoading}
      okButtonProps={{ loading: confirmLoading }}
      cancelButtonProps={{ disabled: confirmLoading }}
      onCancel={() => {
        setOpenPopconfirm(false);
        setConfirmLoading(false);
      }}
    >
      <MyButton
        type="primary"
        color="danger"
        icon={<DeleteOutlined />}
        onClick={(): void => {
          setOpenPopconfirm(true);
        }}
      >
        Delete
      </MyButton>
    </Popconfirm>
  );
};

export default DeleteQuestionPopconfirm;
