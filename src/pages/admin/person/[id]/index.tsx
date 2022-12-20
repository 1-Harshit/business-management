import { Box, Card, Container, Grid, Typography } from "@mui/material"
import Head from "next/head"
import { GetServerSidePropsContext } from "next"

import PageTitle from "src/components/PageTitle"
import { Expense, Material, Person } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import PersonDetails from "src/views/PersonDetails"
import DataGrid from "src/components/DataGrid"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"
import { getPerson } from "src/lib/api/person"
import { getExpensesByPerson } from "src/lib/api/expense"
import {
  getMaterialsByPerson,
  getMaterialsByShipper,
} from "src/lib/api/material"
import { materialColDefPerson } from "src/constants/colDefs/material"

interface PersonIndexProps {
  person: Person
  expenses: Expense[]
  shippedMaterials: Material[]
  ownedMaterials: Material[]
}

const PersonIndex = ({
  person,
  expenses,
  shippedMaterials,
  ownedMaterials,
}: PersonIndexProps) => {
  const expensesDatagrid = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Expenses
        </Typography>
        <DataGrid
          rows={expenses}
          columns={expenseColDef}
          hiddenColumns={["person"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Expenses: ₹
          {expenses.reduce((a, b) => a + b.amount, 0).toLocaleString()}
        </Typography>
      </Box>
    </Card>
  )

  const ownedMaterialsDatarid = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Material Sold
        </Typography>
        <DataGrid
          rows={ownedMaterials}
          columns={materialColDefPerson}
          hiddenColumns={["shippingRate", "quantity", "materialPerson"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Amount: ₹
          {ownedMaterials
            .reduce((a, b) => a + b.materialRate * b.quantity, 0)
            .toLocaleString()}
        </Typography>
      </Box>
    </Card>
  )

  const shippedMaterialsDatarid = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Material Shipped
        </Typography>
        <DataGrid
          rows={shippedMaterials}
          columns={materialColDefPerson}
          hiddenColumns={["materialRate", "quantity", "shippingPerson"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Amount: ₹
          {shippedMaterials
            .reduce((a, b) => a + b.shippingRate * b.quantity, 0)
            .toLocaleString()}
        </Typography>
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
            {expensesDatagrid}
          </Grid>
          <Grid item xs={12}>
            {ownedMaterialsDatarid}
          </Grid>
          <Grid item xs={12}>
            {shippedMaterialsDatarid}
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

  const expResult = getExpensesByPerson(id)
  const shipResult = getMaterialsByShipper(id)
  const ownResult = getMaterialsByPerson(id)

  const person = JSON.parse(JSON.stringify(result))
  const expenses = JSON.parse(JSON.stringify((await expResult) || []))
  const shippedMaterials = JSON.parse(JSON.stringify((await shipResult) || []))
  const ownedMaterials = JSON.parse(JSON.stringify((await ownResult) || []))

  return {
    props: {
      person,
      expenses,
      shippedMaterials,
      ownedMaterials,
    },
  }
}

export default PersonIndex
