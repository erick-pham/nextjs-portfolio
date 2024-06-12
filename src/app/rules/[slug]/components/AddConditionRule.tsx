import type { ReactElement } from "react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import type { IRuleFactor, IRuleSet } from "@/types/rule";
import type { SelectGroupOptions } from "@/components/Form/FormInputSelect";
import { FormInputSelect } from "@/components/Form/FormInputSelect";
import { DECISION_OPERATOR_LABEL } from "@/common/constants";

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

  const {
    fields: fieldsDecision,
    append: appendDecision,
    remove: removeDecision,
  } = useFieldArray({
    control,
    name: "decisions",
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

  const handleAddMoreOutput = (): void => {
    appendDecision({
      param: `param${fieldsDecision.length + 1}`,
      value: `value${fieldsDecision.length + 1}`,
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: 1,
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={"5%"}>
                #
              </TableCell>
              <TableCell align="center" width={"30%"}>
                Factor
              </TableCell>
              <TableCell align="center" width={"30%"}>
                Operator
              </TableCell>
              <TableCell align="center" width={"30%"}>
                Value
              </TableCell>
              <TableCell align="center" width={"5%"}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map(
              (_: unknown, index: number): ReactElement => (
                <TableRow
                  key={index + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    <FormInputSelect
                      fieldName={`rules.${index}.factor`}
                      placeholder="Select a Factor"
                      options={getAvailableFactorOptions(index)}
                      validation={{
                        required: "This field required",
                      }}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputSelect
                      fieldName={`rules.${index}.operator`}
                      placeholder="operator"
                      options={DECISION_OPERATOR_LABEL}
                      validation={{
                        required: "This field required",
                      }}
                      fullWidth
                    />
                  </TableCell>

                  <TableCell>
                    <FormInputText
                      multiline
                      fieldName={`rules.${index}.value`}
                      placeholder="Value"
                      validation={{
                        required: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
            <TableRow>
              <TableCell colSpan={3}>
                {fields.length < ruleSet.factors.length && (
                  <Button
                    color="secondary"
                    size="large"
                    startIcon={<AddCircleIcon fontSize="large" />}
                    onClick={handleAddMoreCondition}
                  >
                    Add more condition
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: "100%", mt: 3 }}>
        <Typography
          sx={{ flex: "1 1 100%", m: 1 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Output Parameters
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            margin: 1,
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width={"5%"}>
                  #
                </TableCell>
                <TableCell align="center" width={"45%"}>
                  Param
                </TableCell>
                <TableCell align="center" width={"45%"}>
                  Value
                </TableCell>
                <TableCell align="center" width={"5%"}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldsDecision.map(
                (_: unknown, index: number): ReactElement => (
                  <TableRow
                    key={index + 1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <FormInputText
                        fieldName={`decisions.${index}.param`}
                        placeholder="Param"
                        validation={{
                          required: true,
                        }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <FormInputText
                        fieldName={`decisions.${index}.value`}
                        placeholder="Value"
                        validation={{
                          required: true,
                        }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          removeDecision(index);
                        }}
                      >
                        <RemoveCircleOutlineIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
              <TableRow>
                <TableCell colSpan={3}>
                  {fieldsDecision.length < ruleSet.factors.length && (
                    <Button
                      color="secondary"
                      size="large"
                      startIcon={<AddCircleIcon fontSize="large" />}
                      onClick={handleAddMoreOutput}
                    >
                      Add more param
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
