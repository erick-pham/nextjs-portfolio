"use client";
import { useState } from "react";
import { addFactor } from "../../actions";
import { RULE_FACTOR_TYPE_LABEL, RuleFactorTypeEnum } from "@/common/constants";

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
import { FormInputText } from "@/components/Form/FormInputText";
import LoadingWrapper from "@/components/LoadingWrapper";
import type { IAddRuleFactor, IRuleSet } from "@/types/rule";
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
      factorName: "",
      ruleId: ruleSet.id,
      factorType: RuleFactorTypeEnum.STRING,
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
                      label="Name"
                      fieldName="factorName"
                      validation={{
                        required: "This field required",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} p={4}>
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
