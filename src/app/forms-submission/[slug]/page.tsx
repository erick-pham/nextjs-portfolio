/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import type { PageProps } from "@/types/page.interface";
import { notFound } from "next/navigation";
import { getQuestionnaireById } from "../../forms/actions";
import { Grid } from "@mui/material";
import ViewForm from "./components/ViewForm";
import type { ReactElement } from "react";

const QuestionDetailPage = async (
  props: PageProps
): Promise<ReactElement | never> => {
  const { slug } = props.params;

  const question = await getQuestionnaireById(slug);

  if (!question) {
    return notFound();
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
      <Grid item sm={6} py={8}>
        <ViewForm questionnaire={question}></ViewForm>
      </Grid>
    </Grid>
  );
};

export default QuestionDetailPage;
