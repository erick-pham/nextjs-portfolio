"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SvgIcon,
} from "@mui/material";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useForm, type FieldValues, FormProvider } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import toast from "react-hot-toast";
import type { IActionResponse } from "@/types/base";
import { PlusIcon } from "@heroicons/react/16/solid";
import { addRuleSet } from "../action";
import type { IRuleSet } from "@/types/rule";

const CreateRuleSet = (): React.ReactElement => {
  const [openCreateRuleSetModal, setOpenCreateRuleSetModal] = useState(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const createRuleSetMethod = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });

  const handleAddNewRule = (): void => {
    setIsPending(true);
    addRuleSet(createRuleSetMethod.getValues() as IRuleSet)
      .then((addRuleSetRes: IActionResponse<null>) => {
        createRuleSetMethod.reset();
        setOpenCreateRuleSetModal(false);
        toast.success(addRuleSetRes.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div>
      <Dialog open={openCreateRuleSetModal} onClose={setOpenCreateRuleSetModal}>
        <LoadingWrapper loading={isPending}>
          <DialogTitle>Create Rule Set</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setOpenCreateRuleSetModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddNewRule}
            >
              Create
            </Button>
          </DialogActions>
        </LoadingWrapper>
      </Dialog>

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
