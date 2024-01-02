import type { ReactElement } from "react";
import CreateForm from "./components/CreateForm.component";
import type { PageProps } from "@/types/base";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { getListForm } from "@/lib/forms.api";
import {
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/16/solid";
import { FormCard } from "./components/FormCard";
import { FormSearch } from "./components/FormSearch";
import type { Metadata } from "next";
import type { IQuestionnaire } from "@/types/questionnaire";

export const metadata: Metadata = {
  title: "ErickApp Forms",
};

const FormPage = async ({ searchParams }: PageProps): Promise<ReactElement> => {
  const listForms = await getListForm(searchParams);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Forms</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <CreateForm />
          </Stack>
          <FormSearch />
          <Grid container spacing={3}>
            {listForms.data.map((company: IQuestionnaire) => (
              <Grid item xs={12} md={6} lg={4} key={company.id}>
                <FormCard {...company} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination count={3} size="small" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default FormPage;
