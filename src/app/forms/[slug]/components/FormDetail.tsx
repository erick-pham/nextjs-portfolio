"use client";

import type { IQuestionnaire } from "@/types/questionnaire";
import React, { useState } from "react";
import { updateFormAction } from "../../actions";
import Image from "next/image";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { FormInputText } from "@/components/Form/FormInputText";
import { FormProvider, useForm } from "react-hook-form";
import { FormRadioGroup } from "@/components/Form/FormRadioGroup";
import { STATUS_OPTIONS } from "@/common/constants";
import LoadingWrapper from "@/components/LoadingWrapper";
import toast from "react-hot-toast";

const FormDetailPage = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
}): React.ReactElement => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const formMethod = useForm<IQuestionnaire>({
    defaultValues: questionnaire,
  });
  const { getValues, watch } = formMethod;
  const thumbnailWatcher = watch("thumbnail") as string;

  const handleUpdateForm = (): void => {
    new Promise((): void => {
      (async (): Promise<void> => {
        try {
          setIsPending(true);
          const updateFormRes = await updateFormAction(getValues());
          toast.success(updateFormRes.message);
        } catch (error) {
          console.log(error);
        } finally {
          setIsPending(false);
        }
      })();
    });
  };

  return (
    <LoadingWrapper loading={isPending}>
      <FormProvider {...formMethod}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <FormInputText label="ID" fieldName="id" disabled />
                <FormInputText
                  label="Name"
                  fieldName="name"
                  validation={{
                    required: "This field required",
                  }}
                />
                <FormInputText
                  label="Description"
                  fieldName="description"
                  validation={{
                    required: "This field required",
                  }}
                />
                <FormInputText label="Thumbnail" fieldName="thumbnail" />
                <FormRadioGroup
                  options={STATUS_OPTIONS}
                  label="Status"
                  fieldName="status"
                  validation={{
                    required: "This field required",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {thumbnailWatcher && (
                  <Image
                    alt="thumbnail invalid"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "auto", height: "auto", borderRadius: 8 }}
                    loading="lazy"
                    src={`${thumbnailWatcher}`}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isPending}
                  onClick={handleUpdateForm}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </FormProvider>
    </LoadingWrapper>
  );
};

export default FormDetailPage;
