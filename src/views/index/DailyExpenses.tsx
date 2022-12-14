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
} from "@mui/material"
import Image from "next/image"

import Text from "src/components/Text"

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
  const c = "₹"

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
                <Button fullWidth variant="outlined" href="/admin/daily">
                  View Expenses
                </Button>
              </Grid>
              <Grid sm item>
                <Button fullWidth variant="contained" href="/admin/new/expense">
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
          <Box p={4} flex={1}>
            <List
              disablePadding
              sx={{
                width: "100%",
              }}
            >
              <ListItem disableGutters>
                <ListItemAvatarWrapper>
                  <Image
                    alt="Cash"
                    src="/static/images/rupee.png"
                    width={60}
                    height={60}
                  />
                </ListItemAvatarWrapper>
                <ListItemText
                  primary="Cash"
                  primaryTypographyProps={{ variant: "h5", noWrap: true }}
                  secondary="Cash Expenses"
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
                  <Image
                    alt="UPI"
                    src="/static/images/gpay.png"
                    width={60}
                    height={60}
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
                  <Image
                    alt="Others"
                    src="/static/images/money-bag.png"
                    width={60}
                    height={60}
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
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default DailyExpenses
