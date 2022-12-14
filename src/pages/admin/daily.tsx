import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import Head from "next/head"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import moment from "moment"
import { GridColDef } from "@mui/x-data-grid"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

import SidebarLayout from "src/layouts/SidebarLayout"
import PageTitle from "src/components/PageTitle"
import DataGrid from "src/components/DataGrid"

const gridCell = (
  { name = "NA", id = 0 }: { name: string; id: number },
  type: string,
  rate?: number
) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      {name}{" "}
      {id !== 0 && (
        <IconButton sx={{ mx: 1 }} href={`/admin/${type}/${id}`}>
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

const MIN_WIDTH = 150

const DailyExpenses = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const dateSelector = (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box py={3} px={4}>
            <Typography variant="h4">
              {selectedDate.toDateString() === new Date().toDateString()
                ? "Today"
                : moment(selectedDate).format("D MMM")}
              's Expenses
            </Typography>
            <Typography color="text.secondary">
              Here are all expenses of {selectedDate.toDateString()}.
            </Typography>
            <Typography variant="h3" sx={{ pt: 2 }}>
              Total Expenses: ₹54,584.23
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box px={4} py={3}>
            <Typography variant="h5" fontWeight="normal" color="text.secondary">
              If you want to change date, select a date below.
            </Typography>
            <Box pt={2} alignItems="center" justifyContent="center">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} alignContent="center">
                  <DatePicker
                    label="Pick a date"
                    value={selectedDate}
                    onChange={(newDate) => {
                      setSelectedDate(newDate || new Date())
                      // clear existing data
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="text" color="primary" fullWidth>
                    Fetch Data
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )

  // Expense Table Columns
  const expenseColumns: GridColDef[] = [
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

  const expenseRows = [
    {
      id: 1,
      date: "2021-09-01",
      subject: "Food",
      amount: 1000.0,
      person: { name: "Rahul", id: 5 },
      site: { name: "Swiggy", id: 1 },
      remarks: "Food for 2 peop000le",
    },
    {
      id: 2,
      date: "2021-09-01",
      subject: "Food",
      amount: 56500,
      person: { name: "Rahul", id: 55 },
      site: { name: "Swiggy", id: 1 },
      remarks: "Food for 2 people",
    },
    {
      id: 3,
      date: "2021-09-01",
      subject: "Food",
      amount: 14654600,
      site: { name: "Swiggy", id: 1 },
      remarks:
        "Food for 2 peamdsfgijdkaldbgsflkjasbdhufkjadashdkdbfnhvujkbsdsnfdhnbsnaslijdknople",
    },
  ]

  // Material Table Columns
  const materialColumns: GridColDef[] = [
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

  const materialRows = [
    {
      id: 1,
      date: "2017-01-01",
      item: "Sand",
      quantity: 2,
      remarks: "Hello",
      bill_no: "5659",
      site: { name: "Site 1", id: 1 },
      material_person: { name: "Rahul", id: 5 },
      transport_person: { name: "Rahul", id: 5 },
      material_rate: 1000,
      transport_rate: 100,
    },
    {
      id: 2,
      date: "2017-01-01",
      item: "Stone",
      quantity: 1,
      remarks: "Hello All",
      bill_no: "5659s",
      site: { name: "Site 2", id: 2 },
      material_person: { name: "Other Rahul", id: 6 },
      transport_person: { name: "Another Other Rahul", id: 7 },
      material_rate: 1523,
      transport_rate: 170,
    },
  ]

  const expenses = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Expenses
        </Typography>
        <DataGrid
          rows={expenseRows}
          columns={expenseColumns}
          hiddenColumns={["date"]}
        />
      </Box>
    </Card>
  )

  const material = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Material
        </Typography>
        <DataGrid
          rows={materialRows}
          columns={materialColumns}
          hiddenColumns={["date"]}
        />
      </Box>
    </Card>
  )

  return (
    <>
      <Head>
        <title>Daily Expenses</title>
      </Head>
      <PageTitle
        heading="Daily Expenses"
        subHeading="Here are all daily expenses added so far!"
      />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            {dateSelector}
          </Grid>
          <Grid item xs={12}>
            {expenses}
          </Grid>
          <Grid item xs={12}>
            {material}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

DailyExpenses.layout = SidebarLayout

export default DailyExpenses
