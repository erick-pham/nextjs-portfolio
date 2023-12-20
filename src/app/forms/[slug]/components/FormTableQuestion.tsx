"use client";
import type { ReactElement } from "react";
import React from "react";
import Link from "next/link";
import CreateQuestion from "./CreateQuestionModal";
import { getLabelText } from "@/common/utils";
import DeleteQuestionPopconfirm from "./DeleteQuestionPopconfirm.component";
import EditQuestionModal from "./EditQuestionModal";
import { QUESTION_TYPE_LABEL } from "@/common/constants";
import type { IQuestion, IQuestionnaire } from "@/types/questionnaire";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import LaunchIcon from "@mui/icons-material/Launch";
import type { Theme } from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { formatDate } from "@/util/date";

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }: { theme: Theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FormTableQuestion = ({
  questionnaire,
}: {
  questionnaire: IQuestionnaire;
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
          <CreateQuestion questionnaire={questionnaire} />
          <Link href={`/forms-submission/${questionnaire.id}`} target="_blank">
            <Button
              size="small"
              startIcon={<LaunchIcon />}
              color="info"
              variant="contained"
            >
              View Form
            </Button>
          </Link>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">#</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Question Type</StyledTableCell>
                <StyledTableCell align="center">Last Update</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionnaire.questions.map((question: IQuestion) => (
                <StyledTableRow key={question.id}>
                  <StyledTableCell align="left">{question.id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {question.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {getLabelText(
                      QUESTION_TYPE_LABEL,
                      question.questionType as string
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(question.updatedAt)}
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
                      <EditQuestionModal question={question as IQuestion} />

                      <DeleteQuestionPopconfirm
                        questionnaireId={questionnaire.id}
                        questionId={question.id}
                      />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default FormTableQuestion;
