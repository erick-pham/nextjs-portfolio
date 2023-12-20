"use client";

import type { ReactElement } from "react";
import type {
  IQuestionnaire,
  IQuestion,
  IQuestionChoice,
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
} from "@mui/material";
import type { FieldValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import { FormInputSelect } from "@/components/Form/FormInputSelect";
import { FormInputRating } from "@/components/Form/FormInputRating";
import { FormInputRadioGroup } from "@/components/Form/FormInputRadioGroup";
import { FormInputMultiCheckbox } from "@/components/Form/FormInputMultiCheckbox";
import { FormInputDatePicker } from "@/components/Form/FormInputDatePicker";

const renderJourneyQuestion = (
  question: IQuestion,
  onSubmitAnswer: <T>(questionId: string, answer?: T) => void
): ReactElement => {
  switch (question.questionType) {
    case QuestionTypeEnum.TEXT:
      return (
        <FormInputText
          fieldName={question.id}
          label={question.name}
          validation={{
            required: "This field required.",
          }}
          onBlur={(): void => {
            onSubmitAnswer(question.id);
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
          externalOnChange={(value: number | null): void => {
            onSubmitAnswer<number | null>(question.id, value);
          }}
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
          externalOnChange={(answer: string): void => {
            onSubmitAnswer<boolean>(question.id, answer === "true");
          }}
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
          externalOnChange={(answer: string): void => {
            onSubmitAnswer<string>(question.id, answer);
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
          externalOnChange={(answers: string[]): void => {
            onSubmitAnswer<string[]>(question.id, answers);
          }}
        />
      );
    case QuestionTypeEnum.DATE:
      return (
        <FormInputDatePicker fieldName={question.id} label={question.name} />
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
          externalOnChange={(answer: string): void => {
            onSubmitAnswer<string>(question.id, answer);
          }}
        />
      );
    default:
      return <></>;
  }
};

const ViewForm = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  // const [form] = Form.useForm();
  const viewFormMethod = useForm<FieldValues>({
    mode: "all",
    reValidateMode: "onChange",
  });

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitAnswer = <T,>(questionId: string, answer?: T): void => {
    console.log("questionId", questionId, answer);
    // form
    //   .validateFields([questionId])
    //   .then(async () => {
    //     if (form.getFieldError(questionId).length === 0) {
    //       setIsSubmitting(true);
    //       await waitFor(2000);
    //       message.success(
    //         `Saved: [${questionId}]. Answer: [${form.getFieldValue(
    //           questionId
    //         )}]`
    //       );
    //     }
    //   })
    //   .catch((): void => {
    //     return;
    //   })
    //   .finally(() => {
    //     setIsSubmitting(false);
    //   });
  };

  return (
    <Card>
      <CardHeader title={questionnaire.name} />
      <Divider />
      <CardContent>
        <FormProvider {...viewFormMethod}>
          {questionnaire.questions.map(
            (question: IQuestion, questionIndex: number) => (
              <div key={question.id}>
                {renderJourneyQuestion(
                  {
                    ...question,
                    name: `${questionIndex + 1}. ${question.name}`,
                  },
                  onSubmitAnswer
                )}
              </div>
            )
          )}

          <CardActions>
            <Grid mt={2}>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </CardActions>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ViewForm;
