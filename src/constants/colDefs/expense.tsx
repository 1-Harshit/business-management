import { GridColDef } from "@mui/x-data-grid"

import { MIN_WIDTH, gridCell, gridCellTooltip, renderAmount } from "./base"

const expenseColDef: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    flex: 0.3,
    minWidth: 0.3 * MIN_WIDTH,
    type: "number",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    type: "date",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    type: "date",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 0.8,
    minWidth: 0.8 * MIN_WIDTH,
    type: "date",
  },
  {
    field: "subject",
    headerName: "Subject",
    flex: 1,
    minWidth: MIN_WIDTH,
    type: "string",
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => renderAmount(params.value),
  },
  {
    field: "person",
    headerName: "Person",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.person || {}, "person"),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "site",
    headerName: "Site",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.site || {}, "site"),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "mode",
    headerName: "Mode",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1,
    minWidth: 1.1 * MIN_WIDTH,
    renderCell: (params) => gridCellTooltip(params.value),
  },
]

export default expenseColDef
