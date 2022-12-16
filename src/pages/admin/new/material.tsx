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

const NewMaterial = () => {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSite, setSelectedSite] = useState({ name: "", id: 0 })
  const [selectedMaterialPerson, setSelectedMaterialPerson] = useState({
    name: "",
    id: 0,
    contact: "",
  })
  const [selectedTransportPerson, setSelectedTransportPerson] = useState({
    name: "",
    id: 0,
    contact: "",
  })
  const [values, setValues] = useState({
    item: "",
    bill_no: "",
    quantity: 1,
    material_rate: null,
    transport_rate: null,
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
        <title>New Material</title>
      </Head>
      <PageTitle
        heading="New Material"
        subHeading="Add a new Material to the database"
        sideText="Add a new Expense"
        sideTextLink="/admin/new/expense"
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
                <Typography variant="h4">Add a new material</Typography>
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
                      label="Material Name"
                      name="item"
                      onChange={handleInputChange}
                      value={values.item}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Bill No."
                      name="bill_no"
                      onChange={handleInputChange}
                      value={values.bill_no}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Quantity"
                      name="quantity"
                      onChange={handleInputChange}
                      value={values.quantity}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Material Rate (in ₹)"
                      name="material_rate"
                      onChange={handleInputChange}
                      value={values.material_rate}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Transport Rate (in ₹)"
                      name="transport_rate"
                      onChange={handleInputChange}
                      value={values.transport_rate}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      disabled={loading}
                      id="material_person"
                      options={persons}
                      getOptionLabel={(option) => option.name}
                      value={selectedMaterialPerson}
                      onChange={(event, value, reason) =>
                        setSelectedMaterialPerson(
                          value || { name: "", id: 0, contact: "" }
                        )
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Material Person" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      disabled={loading}
                      id="transport_person"
                      options={persons}
                      getOptionLabel={(option) => option.name}
                      value={selectedTransportPerson}
                      onChange={(event, value, reason) =>
                        setSelectedTransportPerson(
                          value || { name: "", id: 0, contact: "" }
                        )
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Transport Person" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                        <TextField {...params} label="Site" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      disabled={loading}
                      label="Remarks"
                      name="remarks"
                      onChange={handleInputChange}
                      value={values.remarks}
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
                      Add Material
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

NewMaterial.layout = SidebarLayout

export default NewMaterial
