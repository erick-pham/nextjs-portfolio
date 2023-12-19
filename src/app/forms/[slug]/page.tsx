/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import * as React from "react";
import type { PageProps } from "@/types/base";
import { notFound } from "next/navigation";
import { getQuestionnaireById } from "../actions";
import FormDetail from "./components/FormDetail";
import FormTableQuestion from "./components/FormTableQuestion";
import { Grid } from "@mui/material";

const FormDetailPage = async (
  props: PageProps
): Promise<React.ReactElement> => {
  const { slug } = props.params;

  const question = await getQuestionnaireById(slug);

  if (!question) {
    return notFound();
  }

  return (
    <Grid container spacing={4}>
      <Grid item>
        <FormDetail questionnaire={question} />
      </Grid>
      <Grid item>
        <FormTableQuestion questionnaire={question} />
      </Grid>
    </Grid>
  );
};

export default FormDetailPage;
