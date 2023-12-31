import type { ControllerFieldState, FieldValues } from "react-hook-form";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { ReactElement } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

type CheckboxGroupOptions = {
  code: string;
  label: string;
};

export type FormCheckboxGroupProps = FieldValues & {
  fieldName: string;
  options: CheckboxGroupOptions[];
  disabled?: boolean;
  externalOnChange?: (checkboxValues: string[]) => void;
  hidden?: boolean;
  label?: string;
};

type ControllerFieldType = Partial<FieldValues> & {
  onChange: (checkboxValues: string[]) => void;
  value: string;
};

export const FormInputMultiCheckbox = ({
  fieldName,
  label,
  hidden,
  options,
  externalOnChange,
  disabled,
}: FormCheckboxGroupProps): ReactElement => {
  const { control } = useFormContext();

  const checkboxValues = (useWatch({ control, name: fieldName }) ||
    []) as string[];

  return (
    <Controller
      name={fieldName}
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerFieldType;
        fieldState: ControllerFieldState;
      }) => (
        <FormControl
          sx={{ m: 1, display: hidden ? "none" : undefined }}
          variant="standard"
          disabled={disabled}
        >
          <FormLabel>{label}</FormLabel>

          {options.map((option: CheckboxGroupOptions, index: number) => {
            return (
              <FormControlLabel
                key={option.code}
                label={option.label}
                control={
                  <Checkbox
                    size="small"
                    checked={checkboxValues.includes(option.code)}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>,
                      checked: boolean,
                    ): void => {
                      const newCheckboxValues = checked
                        ? [...checkboxValues, options[index].code]
                        : checkboxValues.filter(
                            (checkboxItemValue: string) =>
                              checkboxItemValue !== options[index].code,
                          );

                      field.onChange(newCheckboxValues);
                      externalOnChange?.(newCheckboxValues);
                    }}
                  />
                }
              />
            );
          })}
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
