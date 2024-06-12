"use client";
import type { ReactElement } from "react";
import { getLabelText } from "@/common/utils";
import { RULE_FACTOR_TYPE_LABEL } from "@/common/constants";
import {
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { IRuleFactor, IRuleSet } from "@/types/rule";
import DeleteFactorConfirmation from "./DeleteFactorConfirmation";
import AddDecisionModal from "./AddDecisionModal";

const RuleDecisionTab = ({ ruleSet }: { ruleSet: IRuleSet }): ReactElement => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mb: 4,
          }}
          gap={2}
        >
          <AddDecisionModal ruleSet={ruleSet} />
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Data type</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ruleSet.factors.map(
                (ruleFactor: IRuleFactor, ruleFactorIndex: number) => (
                  <TableRow key={ruleFactor.name + ruleFactorIndex}>
                    <TableCell align="left">{ruleFactorIndex + 1}</TableCell>
                    <TableCell align="left">{ruleFactor.name}</TableCell>
                    <TableCell align="center">
                      {getLabelText(
                        RULE_FACTOR_TYPE_LABEL,
                        ruleFactor.type as string
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                        gap={2}
                      >
                        {/* <EditQuestionModal question={question as IQuestion} /> */}

                        <DeleteFactorConfirmation
                          factorIndex={ruleFactorIndex}
                          ruleId={ruleSet.id}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RuleDecisionTab;
