import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import Head from "next/head"
import { ChangeEvent, WheelEvent, useState } from "react"

import PageTitle from "src/components/PageTitle"
import { Expense, Person, Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"

const sites: Site[] = [
  { name: "Swiggy", ID: 1 },
  { name: "Zomato", ID: 2 },
  { name: "Uber Eats", ID: 3 },
  { name: "Food Panda", ID: 4 },
] as Site[]

const persons: Person[] = [
  { name: "Rahul", ID: 1, contact: "1234567890" },
  { name: "Shubham", ID: 2, contact: "1234567890" },
  { name: "Rohit", ID: 3, contact: "1234567890" },
  { name: "Somya", ID: 4, contact: "1234567890" },
] as Person[]

const NewExpense = () => {
  const [loading, setLoading] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSite, setSelectedSite] = useState<Site>({} as Site)
  const [selectedPerson, setSelectedPerson] = useState<Person>({} as Person)
  const [values, setValues] = useState<Expense>({
    mode: "Cash",
  } as Expense)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newValue = name === "amount" ? Number(value) : value
    setValues({
      ...values,
      [name]: newValue,
    })
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setValues({
      ...values,
      mode: event.target.value as string,
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
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Expense Subject"
                      name="subject"
                      onChange={handleInputChange}
                      value={values.subject}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/* DROP DOWN WITH DEFAULT "CASH" */}
                    <FormControl fullWidth>
                      <InputLabel htmlFor="payment-mode">
                        Payment Mode
                      </InputLabel>
                      <Select
                        id="payment-mode"
                        value={values.mode}
                        onChange={handleSelectChange}
                        name="mode"
                        label="Payemnt Mode"
                      >
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="UPI">UPI</MenuItem>
                        <MenuItem value="INB">INB</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
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
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      disablePortal
                      disabled={loading}
                      id="site"
                      options={sites}
                      getOptionLabel={(option) => option.name || ""}
                      value={selectedSite}
                      onChange={(event, value, reason) =>
                        setSelectedSite(value || ({} as Site))
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Site" />
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
                        option.name ? `${option.name} | ${option.contact}` : ""
                      }
                      value={selectedPerson}
                      onChange={(event, value, reason) =>
                        setSelectedPerson(value || ({} as Person))
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Person" />
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
