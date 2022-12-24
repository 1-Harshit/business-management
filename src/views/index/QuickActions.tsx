import { Box, Button, Card, Grid, Typography } from "@mui/material"

import quickLinks from "src/constants/quickLinks"

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
        {quickLinks.map((link) => (
          <Grid sm item key={link.src}>
            <Button
              fullWidth
              variant={link.variant || "outlined"}
              href={link.src}
            >
              {link.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Card>
)

export default QuickActions
