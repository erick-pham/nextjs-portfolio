import type { ReactElement } from "react";

import type { PageProps } from "@/types/base";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/16/solid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Link from "next/link";
import type { Metadata } from "next";
import CreateRuleSet from "./components/CreateRuleSet.component";
import type { IRuleSet } from "@/types/rule";
import { formatDate } from "@/util/date";
import { StyledTableCell, StyledTableRow } from "@/components/StyledTable";
import { getListRule } from "@/lib/rules.api";

export const metadata: Metadata = {
  title: "ErickApp Rules",
};

const RulePage = async ({ searchParams }: PageProps): Promise<ReactElement> => {
  const listRules = await getListRule(searchParams);

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
              <Typography variant="h4">Rules</Typography>
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
            <CreateRuleSet />
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">#</StyledTableCell>
                          <StyledTableCell align="left">Name</StyledTableCell>
                          <StyledTableCell align="center">
                            Last Update
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listRules.data.map((ruleSet: IRuleSet) => (
                          <StyledTableRow key={ruleSet.id}>
                            <StyledTableCell align="left">
                              {ruleSet.id}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {ruleSet.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {formatDate(ruleSet.updatedAt)}
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
                                <Link href={`/rules/${ruleSet.id}`}>
                                  <Button
                                    title="Edit"
                                    size="small"
                                    startIcon={<ModeEditIcon />}
                                  >
                                    View
                                  </Button>
                                </Link>

                                {/* <DeleteQuestionPopconfirm
                          questionnaireId={questionnaire.id}
                          questionId={question.id}
                        /> */}
                              </Box>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination count={3} size="small" />
          </Box> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default RulePage;
