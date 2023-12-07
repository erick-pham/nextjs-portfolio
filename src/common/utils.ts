import type { Label } from "./interface";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "NEW":
      return "info";
    case "ACTIVE":
    case "SUCCESS":
      return "success";
    case "DELETED":
    case "CANCEL":
      return "error";
    case "SELLING":
    case "PENDING":
      return "warning";
    default:
      return "default";
  }
};

export const getLabelText = (labels: Label[], code: Label["code"]): string =>
  labels.find((label: Label) => label.code === code)?.label || "";

export const waitFor = async (seconds: number): Promise<void> =>
  new Promise((resolve: () => void) =>
    setTimeout(() => {
      resolve();
    }, seconds)
  );
