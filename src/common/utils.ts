import type { PresetStatusColorType } from "antd/es/_util/colors";
import { QuestionStatusEnum } from "./constants";
import type { ILabel } from "@/types/base";

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

export const getBadgeStatus = (
  status: QuestionStatusEnum
): PresetStatusColorType => {
  switch (status) {
    case QuestionStatusEnum.NEW:
      return "processing";
    case QuestionStatusEnum.ACTIVE:
      return "success";
    case QuestionStatusEnum.INACTIVE:
      return "default";
    default:
      return "default";
  }
};
