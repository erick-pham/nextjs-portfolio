import type { ReactElement } from "react";
import CreateForm from "./components/CreateForm.component";
import type { PageProps } from "@/types/base";
import ListCardForm from "./components/ListCardForm.component";
import { Grid } from "@mui/material";
import { getListForm } from "@/lib/forms.api";

const FormPage = async ({ searchParams }: PageProps): Promise<ReactElement> => {
  const listForms = await getListForm(searchParams);

  return (
    <Grid gap={8}>
      <CreateForm />
      <ListCardForm listForms={listForms} />
    </Grid>
  );
};

export default FormPage;
