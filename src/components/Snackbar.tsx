/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ProviderContext, OptionsObject } from "notistack";
import { useSnackbar } from "notistack";

//sets a default length for all Snack messages
const defaultSnackMessageLength = 100;

const trimMessage = (
  msg: string,
  length: number = defaultSnackMessageLength,
): string => {
  return msg.substring(0, length);
};

let useSnackbarRef: ProviderContext;
export const SnackbarUtilsConfigurator: React.FC = (): null => {
  useSnackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg: string, options: OptionsObject = {}): void {
    this.toast(trimMessage(msg), { ...options, variant: "success" });
  },
  warning(msg: string, options: OptionsObject = {}): void {
    this.toast(trimMessage(msg), { ...options, variant: "warning" });
  },
  info(msg: string, options: OptionsObject = {}): void {
    this.toast(trimMessage(msg), { ...options, variant: "info" });
  },
  error(msg: string, options: OptionsObject = {}): void {
    this.toast(trimMessage(msg), { ...options, variant: "error" });
  },
  toast(msg: string, options: OptionsObject = {}): void {
    useSnackbarRef.enqueueSnackbar(msg, options);
  },
};
