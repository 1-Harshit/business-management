import { Box, Card, Container, Grid, Typography } from "@mui/material"
import Head from "next/head"
import { useState } from "react"

import PageTitle from "src/components/PageTitle"
import { Person } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import PersonDetails from "src/views/PersonDetails"
import DataGrid from "src/components/DataGrid"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"

const PersonEdit = () => {
  const [values, setValues] = useState<Person>({
    name: "Harshit",
    contact: "7992241",
    address: "Chatra",
    comments: "nothing",
    isActive: true,
  } as Person)

  const expenses = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Expenses
        </Typography>
        <DataGrid
          rows={[]}
          columns={expenseColDef}
          hiddenColumns={["createdAt", "updatedAt", "person"]}
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
          rows={[]}
          columns={MaterialColDef}
          hiddenColumns={[
            "createdAt",
            "updatedAt",
            "transportRate",
            "materialRate",
            "quantity",
            "transportPerson",
            "materialPerson",
          ]}
        />
      </Box>
    </Card>
  )

  return (
    <>
      <Head>
        <title>Person Wise Ledger</title>
      </Head>
      <PageTitle
        heading={`Viewing Ledger of ${values.name}`}
        subHeading="Find all the transaction recorded to this person"
        sideText="Edit details"
        sideTextLink={`/admin/person/${values.ID}/edit`}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PersonDetails person={values} />
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

PersonEdit.layout = SidebarLayout

export default PersonEdit
