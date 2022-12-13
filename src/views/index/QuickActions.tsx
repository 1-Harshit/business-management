import { Box, Button, Card, Grid, Typography } from "@mui/material"

const QuickActions = () => (
  <Card>
    <Box p={4}>
      <Typography
        sx={{
          pb: 3,
        }}
        variant="h4"
      >
        Quick Links
      </Typography>
      <Grid container spacing={3} pb={3}>
        <Grid sm item>
          <Button fullWidth variant="text">
            Link 1
          </Button>
        </Grid>
        <Grid sm item>
          <Button fullWidth variant="outlined">
            Link 3
          </Button>
        </Grid>
        <Grid sm item>
          <Button fullWidth variant="contained">
            Link 4
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
)

export default QuickActions
