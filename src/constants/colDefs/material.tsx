import { Typography } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"

import { MIN_WIDTH, gridCell, gridCellTooltip, renderAmount } from "./base"

const MaterialColDef: GridColDef[] = [
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
    field: "billNo",
    headerName: "Bill No",
    flex: 0.7,
    minWidth: 0.7 * MIN_WIDTH,
  },
  {
    field: "item",
    headerName: "Item",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => (
      <>
        {params.value}
        {params.row.quantity > 1 && (
          <Typography sx={{ ml: 1 }} color="text.secondary">
            x {params.row.quantity}
          </Typography>
        )}
      </>
    ),
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => renderAmount(params.value),
    valueGetter: (params) => {
      const materialRate = params.row.materialRate || 0
      const transportRate = params.row.transportRate || 0
      const rate = materialRate + transportRate
      const quantity = params.row.quantity || 0
      return rate * quantity
    },
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
    field: "materialPerson",
    headerName: "Material Person",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) =>
      gridCell(
        params.row.materialPerson || {},
        "person",
        params.row.materialRate
      ),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "transportPerson",
    headerName: "Transport Person",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) =>
      gridCell(
        params.row.transportPerson || {},
        "person",
        params.row.transportRate
      ),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "materialRate",
    headerName: "Material Rate",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "transportRate",
    headerName: "Transport Rate",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
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

export default MaterialColDef
