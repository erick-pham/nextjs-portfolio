"use client";

import { useState } from "react";
import { Button, Grid, SvgIcon } from "@mui/material";
import { useForm, type FieldValues, FormProvider } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import toast from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/16/solid";
import { addRuleSet } from "../actions";
import type { IRuleSet } from "@/types/rule";
import { useServerAction } from "@/hooks/useServerAction";
import DialogForm from "@/components/DialogForm";

const CreateRuleSet = (): React.ReactElement => {
  const [openCreateRuleSetModal, setOpenCreateRuleSetModal] = useState(false);
  const [runAction, isPending] = useServerAction(addRuleSet);

  const createRuleSetMethod = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });
  const {
    formState: { isValid: createRuleSetFormValid },
  } = createRuleSetMethod;

  const handleAddNewRule = async (): Promise<void> => {
    const addRuleSetRes = await runAction(
      createRuleSetMethod.getValues() as IRuleSet
    );

    if (addRuleSetRes?.success) {
      createRuleSetMethod.reset();
      setOpenCreateRuleSetModal(false);
      toast.success(addRuleSetRes.message);
    }
  };

  return (
    <div>
      <DialogForm
        open={openCreateRuleSetModal}
        onClose={setOpenCreateRuleSetModal}
        loading={isPending}
        handleClickSave={handleAddNewRule}
        handleClickCancel={(): void => {
          setOpenCreateRuleSetModal(false);
        }}
        dialogFormTitle="Create Rule Set"
        disabledSaveButton={!createRuleSetFormValid}
      >
        <FormProvider {...createRuleSetMethod}>
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
          </Grid>
        </FormProvider>
      </DialogForm>

      <Grid mb={2}>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          variant="contained"
          onClick={() => {
            setOpenCreateRuleSetModal(true);
          }}
        >
          Add
        </Button>
      </Grid>
    </div>
  );
};

export default CreateRuleSet;
