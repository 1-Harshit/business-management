import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { useState } from "react"

interface DataGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  columns: GridColDef[]
}

const CustomDataGrid = ({ rows, columns }: DataGridProps) => {
  const [pageSize, setPageSize] = useState(25)

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      initialState={{ columns: { columnVisibilityModel: { date: false } } }}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      disableDensitySelector
      disableColumnFilter
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 25, 50, 100]}
    />
  )
}

export default CustomDataGrid
