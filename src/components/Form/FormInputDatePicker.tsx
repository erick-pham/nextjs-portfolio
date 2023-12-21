import type {
  ControllerFieldState,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ReactElement } from "react";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export type FormInputDatePickerProps = FieldValues & {
  fieldName: string;
  hidden?: boolean;
  label?: string;
  validation?: RegisterOptions;
};

export const FormInputDatePicker = ({
  fieldName,
  label,
  hidden,
  validation,
  ...rest
}: FormInputDatePickerProps): ReactElement => {
  return (
    <Controller
      rules={validation}
      name={fieldName}
      render={({
        fieldState: { error },
      }: {
        fieldState: ControllerFieldState;
      }) => (
        <FormControl
          fullWidth
          sx={{ m: 1, display: hidden ? "none" : undefined }}
          variant="standard"
        >
          <FormLabel>{label}</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker {...rest} />
          </LocalizationProvider>
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
