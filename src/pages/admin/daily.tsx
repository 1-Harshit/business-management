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
  type: string
) => (
  <>
    {name}{" "}
    {id !== 0 && (
      <IconButton sx={{ mx: 1 }} href={`/admin/${type}/${id}`}>
        <OpenInNewIcon sx={{ fontSize: 13 }} color="disabled" />
      </IconButton>
    )}
  </>
)

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
  const expenseColumns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "date", headerName: "Date", flex: 0.8 },
    { field: "subject", headerName: "Subject", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
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
      renderCell: (params) => gridCell(params.row.person || {}, "person"),
      valueGetter: (params) => params.value?.name || "NA",
    },
    {
      field: "site",
      headerName: "Site",
      flex: 1,
      renderCell: (params) => gridCell(params.row.site || {}, "site"),
      valueGetter: (params) => params.value?.name || "NA",
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
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

  const expenses = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Expenses
        </Typography>
        <DataGrid rows={expenseRows} columns={expenseColumns} />
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
        </Grid>
      </Container>
    </>
  )
}

DailyExpenses.layout = SidebarLayout

export default DailyExpenses
