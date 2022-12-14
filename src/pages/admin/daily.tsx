import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import Head from "next/head"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import moment from "moment"

import SidebarLayout from "src/layouts/SidebarLayout"
import PageTitle from "src/components/PageTitle"
import DataGrid from "src/components/DataGrid"
import {
  dailyExpenseColumns,
  dailyMaterialColumns,
} from "src/constants/colDefs/daily"

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

// MAIN COMPONENT
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

  const expenses = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Expenses
        </Typography>
        <DataGrid
          rows={expenseRows}
          columns={dailyExpenseColumns}
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
          columns={dailyMaterialColumns}
          hiddenColumns={[
            "date",
            "transport_rate",
            "material_rate",
            "quantity",
          ]}
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
