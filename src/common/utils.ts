import type { ILabel } from "@/types/base";
import type { PresetColorKey } from "antd/es/theme/interface";

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

export const getLabelText = (labels: ILabel[], code: ILabel["code"]): string =>
  labels.find((label: ILabel) => label.code === code)?.label || "";

export const waitFor = async (seconds: number): Promise<void> =>
  new Promise((resolve: () => void) =>
    setTimeout(() => {
      resolve();
    }, seconds)
  );

export const getBadgeStatus = (status: string): PresetColorKey => {
  switch (status) {
    case "NEW":
      return "purple";
    case "ACTIVE":
      return "green";
    case "INACTIVE":
      return "gold";
    default:
      return "gold";
  }
};
