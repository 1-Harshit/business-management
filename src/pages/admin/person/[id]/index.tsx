import { Box, Card, Container, Grid, Typography } from "@mui/material"
import Head from "next/head"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"

import PageTitle from "src/components/PageTitle"
import { Person } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import PersonDetails from "src/views/PersonDetails"
import DataGrid from "src/components/DataGrid"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"
import { getPerson } from "src/lib/api/person"

interface PersonIndexProps {
  person: Person
}

const PersonIndex = ({ person }: PersonIndexProps) => {
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
        heading={`Viewing Ledger of ${person.name}`}
        subHeading="Find all the transaction recorded to this person"
        sideText="Edit details"
        sideTextLink={`/admin/person/${person._id}/edit`}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PersonDetails person={person} />
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

PersonIndex.layout = SidebarLayout

export const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const id = query.id as string
  const result = await getPerson(id)
  if (result === null) {
    return {
      notFound: true,
    }
  }

  const person = JSON.parse(JSON.stringify(result))
  return {
    props: {
      person,
    },
  }
}

export default PersonIndex
