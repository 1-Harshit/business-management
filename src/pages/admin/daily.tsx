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
import { Expense, Material } from "src/constants/models"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"

const expenseRows = [] as Expense[]

const materialRows = [] as Material[]

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
          columns={expenseColDef}
          hiddenColumns={["createdAt", "updatedAt", "date"]}
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
          columns={MaterialColDef}
          hiddenColumns={[
            "createdAt",
            "updatedAt",
            "date",
            "transportRate",
            "materialRate",
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
