"use client";
import { useState } from "react";

import { updateQuestion } from "../../actions";
import type { IQuestion } from "@/types/questionnaire";
import { QUESTION_TYPE_LABEL, type QuestionTypeEnum } from "@/common/constants";

import { RenderAdditionQuestionForm } from "./AdditionQuestionForm";
import { EditOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import LoadingWrapper from "@/components/LoadingWrapper";
import type { FieldValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import { FormSelect } from "@/components/Form/FormSelect";
import toast from "react-hot-toast";

const EditQuestionModal = ({
  question,
}: {
  question: IQuestion;
}): React.ReactElement => {
  const [openEditQuestionModal, setOpenEditQuestionModal] = useState(false);
  const [isSubmittingEditModal, setIsSubmittingEditModal] = useState(false);

  const editFormQuestionMethod = useForm<FieldValues>({
    mode: "all",
    defaultValues: question,
  });

  const {
    getValues,
    watch,
    formState: { isValid },
    reset,
  } = editFormQuestionMethod;
  const questionTypeWatcher = watch("questionType") as string;

  const handleCloseUpdateQuestionModal = (): void => {
    setOpenEditQuestionModal(false);
    reset();
  };

  const handleUpdateQuestion = (): void => {
    new Promise((): void => {
      (async (): Promise<void> => {
        try {
          setIsSubmittingEditModal(true);
          const updateQuestionFormRes = await updateQuestion(
            getValues() as IQuestion
          );

          toast.success(updateQuestionFormRes.message);
          setOpenEditQuestionModal(false);
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmittingEditModal(false);
        }
      })();
    });
  };

  return (
    <>
      <IconButton
        color="info"
        onClick={() => {
          setOpenEditQuestionModal(true);
        }}
      >
        <EditOutlined />
      </IconButton>
      <Dialog
        open={openEditQuestionModal}
        onClose={handleCloseUpdateQuestionModal}
        fullWidth
      >
        <LoadingWrapper loading={isSubmittingEditModal}>
          <DialogTitle>Update Form Question</DialogTitle>
          <DialogContent dividers>
            <FormProvider {...editFormQuestionMethod}>
              <Grid container>
                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    label="Name"
                    fieldName="name"
                    validation={{
                      required: "This field required",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormSelect
                    fieldName="questionType"
                    label="Type"
                    placeholder="Select a type"
                    options={QUESTION_TYPE_LABEL}
                    fullWidth={false}
                  />
                </Grid>

                {questionTypeWatcher && (
                  <Grid item xs={12} p={4}>
                    <RenderAdditionQuestionForm
                      questionType={questionTypeWatcher as QuestionTypeEnum}
                    />
                  </Grid>
                )}
              </Grid>
            </FormProvider>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseUpdateQuestionModal}
              variant="contained"
              color="info"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateQuestion}
              autoFocus
              variant="contained"
              color="success"
              disabled={!isValid}
            >
              Save
            </Button>
          </DialogActions>
        </LoadingWrapper>
      </Dialog>
    </>
  );
};

export default EditQuestionModal;
