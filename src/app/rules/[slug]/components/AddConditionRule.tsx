import type { ReactElement } from "react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import type { IRuleFactor, IRuleSet } from "@/types/rule";
import type { SelectGroupOptions } from "@/components/Form/FormInputSelect";
import { FormInputSelect } from "@/components/Form/FormInputSelect";

type RuleCondition = {
  factor: string;
  id: string;
  operator: string;
};
export const AddConditionRule = ({
  ruleSet,
}: {
  ruleSet: IRuleSet;
}): ReactElement => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules",
  });

  const rulesWatcher = (watch("rules") || []) as RuleCondition[];

  const handleAddMoreCondition = (): void => {
    append({ factor: "", operator: "", value: "" });
  };

  const getAvailableFactorOptions = (
    currentIndex: number
  ): SelectGroupOptions[] => {
    const usedFactors = rulesWatcher
      .map((fieldItem: RuleCondition) => fieldItem.factor)
      .filter((fieldItemName: RuleCondition["factor"]) => fieldItemName);

    const unusedFactors: SelectGroupOptions[] = [];
    ruleSet.factors.forEach((factorItem: IRuleFactor) => {
      if (
        !usedFactors.includes(factorItem.name) ||
        rulesWatcher[currentIndex].factor === factorItem.name
      ) {
        unusedFactors.push({
          code: factorItem.name,
          label: factorItem.name,
        });
      }
    });

    return unusedFactors;
  };

  return (
    <div>
      {fields.length < 1 && (
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <FormHelperText error={true}>At least ONE is required</FormHelperText>
        </FormControl>
      )}
      {fields.map((_: unknown, index: number): ReactElement => {
        return (
          <div key={index}>
            {index > 0 && (
              <Divider
                sx={{
                  marginBottom: 2,
                }}
              />
            )}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormInputSelect
                  fieldName={`rules.${index}.factor`}
                  label="Factor"
                  placeholder="Select a Factor"
                  options={getAvailableFactorOptions(index)}
                  sx={{
                    width: "90%",
                  }}
                  validation={{
                    required: "This field required",
                  }}
                />

                <Box
                  sx={{
                    width: "10%",
                  }}
                >
                  {index > 1 && (
                    <IconButton
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <FormInputText
                multiline
                fieldName={`rules.${index}.value`}
                placeholder="Value"
                validation={{
                  required: true,
                }}
              />
            </Grid>
          </div>
        );
      })}

      <Grid item xs={12}>
        <Button
          color="secondary"
          size="large"
          startIcon={<AddCircleIcon fontSize="large" />}
          onClick={handleAddMoreCondition}
        >
          Add more condition
        </Button>
      </Grid>
    </div>
  );
};
