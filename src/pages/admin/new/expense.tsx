import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import Head from "next/head"
import { ChangeEvent, WheelEvent, useState } from "react"

import PageTitle from "src/components/PageTitle"
import SidebarLayout from "src/layouts/SidebarLayout"

const sites = [
  { name: "Swiggy", id: 1 },
  { name: "Zomato", id: 2 },
  { name: "Uber Eats", id: 3 },
  { name: "Food Panda", id: 4 },
]

const persons = [
  { name: "Rahul", id: 1, contact: "1234567890" },
  { name: "Shubham", id: 2, contact: "1234567890" },
  { name: "Rohit", id: 3, contact: "1234567890" },
  { name: "Somya", id: 4, contact: "1234567890" },
]

const NewExpense = () => {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSite, setSelectedSite] = useState({ name: "", id: 0 })
  const [selectedPerson, setSelectedPerson] = useState({
    name: "",
    id: 0,
    contact: "",
  })
  const [values, setValues] = useState({
    subject: "",
    amount: null,
    remarks: "",
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newValue = name === "amount" ? Number(value) : value
    setValues({
      ...values,
      [name]: newValue,
    })
  }

  const handleWheel = (e: WheelEvent<HTMLDivElement>) =>
    (e.target as EventTarget & HTMLDivElement).blur()

  const handleAddExpense = () => {
    setLoading(true)
    // console.log(selectedDate)
    // console.log(selectedSite)
    // console.log(selectedPerson)
    // console.log(values)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>New Expense</title>
      </Head>
      <PageTitle
        heading="New Expense"
        subHeading="Add a new Expense to the database"
        sideText="Add a new material"
        sideTextLink="/admin/new/material"
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
            <Card>
              <Box px={4} py={3}>
                <Typography variant="h4">Add a new expense</Typography>
                <Grid container spacing={2} my={1}>
                  <Grid item xs={12} md={4}>
                    <DateTimePicker
                      disabled={loading}
                      label="Pick a date"
                      value={selectedDate}
                      onChange={(newDate) => {
                        setSelectedDate(newDate || new Date())
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Expense Subject"
                      name="subject"
                      onChange={handleInputChange}
                      value={values.subject}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Expense Amount (in ₹)"
                      name="amount"
                      onChange={handleInputChange}
                      value={values.amount}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Remarks"
                      name="remarks"
                      onChange={handleInputChange}
                      value={values.remarks}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      disablePortal
                      disabled={loading}
                      id="site"
                      options={sites}
                      getOptionLabel={(option) => option.name}
                      value={selectedSite}
                      onChange={(event, value, reason) =>
                        setSelectedSite(value || { name: "", id: 0 })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Site"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Autocomplete
                      disablePortal
                      disabled={loading}
                      id="person"
                      options={persons}
                      getOptionLabel={(option) =>
                        `${option.name} | ${option.contact}`
                      }
                      value={selectedPerson}
                      onChange={(event, value, reason) =>
                        setSelectedPerson(
                          value || { name: "", id: 0, contact: "" }
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Person"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} />
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                      onClick={handleAddExpense}
                    >
                      Add Expense
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={4} />
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

NewExpense.layout = SidebarLayout

export default NewExpense
