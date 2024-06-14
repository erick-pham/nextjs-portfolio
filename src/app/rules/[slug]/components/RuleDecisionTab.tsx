"use client";
import { useState, Fragment, type ReactElement } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type {
  IAddRuleDecision,
  IDecision,
  IRule,
  IRuleSet,
} from "@/types/rule";
import { DeleteOutlined } from "@mui/icons-material";
import AddDecisionModal from "./AddDecisionModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const RuleDecisionRow = ({
  ruleDecisionRowData,
}: {
  ruleDecisionRowData: IAddRuleDecision;
}): ReactElement => {
  const [open, setOpen] = useState(false);

  const handleConfirmationDeleteDecision = (): void => {
    console.log("handleConfirmationDeleteDecision");
  };

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{ruleDecisionRowData.decisionName}</TableCell>
        <TableCell align="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
            gap={2}
          >
            <ConfirmationDialog
              title="Confirmation"
              description="Are you sure you want to proceed?"
              handleClickOk={handleConfirmationDeleteDecision}
            >
              {(showConfirmationDialog: () => void) => (
                <IconButton color="error" onClick={showConfirmationDialog}>
                  <DeleteOutlined />
                </IconButton>
              )}
            </ConfirmationDialog>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box sx={{ width: "100%", mt: 3 }}>
                <Typography
                  sx={{ flex: "1 1 100%", m: 1 }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  Rules
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" width={"5%"}>
                        #
                      </TableCell>
                      <TableCell align="center" width={"30%"}>
                        Factor
                      </TableCell>
                      <TableCell align="center" width={"30%"}>
                        Operator
                      </TableCell>
                      <TableCell align="center" width={"30%"}>
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ruleDecisionRowData.rules.map(
                      (ruleItem: IRule, index: number): ReactElement => (
                        <TableRow
                          key={index + 1}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="center">
                            {ruleItem.factor}
                          </TableCell>
                          <TableCell align="center">
                            {ruleItem.operator}
                          </TableCell>
                          <TableCell align="center">{ruleItem.value}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ width: "100%", mt: 3 }}>
                <Typography
                  sx={{ flex: "1 1 100%", m: 1 }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  Output Parameters
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" width={"5%"}>
                        #
                      </TableCell>
                      <TableCell align="center" width={"45%"}>
                        Param
                      </TableCell>
                      <TableCell align="center" width={"45%"}>
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ruleDecisionRowData.decisions.map(
                      (
                        decisionItem: IDecision,
                        index: number
                      ): ReactElement => (
                        <TableRow
                          key={index + 1}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="center">
                            {decisionItem.param}
                          </TableCell>
                          <TableCell align="center">
                            {decisionItem.value}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ruleSet.decisions.map(
                (decisionItem: IAddRuleDecision, decisionIndex: number) => (
                  <RuleDecisionRow
                    key={decisionItem.decisionName + decisionIndex}
                    ruleDecisionRowData={decisionItem}
                  />
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
