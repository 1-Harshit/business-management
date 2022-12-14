import { Card, Container, Typography } from "@mui/material"
import Head from "next/head"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import siteColDefs from "src/constants/colDefs/sites"
import SidebarLayout from "src/layouts/SidebarLayout"

const siteRows = [
  {
    id: 1,
    name: "Multipurpose Hall",
    address: "Chatra",
    start_date: "2021-09-01",
    end_date: "2021-09-01",
    comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    is_active: true,
  },
]

const Sites = () => {
  const x = "sdf"
  return (
    <>
      <Head>
        <title>Sites</title>
      </Head>
      <PageTitle
        heading="Sites"
        subHeading="Add, edit, delete and view each site ledger"
        sideText="Add new site"
        sideTextLink="/admin/site/new"
      />
      <Container>
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sites
          </Typography>
          <DataGrid columns={siteColDefs} rows={siteRows} />
        </Card>
      </Container>
    </>
  )
}

Sites.layout = SidebarLayout

export default Sites
