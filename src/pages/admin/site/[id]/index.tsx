import { Box, Card, Container, Grid, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useState } from "react"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"
import { Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getSite } from "src/lib/api/site"
import SiteDetails from "src/views/SiteDetails"

interface SiteIndexProps {
  site: Site
}

const SiteIndex = ({ site }: SiteIndexProps) => {
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
        heading={`Ledger of the ${site.name} Construction Site`}
        subHeading="Find all the transaction recorded to this site"
        sideText="Edit details"
        sideTextLink={`/admin/site/${site._id}/edit`}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SiteDetails site={site} />
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

export const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const id = query.id as string
  const result = await getSite(id)
  if (result === null) {
    return {
      notFound: true,
    }
  }

  const site = JSON.parse(JSON.stringify(result))
  return {
    props: {
      site,
    },
  }
}

export default SiteIndex
