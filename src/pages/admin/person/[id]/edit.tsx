import { LoadingButton } from "@mui/lab"
import {
  Card,
  Container,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import Head from "next/head"
import { ChangeEvent, useState } from "react"

import PageTitle from "src/components/PageTitle"
import { Person } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"

const PersonEdit = () => {
  const [values, setValues] = useState<Person>({
    name: "Harshit",
    contact: "7992241",
    address: "Chatra",
    comments: "nothing",
    isActive: true,
  } as Person)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    // console.log(values)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Edit a Person</title>
      </Head>
      <PageTitle
        heading={`Editing data of ${values.name}`}
        subHeading="Add a new Person to the database"
      />
      <Container maxWidth="lg">
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Add a new Person
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "inline",
                textAlign: { xs: "left", md: "right" },
                mb: { xs: 2, md: 0 },
              }}
            >
              <Typography sx={{ display: "inline" }}>
                {values.isActive ? "Active" : "Inactive"} Person
              </Typography>
              <Switch
                checked={values.isActive}
                onChange={(event, checked) => {
                  setValues({
                    ...values,
                    isActive: checked,
                  })
                }}
                name="isActive"
                color="primary"
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleInputChange}
                value={values.name}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleInputChange}
                value={values.address}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Contact"
                name="contact"
                onChange={handleInputChange}
                value={values.contact}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                onChange={handleInputChange}
                value={values.comments}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={4} />
            <Grid item xs={12} md={4}>
              <LoadingButton
                variant="contained"
                fullWidth
                loading={isLoading}
                onClick={handleSubmit}
              >
                Edit Person
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

PersonEdit.layout = SidebarLayout

export default PersonEdit
