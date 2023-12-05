import { Label } from "./interface";

export const getStatusColor = (status: string) => {
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

export const getLabelText = (labels: Label[], code: Label["code"]) =>
  labels.find((label: Label) => label.code === code)?.label || "";
