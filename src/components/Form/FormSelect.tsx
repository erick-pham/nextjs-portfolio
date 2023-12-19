import type { ControllerFieldState, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ReactElement } from "react";
import type { SelectChangeEvent, SelectProps } from "@mui/material";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

type SelectGroupOptions = {
  code: string;
  label: string;
};

export type FormSelectProps = SelectProps & {
  fieldName: string;
  options: SelectGroupOptions[];
  externalOnChange?: (formSelectedOption: string) => void;
  hidden?: boolean;
  label?: string;
  validation?: RegisterOptions;
};

type ControllerFieldType = {
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string;
};

export const FormSelect = ({
  fieldName,
  label,
  hidden,
  options,
  externalOnChange,
  validation,
  ...rest
}: FormSelectProps): ReactElement => {
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

          <Select
            fullWidth
            {...field}
            onChange={(event: SelectChangeEvent<unknown>): void => {
              externalOnChange?.(String(event.target.value));
              field.onChange(event as SelectChangeEvent<string>);
            }}
            {...rest}
          >
            {options.map((option: SelectGroupOptions) => {
              return (
                <MenuItem key={option.code} value={option.code}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
