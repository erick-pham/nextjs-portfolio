import type {
  ControllerFieldState,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ReactElement } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

type RadioGroupOptions = {
  code: string;
  label: string;
};

export type FormRadioGroupProps = FieldValues &
  Pick<UseControllerProps, "control"> & {
    fieldName: string;
    options: RadioGroupOptions[];
    externalOnChange?: (value: string) => void;
    hidden?: boolean;
    label?: string;
  };

type ControllerFieldType = {
  onChange: (value: string) => void;
  value: string;
};

export const FormRadioGroup = ({
  fieldName,
  label,
  hidden,
  options,
  externalOnChange,
  ...rest
}: FormRadioGroupProps): ReactElement => {
  const generateRadioOptions = (): ReactElement[] =>
    options.map((option: RadioGroupOptions) => {
      return (
        <FormControlLabel
          key={option.code}
          value={option.code}
          control={<Radio color="success" />}
          label={option.label}
        />
      );
    });

  return (
    <Controller
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
          <RadioGroup
            value={field.value}
            onChange={(
              event: React.SyntheticEvent,
              radioValue: string
            ): void => {
              externalOnChange?.(radioValue);
              field.onChange(radioValue);
            }}
            {...rest}
          >
            {generateRadioOptions()}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};
