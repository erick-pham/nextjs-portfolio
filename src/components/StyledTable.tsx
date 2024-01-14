"use client";
import type { TableCellProps, Theme, TableRowProps } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TableRow } from "@mui/material";
import type { ReactElement } from "react";

export const StyledTableCell = ({
  children,
  ...props
}: TableCellProps): ReactElement => (
  <TableCell
    {...props}
    sx={{
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: (theme: Theme) => theme.palette.common.black,
        color: (theme: Theme) => theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }}
  >
    {children}
  </TableCell>
);

export const StyledTableRow = ({
  children,
  ...props
}: TableRowProps): ReactElement => (
  <TableRow
    {...props}
    sx={{
      "&:nth-of-type(odd)": {
        backgroundColor: (theme: Theme) => theme.palette.action.hover,
      },
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }}
  >
    {children}
  </TableRow>
);
