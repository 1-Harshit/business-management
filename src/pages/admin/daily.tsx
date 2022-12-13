import { Container, Grid } from "@mui/material"
import Head from "next/head"

import SidebarLayout from "src/layouts/SidebarLayout"
import QuickActions from "src/views/index/QuickActions"
import PageTitle from "src/components/PageTitle"

const DailyExpenses = () => {
  const date = "Today"
  return (
    <>
      <Head>
        <title>Daily Expenses</title>
      </Head>
      <PageTitle
        heading="Daily Expenses"
        subHeading="Here are all daily expenses added so far!"
      />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <QuickActions />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

DailyExpenses.layout = SidebarLayout

export default DailyExpenses
