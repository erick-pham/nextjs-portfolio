import type { ControllerFieldState, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { ReactElement } from "react";
import { Box, FormControl, FormLabel, Rating } from "@mui/material";

export type FormRatingProps = {
  fieldName: string;
  externalOnChange?: (value: number | null) => void;
  hidden?: boolean;
  label?: string;
  validation?: RegisterOptions;
};

type ControllerFieldType = {
  onChange: (value: number | null) => void;
  value: number | null;
};

export const FormRating = ({
  fieldName,
  label,
  hidden,
  validation,
  externalOnChange,
  ...rest
}: FormRatingProps): ReactElement => {
  return (
    <Controller
      rules={validation}
      name={fieldName}
      render={({
        field,
      }: // formState,
      {
        field: ControllerFieldType;
        fieldState: ControllerFieldState;
        // formState: UseFormStateReturn;
      }) => (
        <FormControl
          fullWidth
          sx={{ m: 1, display: hidden ? "none" : undefined }}
          variant="standard"
        >
          <FormLabel>{label}</FormLabel>
          <Box>
            <Rating
              hidden={hidden}
              value={Number(field.value)}
              onChange={(
                event: React.SyntheticEvent,
                ratingValue: number | null
              ): void => {
                externalOnChange?.(ratingValue);
                field.onChange(ratingValue);
              }}
              {...rest}
            />
          </Box>
        </FormControl>
      )}
    />
  );
};
