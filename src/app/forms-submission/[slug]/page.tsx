/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import type { PageProps } from "@/types/base";
import { notFound } from "next/navigation";
import { getQuestionnaireById } from "../../forms/actions";
import { Grid } from "@mui/material";
import ViewForm from "./components/ViewForm";
import type { ReactElement } from "react";
import { FormSubmissionModel } from "@/database/form";
import type { IAnswerData } from "@/types/questionnaire";

const QuestionDetailPage = async (
  props: PageProps,
): Promise<ReactElement | never> => {
  const { slug } = props.params;
  const result_id = props.searchParams.result_id;

  const question = await getQuestionnaireById(slug);

  if (!question) {
    return notFound();
  }

  let answers: IAnswerData = null;

  if (result_id) {
    const submission = await FormSubmissionModel.findOne({
      id: result_id as string,
      questionnaire: slug,
    })
      .select("-_id -__v")
      .lean()
      .exec();

    if (!submission) {
      return notFound();
    }

    answers = {};
    for (const x of submission.answers) {
      answers[x.id] = x.answer;
    }
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
      <Grid item xs={12} sm={12} md={6} m={4}>
        <ViewForm questionnaire={question} answers={answers}></ViewForm>
      </Grid>
    </Grid>
  );
};

export default QuestionDetailPage;
