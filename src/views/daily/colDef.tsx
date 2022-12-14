import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const MIN_WIDTH = 150

const gridCell = (
  { name = "NA", id = 0 }: { name: string; id: number },
  type: string,
  rate?: number
) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      {name}{" "}
      {id !== 0 && (
        <IconButton href={`/admin/${type}/${id}`}>
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
  { field: "id", headerName: "ID", flex: 0.3, minWidth: 0.3 * MIN_WIDTH },
  { field: "date", headerName: "Date", flex: 0.8, minWidth: 0.8 * MIN_WIDTH },
  {
    field: "bill_no",
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
      const material_rate = params.row.material_rate || 0
      const transport_rate = params.row.transport_rate || 0
      const rate = material_rate + transport_rate
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
    field: "material_person",
    headerName: "Material Person",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) =>
      gridCell(
        params.row.material_person || {},
        "person",
        params.row.material_rate
      ),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "transport_person",
    headerName: "Transport Person",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) =>
      gridCell(
        params.row.transport_person || {},
        "person",
        params.row.transport_rate
      ),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "material_rate",
    headerName: "Material Rate",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "transport_rate",
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
  { field: "id", headerName: "ID", flex: 0.3, minWidth: 0.3 * MIN_WIDTH },
  { field: "date", headerName: "Date", flex: 0.8, minWidth: 0.8 * MIN_WIDTH },
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
