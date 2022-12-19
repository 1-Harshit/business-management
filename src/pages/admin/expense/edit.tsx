import { ArrowBack, Delete, RestartAlt, Save } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { ChangeEvent, WheelEvent, useState } from "react"

import PageTitle from "src/components/PageTitle"
import { Entity, Expense, Person, Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getExpense } from "src/lib/api/expense"
import { getActivePersons } from "src/lib/api/person"
import { getActiveSites } from "src/lib/api/site"
import numWords from "src/lib/words"

interface NewExpenseProps {
  sites: Site[]
  persons: Person[]
  expense: Expense
}

const ExpenseEdit = ({ sites, persons, expense }: NewExpenseProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [values, setValues] = useState<Expense>(expense as Expense)

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

  const handleDateChange = (newDate: Date | null) => {
    if (!newDate) return
    setValues({
      ...values,
      date: newDate,
    })
  }

  const handleWheel = (e: WheelEvent<HTMLDivElement>) =>
    (e.target as EventTarget & HTMLDivElement).blur()

  const handleUpdateExpense = async () => {
    setIsLoading(true)

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
    const res = await fetch("/api/expense", requestOptions)

    if (res.status === 200) {
      setValues({
        ...values,
        _id: (await res.json())._id,
      })
      setReadOnly(true)
    }
    setIsLoading(false)
  }

  const handleDeleteExpense = async () => {
    setReadOnly(true)
    setIsLoading(true)

    const requestOptions = {
      method: "DELETE",
    }

    const res = await fetch(`/api/expense?id=${values._id}`, requestOptions)

    if (res.status === 200) {
      window.location.href = "/admin"
    }
    setIsLoading(false)
  }

  const props = {
    fullWidth: true,
    onChange: handleInputChange,
    disabled: isLoading,
    inputProps: {
      readOnly,
    },
  }

  return (
    <>
      <Head>
        <title>New Expense</title>
      </Head>
      <PageTitle
        heading="Edit Expense"
        subHeading="Edit a new Expense from database"
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
                <Typography variant="h4">Edit a new expense</Typography>
                <Grid container spacing={2} my={1}>
                  <Grid item xs={12} md={4}>
                    <DateTimePicker
                      disabled={isLoading}
                      readOnly={readOnly}
                      label="Date of Expense"
                      value={values.date}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Expense Subject"
                      name="subject"
                      value={values.subject}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="payment-mode">
                        Payment Mode
                      </InputLabel>
                      <Select
                        disabled={isLoading}
                        readOnly={readOnly}
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
                      label="Expense Amount (in ₹)"
                      name="amount"
                      value={values.amount}
                      helperText={numWords(values.amount)}
                      {...props}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      label="Remarks"
                      name="remarks"
                      value={values.remarks}
                      multiline
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      disablePortal
                      disabled={isLoading}
                      readOnly={readOnly}
                      id="site"
                      options={sites}
                      getOptionLabel={(option) => option.name}
                      value={values.site as unknown as Site}
                      onChange={(e, value, r) =>
                        setValues({
                          ...values,
                          site: value as unknown as Entity,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Site" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Autocomplete
                      disablePortal
                      disabled={isLoading}
                      readOnly={readOnly}
                      id="person"
                      options={persons}
                      getOptionLabel={(option) =>
                        option.name ? `${option.name} | ${option.contact}` : ""
                      }
                      value={values.person as unknown as Person}
                      onChange={(e, value, r) =>
                        setValues({
                          ...values,
                          person: value as unknown as Entity,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Person" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {readOnly && (
                      <Button
                        fullWidth
                        variant="contained"
                        href="/admin/expense/new"
                        startIcon={<RestartAlt />}
                      >
                        Add another
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {readOnly ? (
                      <TextField
                        label="Person ID"
                        name="_id"
                        value={values._id}
                        {...props}
                      />
                    ) : (
                      <LoadingButton
                        fullWidth
                        variant="contained"
                        onClick={handleUpdateExpense}
                        loading={isLoading}
                        loadingPosition="start"
                        startIcon={<Save />}
                      >
                        Update Expense
                      </LoadingButton>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      onClick={handleDeleteExpense}
                      startIcon={<Delete />}
                      fullWidth
                      variant="outlined"
                    >
                      Delete Expense
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

ExpenseEdit.layout = SidebarLayout

const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const activeSites = await getActiveSites()
  const sites = JSON.parse(JSON.stringify(activeSites))
  const activePersons = await getActivePersons()
  const persons = JSON.parse(JSON.stringify(activePersons))

  if (activeSites.length === 0 && activePersons.length === 0) {
    return {
      notFound: true,
    }
  }

  const id = query.id as string
  if (!id) return { notFound: true }

  const result = await getExpense(id)
  if (!result) return { notFound: true }

  const expense = JSON.parse(JSON.stringify(result))

  return {
    props: {
      sites,
      persons,
      expense,
    },
  }
}

export { getServerSideProps }
export default ExpenseEdit
