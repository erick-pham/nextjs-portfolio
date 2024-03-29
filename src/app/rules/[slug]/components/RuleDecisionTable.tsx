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
  TableContainer,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "@/components/StyledTable";
import type { IRuleFactor, IRuleSet } from "@/types/rule";
import DeleteFactorConfirmation from "./DeleteFactorConfirmation";
import AddDecisionModal from "./AddDecisionModal";

const RuleDecisionTable = ({
  ruleSet,
}: {
  ruleSet: IRuleSet;
}): ReactElement => {
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
            {/* <TableHead>
              <TableRow>
                <StyledTableCell align="left">#</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="center">Data type</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {ruleSet.factors.map(
                (ruleFactor: IRuleFactor, ruleFactorIndex: number) => (
                  <StyledTableRow key={ruleFactor.name + ruleFactorIndex}>
                    <StyledTableCell align="left">
                      {ruleFactorIndex + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {ruleFactor.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getLabelText(
                        RULE_FACTOR_TYPE_LABEL,
                        ruleFactor.type as string
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
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
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RuleDecisionTable;
