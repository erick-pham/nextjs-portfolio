/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
"use server";
import type { PageProps } from "@/types/base";
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { RuleDetailTab } from "./components/RuleDetailTab";
import { getRuleById } from "../actions";

const RuleDetailPage = async (
  props: PageProps
): Promise<React.ReactElement> => {
  const { slug } = props.params;

  const ruleData = await getRuleById(slug);

  if (!ruleData) {
    return notFound();
  }

  return (
    <Grid container spacing={4}>
      <Grid item sm={12}>
        <RuleDetailTab ruleSet={ruleData} />
      </Grid>
    </Grid>
  );
};

export default RuleDetailPage;
