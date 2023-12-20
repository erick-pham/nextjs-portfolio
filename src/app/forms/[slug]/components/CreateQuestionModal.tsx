"use client";
import { useState } from "react";
import { addQuestion } from "../../actions";
import type { IQuestionnaire, IQuestion } from "@/types/questionnaire";
import { QUESTION_TYPE_LABEL, QuestionTypeEnum } from "@/common/constants";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import type { FieldValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormInputSelect } from "@/components/Form/FormInputSelect";
import { RenderAdditionQuestionForm } from "./AdditionQuestionForm";
import { FormInputText } from "@/components/Form/FormInputText";
import LoadingWrapper from "@/components/LoadingWrapper";

const CreateQuestion = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState(false);
  const [isLoadingCreateQuestion, setIsLoadingCreateQuestion] = useState(false);

  const addFormQuestionMethod = useForm<FieldValues>({
    mode: "all",
    defaultValues: {
      questionnaire: questionnaire.id,
      questionType: QuestionTypeEnum.TEXT,
    },
  });

  const {
    getValues,
    watch,
    formState: { isValid },
    reset,
  } = addFormQuestionMethod;

  const questionTypeWatcher = watch("questionType") as string;

  const handleCloseCreateQuestionModal = (): void => {
    setOpenCreateQuestionModal(false);
    reset();
  };

  const handleSaveNewQuestion = (): void => {
    new Promise((): void => {
      (async (): Promise<void> => {
        try {
          setIsLoadingCreateQuestion(true);
          const addQuestionFormRes = await addQuestion(
            getValues() as IQuestion
          );

          toast.success(addQuestionFormRes.message);
          handleCloseCreateQuestionModal();
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingCreateQuestion(false);
        }
      })();
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenCreateQuestionModal(true);
        }}
        size="small"
        variant="contained"
        startIcon={<AddCircleIcon />}
        color="secondary"
      >
        Add more Question
      </Button>

      <Dialog
        open={openCreateQuestionModal}
        onClose={setOpenCreateQuestionModal}
        fullWidth
      >
        <LoadingWrapper loading={isLoadingCreateQuestion}>
          <DialogTitle>Create a new Question</DialogTitle>
          <DialogContent>
            <DialogContent dividers>
              <FormProvider {...addFormQuestionMethod}>
                <Grid container>
                  <Grid item xs={12}>
                    <FormInputText hidden fieldName="questionnaire" />
                  </Grid>
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
                    <FormInputSelect
                      fieldName="questionType"
                      label="Type"
                      placeholder="Select a type"
                      options={QUESTION_TYPE_LABEL}
                      validation={{
                        required: "This field required",
                      }}
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
          </DialogContent>
          <DialogActions>
            <DialogActions>
              <Button
                onClick={handleCloseCreateQuestionModal}
                variant="contained"
                color="info"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveNewQuestion}
                autoFocus
                variant="contained"
                color="success"
                disabled={!isValid}
              >
                Save
              </Button>
            </DialogActions>
          </DialogActions>
        </LoadingWrapper>
      </Dialog>
    </>
  );
};

export default CreateQuestion;
