import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ReactElement } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material";

type CheckboxGroupOptions = {
  code: string;
  label: string;
};

export type FormCheckboxGroupProps = FieldValues & {
  fieldName: string;
  options: CheckboxGroupOptions[];
  externalOnChange?: (checked: string[]) => void;
  hidden?: boolean;
  label?: string;
};

// type ControllerFieldType = Partial<FieldValues> & {
//   onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
//   value: string;
// };

export const FormInputMultiCheckbox = ({
  fieldName,
  label,
  hidden,
  options,
}: // externalOnChange,
// ...rest
FormCheckboxGroupProps): ReactElement => {
  return (
    <Controller
      name={fieldName}
      render={() => (
        <FormControl
          fullWidth
          sx={{ m: 1, display: hidden ? "none" : undefined }}
          variant="standard"
        >
          <FormLabel>{label}</FormLabel>

          {options.map((option: CheckboxGroupOptions) => {
            return (
              <FormControlLabel
                key={option.code}
                label={option.label}
                control={<Checkbox value={option.code} />}
              />
            );
          })}
        </FormControl>
      )}
    />
  );
};
