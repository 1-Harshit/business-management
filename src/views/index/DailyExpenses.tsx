import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material"
import dynamic from "next/dynamic"
import type { ApexOptions } from "apexcharts"
import { useEffect, useState } from "react"

import Text from "src/components/Text"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
)

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    background: ${
      theme.palette.mode === "dark"
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
  `
)

const DailyExpenses = () => {
  const theme = useTheme()
  const [values, setValues] = useState({ labels: [""], series: [0] })

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    colors: ["#ff9900", "#1c81c2", "#333", "#5c6ac0"],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${val}%`
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]],
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5,
        },
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100],
      },
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  }

  useEffect(() => {
    setValues({
      labels: ["Net Banking", "UPI", "CASH", "Other"],
      series: [10, 20, 25, 45],
    })
  }, [])

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3,
              }}
              variant="h4"
            >
              Today's Expenses
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                ₹54,584.23
              </Typography>
              <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
                In cash ₹45,681.48
              </Typography>
              {/* <Box
                display="flex"
                sx={{
                  py: 4,
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2,
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">+ $3,594.00</Typography>
                  <Typography variant="subtitle2" noWrap>
                    this month
                  </Typography>
                </Box>
              </Box> */}
            </Box>
            <Grid container spacing={3} pt={3}>
              <Grid sm item>
                <Button fullWidth variant="outlined">
                  View Expenses
                </Button>
              </Grid>
              <Grid sm item>
                <Button fullWidth variant="contained">
                  Add Expense
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: "none", md: "inline-block" },
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={{ ...chartOptions, labels: values.labels }}
                  series={values.series}
                  type="donut"
                  name="Expenses"
                />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: "100%",
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="BTC"
                        src="/static/images/placeholders/logo/bitcoin.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="Cash"
                      primaryTypographyProps={{ variant: "h5", noWrap: true }}
                      secondary="Chash Expenses"
                      secondaryTypographyProps={{
                        variant: "subtitle2",
                        noWrap: true,
                      }}
                    />
                    <Box alignItems="right" textAlign="right">
                      <Typography align="right" variant="h4" noWrap>
                        ₹ 53,000.00
                      </Typography>
                      <Text>2.54%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="XRP"
                        src="/static/images/placeholders/logo/ripple.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="UPI"
                      primaryTypographyProps={{ variant: "h5", noWrap: true }}
                      secondary="UPI Payments"
                      secondaryTypographyProps={{
                        variant: "subtitle2",
                        noWrap: true,
                      }}
                    />
                    <Box alignItems="right" textAlign="right">
                      <Typography align="right" variant="h4" noWrap>
                        ₹ 53,000.00
                      </Typography>
                      <Text>2.54%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="ADA"
                        src="/static/images/placeholders/logo/cardano.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="Others"
                      primaryTypographyProps={{ variant: "h5", noWrap: true }}
                      secondary="Other Payment Modes"
                      secondaryTypographyProps={{
                        variant: "subtitle2",
                        noWrap: true,
                      }}
                    />
                    <Box alignItems="right" textAlign="right">
                      <Typography align="right" variant="h4" noWrap>
                        ₹ 53,000.00
                      </Typography>
                      <Text>2.54%</Text>
                    </Box>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default DailyExpenses