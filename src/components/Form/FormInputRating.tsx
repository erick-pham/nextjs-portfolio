import type { ControllerFieldState, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { ReactElement } from "react";
import type { RatingProps } from "@mui/material";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Rating,
} from "@mui/material";

export type FormInputRatingProps = RatingProps & {
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

export const FormInputRating = ({
  fieldName,
  label,
  hidden,
  validation,
  externalOnChange,
  ...rest
}: FormInputRatingProps): ReactElement => {
  return (
    <Controller
      rules={validation}
      name={fieldName}
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerFieldType;
        fieldState: ControllerFieldState;
      }) => (
        <FormControl
          fullWidth
          sx={{ m: 1, display: hidden ? "none" : undefined }}
          variant="standard"
        >
          <FormLabel>{label}</FormLabel>
          <Box>
            <Rating
              size="large"
              hidden={hidden}
              value={Number(field.value)}
              onChange={(
                event: React.SyntheticEvent,
                ratingValue: number | null,
              ): void => {
                externalOnChange?.(ratingValue);
                field.onChange(ratingValue);
              }}
              {...rest}
            />
          </Box>
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
