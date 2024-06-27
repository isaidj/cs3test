import {
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
  tableRowClasses,
} from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#111618",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
    "border-bottom": "1px solid rgb(47, 55, 75)",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}`]: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& button": {
    color: theme.palette.common.white,
  },
  "& button:disabled": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  "& select": {
    color: theme.palette.common.white,
  },
}));
