"use client";
import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import RuleFactorTab from "./RuleFactorTab";
import type { IRuleSet } from "@/types/rule";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import RuleDecisionTab from "./RuleDecisionTab";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const TAB_KEYS = ["factors", "decisions", "validate"];

export const RuleTabPanel = ({
  ruleSet,
  activeTab,
}: {
  activeTab: string;
  ruleSet: IRuleSet;
}): React.ReactElement => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [currentTabValue, setCurrentTabValue] = useState(
    TAB_KEYS.indexOf(activeTab) >= 0 ? activeTab : "factors"
  );

  const handleChangeRuleDetailTab = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    setCurrentTabValue(newValue);
    params.set("active_tab", newValue);
    replace(`${pathname}?${params.toString()}`);
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
          <RuleFactorTab ruleSet={ruleSet} />
        </TabPanel>
        <TabPanel value="decisions">
          <RuleDecisionTab ruleSet={ruleSet} />
        </TabPanel>
        <TabPanel value="validate">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};
