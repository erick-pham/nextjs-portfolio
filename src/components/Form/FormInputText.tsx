import type {
  ControllerFieldState,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { ReactElement } from "react";
import { FormControl, FormLabel } from "@mui/material";

export type FormOutputTextProps = FieldValues &
  TextFieldProps & {
    fieldName: string;
    hidden?: boolean;
    inputType?: "date" | "number" | "string" | "url";
    label?: string;
    validation?: RegisterOptions;
  };

type ControllerFieldType = Partial<FieldValues> & {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: string;
};

export const FormInputText = ({
  fieldName,
  label,

  hidden,
  validation,
  ...rest
}: FormOutputTextProps): ReactElement => {
  return (
    <Controller
      rules={validation}
      name={fieldName}
      render={({
        field,
        fieldState: { error },
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
          <TextField
            {...field}
            {...rest}
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            fullWidth
            hidden={hidden}
            // label={label}
            variant="outlined"
          />
        </FormControl>
      )}
    />
  );
};
