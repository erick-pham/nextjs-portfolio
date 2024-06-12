import type {
  ControllerFieldState,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { ReactElement } from "react";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";

export type FormInputTextProps = FieldValues &
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
  InputLabelProps,
  hidden,
  validation,
  ...rest
}: FormInputTextProps): ReactElement => {
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
      }) => {
        return (
          <FormControl
            fullWidth
            sx={{ m: 1, display: hidden ? "none" : undefined }}
            variant="standard"
          >
            <FormLabel {...InputLabelProps}>{label}</FormLabel>
            <TextField
              {...field}
              {...rest}
              size="small"
              error={!!error}
              fullWidth
              hidden={hidden}
              variant="outlined"
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};
