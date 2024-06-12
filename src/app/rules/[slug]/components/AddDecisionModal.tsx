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
import type { IRuleSet } from "@/types/rule";
import { AddConditionRule } from "./AddConditionRule";

const AddFactorModal = ({
  ruleSet,
}: {
  ruleSet: IRuleSet;
}): React.ReactElement => {
  const [openCreateDecisionModal, setOpenCreateFactorModal] = useState(false);
  const [isLoadingCreateDecision, setIsLoadingCreateFactor] = useState(false);

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
    reset,
  } = addFormFactorMethod;

  const handleCloseCreateFactorModal = (): void => {
    setOpenCreateFactorModal(false);
    reset();
  };

  const handleSaveNewRuleDecision = (): void => {
    new Promise((): void => {
      (async (): Promise<void> => {
        try {
          console.log("getValues()", getValues());
          toast.success("getValues");
          // setIsLoadingCreateFactor(true);
          // const addFactorFormRes = await addFactor(
          //   getValues() as IAddRuleFactor
          // );
          // if (addFactorFormRes.success === false) {
          //   toast.error(addFactorFormRes.message);
          // } else {
          //   toast.success(addFactorFormRes.message);
          //   handleCloseCreateFactorModal();
          // }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingCreateFactor(false);
        }
      })();
    });
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
        <LoadingWrapper loading={isLoadingCreateDecision}>
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
