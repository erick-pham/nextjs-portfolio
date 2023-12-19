import type { ReactElement } from "react";
import React from "react";
import { QuestionTypeEnum } from "@/common/constants";
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
export const RenderAdditionQuestionForm = ({
  questionType,
}: {
  questionType: QuestionTypeEnum;
}): ReactElement => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });

  const handleAddMoreOption = (): void => {
    append({ code: "", label: "" });
  };

  switch (questionType) {
    case QuestionTypeEnum.RADIO:
    case QuestionTypeEnum.MULTIPLE_CHECKBOX:
    case QuestionTypeEnum.SINGLE_CHOICE:
      return (
        <div>
          {fields.length < 2 && (
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <FormHelperText error={true}>
                At least two is required
              </FormHelperText>
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
                    <FormInputText
                      fieldName={`choices.${index}.code`}
                      validation={{
                        required: true,
                      }}
                      placeholder="Answer code"
                      sx={{
                        width: "90%",
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
                    fieldName={`choices.${index}.text`}
                    placeholder="Answer text"
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
              onClick={handleAddMoreOption}
            >
              Add more option
            </Button>
          </Grid>
        </div>
      );
    default:
      return <></>;
  }
};
