import { Box, Card, Container, Grid, Typography } from "@mui/material"
import Head from "next/head"
import { useState } from "react"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"
import { Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import SiteDetails from "src/views/SiteDetails"

const SiteIndex = () => {
  const [values, setValues] = useState<Site>({
    name: "Multipurpose Hall",
    isActive: true,
  } as Site)

  const expenses = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Expenses
        </Typography>
        <DataGrid
          rows={[]}
          columns={expenseColDef}
          hiddenColumns={["createdAt", "updatedAt", "site"]}
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
            "site",
          ]}
        />
      </Box>
    </Card>
  )

  return (
    <>
      <Head>
        <title>Site wise Ledger</title>
      </Head>
      <PageTitle
        heading={`Ledger of the ${values.name} Construction Site`}
        subHeading="Find all the transaction recorded to this site"
        sideText="Edit details"
        sideTextLink={`/admin/site/${values.ID}/edit`}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SiteDetails site={values} />
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

SiteIndex.layout = SidebarLayout

export default SiteIndex
