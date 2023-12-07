"use server";

import { waitFor } from "@/common/utils";
import { revalidatePath, revalidateTag } from "next/cache";

export const addQuestionnaire = async (formData: FormData): Promise<void> => {
  await waitFor(3000);
  console.log("formData", formData);
  revalidateTag("posts");
  revalidatePath("/questionnaire");
};
