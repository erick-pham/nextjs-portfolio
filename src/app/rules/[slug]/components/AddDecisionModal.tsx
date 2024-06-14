"use client";
import { useState } from "react";

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
import { FormInputText } from "@/components/Form/FormInputText";
import LoadingWrapper from "@/components/LoadingWrapper";
import type { IRuleSet, IAddRuleDecision } from "@/types/rule";
import { AddConditionRule } from "./AddConditionRule";
import { useServerAction } from "@/hooks/useServerAction";
import { addRuleDecision } from "../actions";

const AddFactorModal = ({
  ruleSet,
}: {
  ruleSet: IRuleSet;
}): React.ReactElement => {
  const [openCreateDecisionModal, setOpenCreateFactorModal] = useState(false);
  const [runAction, isPending] = useServerAction(addRuleDecision);

  const addFormFactorMethod = useForm<FieldValues>({
    mode: "all",
    values: {
      decisionName: "",
      ruleId: ruleSet.id,
    },
  });

  const {
    getValues,
    formState: { isValid },
  } = addFormFactorMethod;

  const handleCloseCreateFactorModal = (): void => {
    addFormFactorMethod.reset();
    setOpenCreateFactorModal(false);
  };

  const handleSaveNewRuleDecision = async (): Promise<void> => {
    const addRuleDecisionRes = await runAction(getValues() as IAddRuleDecision);

    if (addRuleDecisionRes?.success) {
      addFormFactorMethod.reset();
      setOpenCreateFactorModal(false);
      toast.success(addRuleDecisionRes.message);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenCreateFactorModal(true);
        }}
        size="small"
        variant="contained"
        startIcon={<AddCircleIcon />}
        color="secondary"
      >
        Add
      </Button>

      <Dialog
        open={openCreateDecisionModal}
        onClose={setOpenCreateFactorModal}
        fullWidth
        maxWidth="md"
      >
        <LoadingWrapper loading={isPending}>
          <DialogTitle>New Decision</DialogTitle>
          <DialogContent>
            <DialogContent dividers>
              <FormProvider {...addFormFactorMethod}>
                <Grid container>
                  <Grid item xs={12}>
                    <FormInputText hidden fieldName="ruleId" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInputText
                      multiline
                      label="Decision Name"
                      fieldName="decisionName"
                      validation={{
                        required: "This field required",
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: "20px",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <AddConditionRule ruleSet={ruleSet} />
                  </Grid>
                </Grid>
              </FormProvider>
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <DialogActions>
              <Button
                onClick={handleCloseCreateFactorModal}
                variant="contained"
                color="info"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveNewRuleDecision}
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

export default AddFactorModal;
