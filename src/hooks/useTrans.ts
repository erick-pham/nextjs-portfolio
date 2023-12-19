import { useRouter } from "next/router";
import en from "../i18n/en";
import vi from "../i18n/vi";
import type { ILang } from "@/i18n/lang.interface";

const useTrans = (): ILang => {
  const { locale } = useRouter();

  const trans = locale === "vi" ? vi : en;

  return trans;
};

export default useTrans;
