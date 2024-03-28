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

const AddFactorModal = ({
  ruleId,
}: {
  ruleId: IRuleSet["id"];
}): React.ReactElement => {
  const [openCreateFactorModal, setOpenCreateFactorModal] = useState(false);
  const [isLoadingCreateFactor, setIsLoadingCreateFactor] = useState(false);

  const addFormFactorMethod = useForm<FieldValues>({
    mode: "all",
    values: {
      factorName: "",
      ruleId: ruleId,
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

  const handleSaveNewFactor = (): void => {
    new Promise((): void => {
      (async (): Promise<void> => {
        try {
          setIsLoadingCreateFactor(true);
          const addFactorFormRes = await addFactor(
            getValues() as IAddRuleFactor
          );

          if (addFactorFormRes.success === false) {
            toast.error(addFactorFormRes.message);
          } else {
            toast.success(addFactorFormRes.message);

            handleCloseCreateFactorModal();
          }
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
        open={openCreateFactorModal}
        onClose={setOpenCreateFactorModal}
        fullWidth
      >
        <LoadingWrapper loading={isLoadingCreateFactor}>
          <DialogTitle>Create a new Factor</DialogTitle>
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
                  <Grid item xs={12}>
                    <FormInputSelect
                      fieldName="factorType"
                      label="Type"
                      placeholder="Select a type"
                      options={RULE_FACTOR_TYPE_LABEL}
                      validation={{
                        required: "This field required",
                      }}
                    />
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
                onClick={handleSaveNewFactor}
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
