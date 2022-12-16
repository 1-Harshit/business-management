import { LoadingButton } from "@mui/lab"
import { Card, Container, Grid, TextField, Typography } from "@mui/material"
import Head from "next/head"
import { ChangeEvent, useState } from "react"

import PageTitle from "src/components/PageTitle"
import SidebarLayout from "src/layouts/SidebarLayout"

const PersonNew = () => {
  const [values, setValues] = useState({
    name: "",
    contact: "",
    address: "",
    comments: "",
    isActive: false,
    isLoading: false,
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    setValues({
      ...values,
      isLoading: true,
    })
    // console.log(values)
    setTimeout(() => {
      setValues({
        ...values,
        isLoading: false,
      })
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Add a new Person</title>
      </Head>
      <PageTitle
        heading="Add a new Person"
        subHeading="Add a new Person to the database"
      />
      <Container maxWidth="lg">
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Add a new Person
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleInputChange}
                value={values.name}
                disabled={values.isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleInputChange}
                value={values.address}
                disabled={values.isLoading}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Contact"
                name="contact"
                onChange={handleInputChange}
                value={values.contact}
                disabled={values.isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                onChange={handleInputChange}
                value={values.comments}
                disabled={values.isLoading}
              />
            </Grid>
            <Grid item xs={12} md={4} />
            <Grid item xs={12} md={4}>
              <LoadingButton
                variant="contained"
                fullWidth
                loading={values.isLoading}
                onClick={handleSubmit}
              >
                Add Person
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

PersonNew.layout = SidebarLayout

export default PersonNew
