import { Check, Close } from "@mui/icons-material"
import { Button, Tooltip, Typography } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"

const MIN_WIDTH = 150

const personsColDefs: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.3, minWidth: 0.3 * MIN_WIDTH },
  { field: "name", headerName: "Name", flex: 1, minWidth: MIN_WIDTH },
  {
    field: "address",
    headerName: "Address",
    flex: 1.25,
    minWidth: 1.25 * MIN_WIDTH,
  },
  { field: "contact", headerName: "Contact", flex: 1, minWidth: MIN_WIDTH },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    minWidth: MIN_WIDTH,
    type: "date",
  },
  {
    field: "comments",
    headerName: "Comments",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography>
          {params.value.substr(0, 20)}
          {params.value.length > 20 && "..."}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "is_active",
    headerName: "Active",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => (params.value ? <Check /> : <Close />),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => (
      <Button fullWidth href={`/admin/person/${params.id}`}>
        View
      </Button>
    ),
  },
]

export default personsColDefs
