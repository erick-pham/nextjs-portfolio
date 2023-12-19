import type { FieldValues, UseControllerProps } from "react-hook-form";

export type FormInputProps = FieldValues & {
  label: string;
  name: string;
  control?: Pick<UseControllerProps, "control">;
};
