"use client";

import { useState, type ReactElement } from "react";
import type {
  IQuestionnaire,
  IQuestion,
  IQuestionChoice,
  IAnswerData,
} from "@/types/questionnaire";
import { QuestionTypeEnum } from "@/common/constants";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import type { FieldValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import { FormInputSelect } from "@/components/Form/FormInputSelect";
import { FormInputRating } from "@/components/Form/FormInputRating";
import { FormInputRadioGroup } from "@/components/Form/FormInputRadioGroup";
import { FormInputMultiCheckbox } from "@/components/Form/FormInputMultiCheckbox";
import { FormInputDatePicker } from "@/components/Form/FormInputDatePicker";
import { submitForm } from "../actions";

import LoadingWrapper from "@/components/LoadingWrapper";

const renderJourneyQuestion = (question: IQuestion): ReactElement => {
  switch (question.questionType) {
    case QuestionTypeEnum.TEXT:
      return (
        <FormInputText
          fieldName={question.id}
          label={question.name}
          validation={{
            required: "This field required.",
          }}
        />
      );
    case QuestionTypeEnum.RATING:
      return (
        <FormInputRating
          fieldName={question.id}
          label={question.name}
          validation={{
            required: "This field required.",
          }}
          // externalOnChange={(value: number | null): void => {
          //   onSubmitAnswer<number | null>(question.id, value);
          // }}
        />
      );
    case QuestionTypeEnum.YES_NO:
      return (
        <FormInputRadioGroup
          fieldName={question.id}
          label={question.name}
          options={[
            {
              code: "true",
              label: "Yes",
            },
            {
              code: "false",
              label: "No",
            },
          ]}
          validation={{
            required: "This field required.",
          }}
          // externalOnChange={(answer: string): void => {
          //   onSubmitAnswer<boolean>(question.id, answer === "true");
          // }}
          typeYesNo
        />
      );
    case QuestionTypeEnum.SINGLE_CHOICE:
      return (
        <FormInputSelect
          fieldName={question.id}
          label={question.name}
          options={question.choices.map((questionChoice: IQuestionChoice) => {
            return {
              code: questionChoice.code,
              label: questionChoice.text,
            };
          })}
          // externalOnChange={(answer: string): void => {
          //   onSubmitAnswer<string>(question.id, answer);
          // }}
          validation={{
            required: "This field required.",
          }}
        />
      );
    case QuestionTypeEnum.MULTIPLE_CHECKBOX:
      return (
        <FormInputMultiCheckbox
          fieldName={question.id}
          label={question.name}
          options={question.choices.map((questionChoice: IQuestionChoice) => {
            return {
              code: questionChoice.code,
              label: questionChoice.text,
            };
          })}
          // externalOnChange={(answers: string[]): void => {
          //   onSubmitAnswer<string[]>(question.id, answers);
          // }}
          validation={{
            required: "This field required.",
          }}
        />
      );
    case QuestionTypeEnum.DATE:
      return (
        <FormInputDatePicker
          fieldName={question.id}
          label={question.name}
          // validation={{
          //   required: "This field required.",
          // }}
        />
      );
    case QuestionTypeEnum.RADIO:
      return (
        <FormInputRadioGroup
          fieldName={question.id}
          label={question.name}
          options={question.choices.map((questionChoice: IQuestionChoice) => {
            return {
              code: questionChoice.code,
              label: questionChoice.text,
            };
          })}
          // externalOnChange={(answer: string): void => {
          //   onSubmitAnswer<string>(question.id, answer);
          // }}
          validation={{
            required: "This field required.",
          }}
        />
      );
    default:
      return <></>;
  }
};

const ViewForm = ({
  questionnaire,
  answers,
}: {
  answers: IAnswerData;
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  const viewFormMethod = useForm<FieldValues>({
    mode: "all",
    defaultValues: {
      questionnaire: questionnaire.id,
      ...answers,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittedForm = Boolean(answers);

  const {
    formState: { isValid },
  } = viewFormMethod;

  const onSubmitForm = (): void => {
    setIsSubmitting(true);
    submitForm(viewFormMethod.getValues() as FieldValues).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Card>
      <CardHeader
        title={
          <>
            <Typography variant="h2">Subject: {questionnaire.name}</Typography>
            {isSubmittedForm && (
              <Typography variant="h4">Your submission</Typography>
            )}
          </>
        }
      />
      <Divider />
      <CardContent
        sx={{
          pointerEvents: isSubmittedForm ? "none" : undefined,
        }}
      >
        <LoadingWrapper loading={isSubmitting}>
          <FormProvider {...viewFormMethod}>
            {questionnaire.questions.map(
              (question: IQuestion, questionIndex: number) => (
                <div key={question.id}>
                  {renderJourneyQuestion({
                    ...question,
                    name: `${questionIndex + 1}. ${question.name}`,
                  })}
                </div>
              )
            )}

            {!isSubmittedForm && (
              <CardActions>
                <Grid mt={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={onSubmitForm}
                    disabled={!isValid}
                  >
                    Submit
                  </Button>
                </Grid>
              </CardActions>
            )}
          </FormProvider>
        </LoadingWrapper>
      </CardContent>
    </Card>
  );
};

export default ViewForm;
