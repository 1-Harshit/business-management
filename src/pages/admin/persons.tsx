import { Card, Container, Typography } from "@mui/material"
import Head from "next/head"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import personsColDefs from "src/constants/colDefs/persons"
import SidebarLayout from "src/layouts/SidebarLayout"

const personRows = [
  {
    id: 1,
    name: "Mukesh Kumar",
    address: "Chatra",
    contact: "95321459621",
    createdAt: "2021-09-01",
    comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    is_active: true,
  },
]

const Persons = () => {
  const x = "sdf"
  return (
    <>
      <Head>
        <title>Persons</title>
      </Head>
      <PageTitle
        heading="Persons"
        subHeading="Add, edit, delete and view each person ledger"
        sideText="Add new person"
        sideTextLink="/admin/person/new"
      />
      <Container>
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Persons
          </Typography>
          <DataGrid columns={personsColDefs} rows={personRows} />
        </Card>
      </Container>
    </>
  )
}

Persons.layout = SidebarLayout

export default Persons
