"use client";
import { useState } from "react";
import { addQuestionnaire } from "../actions";
import type { IQuestionnaire } from "@/types/questionnaire";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useForm, type FieldValues, FormProvider } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import toast from "react-hot-toast";
import type { IActionResponse } from "@/types/page.interface";

const CreateForm = (): React.ReactElement => {
  const [openCreateQuestionnaireModal, setOpenCreateQuestionnaireModal] =
    useState(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const createFormMethod = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });

  const handleAddNewForm = (): void => {
    setIsPending(true);
    addQuestionnaire(createFormMethod.getValues() as IQuestionnaire)
      .then((addFormRes: IActionResponse<null>) => {
        createFormMethod.reset();
        setOpenCreateQuestionnaireModal(false);
        toast.success(addFormRes.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div>
      <Dialog
        open={openCreateQuestionnaireModal}
        onClose={setOpenCreateQuestionnaireModal}
      >
        <LoadingWrapper loading={isPending}>
          <DialogTitle>Create new form</DialogTitle>
          <DialogContent>
            <FormProvider {...createFormMethod}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <FormInputText
                    label="Name"
                    fieldName="name"
                    validation={{
                      required: "This field required",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormInputText
                    label="Description"
                    fieldName="description"
                    validation={{
                      required: "This field required",
                    }}
                  />
                </Grid>
              </Grid>
            </FormProvider>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setOpenCreateQuestionnaireModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddNewForm}
            >
              Create
            </Button>
          </DialogActions>
        </LoadingWrapper>
      </Dialog>

      <Grid mb={2}>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            setOpenCreateQuestionnaireModal(true);
          }}
        >
          New Form
        </Button>
      </Grid>
    </div>
  );
};

export default CreateForm;
