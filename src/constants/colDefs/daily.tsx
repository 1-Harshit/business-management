import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const MIN_WIDTH = 150

const gridCell = (
  { name = "NA", ID = 0 }: { name: string; ID: number },
  type: string,
  rate?: number
) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      {name}{" "}
      {ID !== 0 && (
        <IconButton href={`/admin/${type}/${ID}`}>
          <OpenInNewIcon sx={{ fontSize: 13 }} color="disabled" />
        </IconButton>
      )}
    </Grid>
    {rate && (
      <Grid item xs={12}>
        <Typography variant="caption" color="text.secondary">
          @₹
          {Number(rate).toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
          })}
        </Typography>
      </Grid>
    )}
  </Grid>
)
// Material Table Columns
const dailyMaterialColumns: GridColDef[] = [
  { field: "ID", headerName: "ID", flex: 0.3, minWidth: 0.3 * MIN_WIDTH },
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
          <Typography sx={{ mx: 1 }} color="text.secondary">
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
    renderCell: (params) =>
      `₹${Number(params.value).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      })}`,
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
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography>
          {params.value.substr(0, 20)}
          {params.value.length > 20 && "..."}
        </Typography>
      </Tooltip>
    ),
  },
]

// Expense Table Columns
const dailyExpenseColumns: GridColDef[] = [
  { field: "ID", headerName: "ID", flex: 0.3, minWidth: 0.3 * MIN_WIDTH },
  {
    field: "date",
    headerName: "Date",
    flex: 0.8,
    minWidth: 0.8 * MIN_WIDTH,
    type: "date",
  },
  { field: "subject", headerName: "Subject", flex: 1, minWidth: MIN_WIDTH },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) =>
      `₹${Number(params.value).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      })}`,
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
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography>
          {params.value.substr(0, 20)}
          {params.value.length > 20 && "..."}
        </Typography>
      </Tooltip>
    ),
  },
]

export { dailyMaterialColumns, dailyExpenseColumns }
