import { Container, Grid } from "@mui/material"
import Head from "next/head"

import DailyExpenses from "src/views/index/DailyExpenses"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import PageHeader from "src/views/index/PageHeader"
import SidebarLayout from "src/layouts/SidebarLayout"
import QuickActions from "src/views/index/QuickActions"

const AdminIndex = () => (
  <>
    <Head>
      <title>Overview</title>
    </Head>
    <PageTitleWrapper>
      <PageHeader />
    </PageTitleWrapper>
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <DailyExpenses />
        </Grid>
        <Grid item xs={12}>
          <QuickActions />
        </Grid>
      </Grid>
    </Container>
  </>
)

AdminIndex.layout = SidebarLayout

export default AdminIndex
