import type { FieldValues, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ReactElement } from "react";
import { FormControl, FormLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export type FormDatePickerProps = FieldValues & {
  fieldName: string;
  hidden?: boolean;
  label?: string;
  validation?: RegisterOptions;
};

export const FormDatePicker = ({
  fieldName,
  label,
  hidden,
  validation,
  ...rest
}: FormDatePickerProps): ReactElement => {
  return (
    <Controller
      rules={validation}
      name={fieldName}
      render={() => (
        <FormControl
          fullWidth
          sx={{ m: 1, display: hidden ? "none" : undefined }}
          variant="standard"
        >
          <FormLabel>{label}</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker {...rest} />
          </LocalizationProvider>
        </FormControl>
      )}
    />
  );
};
