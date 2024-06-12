"use server";
import type { PageProps } from "@/types/base";
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { RuleTabPanel } from "./components/RuleTabPanel";
import { getRuleById } from "../actions";

const RuleDetailPage = async (
  props: PageProps
): Promise<React.ReactElement> => {
  const { slug } = props.params;
  const { active_tab } = props.searchParams;
  const ruleData = await getRuleById(slug);

  if (!ruleData) {
    return notFound();
  }

  return (
    <Grid container spacing={4}>
      <Grid item sm={12}>
        <RuleTabPanel ruleSet={ruleData} activeTab={active_tab} />
      </Grid>
    </Grid>
  );
};

export default RuleDetailPage;
