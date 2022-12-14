import { Box, Button, Card, Container, Grid, Typography } from "@mui/material"
import Head from "next/head"

import PageTitle from "src/components/PageTitle"
import SidebarLayout from "src/layouts/SidebarLayout"
import QuickActions from "src/views/index/QuickActions"

const NewIndex = () => (
  <>
    <Head>
      <title>New Expense</title>
    </Head>
    <PageTitle
      heading="New Entry"
      subHeading="Add a new entry to the database"
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
          <Card>
            <Box px={4} py={3}>
              <Typography variant="h4">Add a new entry</Typography>
              <Grid container spacing={2} my={1}>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    href="/admin/new/expense"
                    fullWidth
                  >
                    Add Expense
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    href="/admin/new/material"
                    fullWidth
                  >
                    Add Material
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    href="/admin/person/new"
                    fullWidth
                  >
                    Add New Person
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="contained" href="/admin/site/new" fullWidth>
                    Add New Site
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <QuickActions />
        </Grid>
      </Grid>
    </Container>
  </>
)

NewIndex.layout = SidebarLayout

export default NewIndex
