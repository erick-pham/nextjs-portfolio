"use client";
import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import RuleFactorTable from "./RuleFactorTable";
import type { IRuleSet } from "@/types/rule";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
export const RuleDetailTab = ({
  ruleSet,
}: {
  ruleSet: IRuleSet;
}): React.ReactElement => {
  const [currentTabValue, setCurrentTabValue] = React.useState("factors");

  const handleChangeRuleDetailTab = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    setCurrentTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={currentTabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChangeRuleDetailTab}
            aria-label="lab API tabs example"
          >
            <Tab value="factors" label="Factors" />
            <Tab value="decisions" label="Decisions" />
            <Tab value="validate" label="Validate" />
          </TabList>
        </Box>
        <TabPanel value="factors">
          <RuleFactorTable ruleSet={ruleSet} />
        </TabPanel>
        <TabPanel value="decisions">Item Two</TabPanel>
        <TabPanel value="validate">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};
