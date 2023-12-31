import { format } from "date-fns";

export const formatDate = (
  date: Date | string,
  dataFormat?: string,
): string => {
  return format(new Date(date), dataFormat || "Pp");
};
