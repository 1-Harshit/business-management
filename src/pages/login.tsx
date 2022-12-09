import { useState } from "react"
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { styled } from "@mui/material/styles"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.blue2};
`
)

const MainContent = styled(Box)(
  () => `
    height: 100vh;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
)

const LoginButton = styled(LoadingButton)(
  ({ theme }) => `
    margin-top: ${theme.spacing(2)};
    &:hover {
      background: ${theme.colors.gradients.blue1};
    }
`
)

const Login = () => {
  const [values, setValues] = useState({
    password: "",
    user: "",
    showPassword: false,
  })
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    // TODO: Login API Call
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <MainContent>
        <Grid
          container
          sx={{ height: "100%" }}
          alignItems="stretch"
          spacing={0}
        >
          <Hidden mdDown>
            <Grid
              xs={8}
              md={4}
              alignItems="center"
              display="flex"
              justifyContent="center"
              item
            >
              <Container maxWidth="sm">
                <Box textAlign="center">
                  <Image
                    alt="500"
                    height={200}
                    src="/static/images/logo.svg"
                    width={200}
                  />
                  <Image
                    alt="500"
                    height={210}
                    src="/static/images/manoj_logo.svg"
                    width={210}
                  />
                  <Typography variant="h2" sx={{ my: 2 }}>
                    Manoj Kumar's &amp;
                    <br />
                    Pole Star Enterprises' <br />
                    Business Management App 🚀
                  </Typography>
                  <Typography
                    variant="h4"
                    color="text.secondary"
                    fontWeight="normal"
                    sx={{ mb: 4 }}
                  >
                    If you do not have access to this page, please contact{" "}
                    <Link href="/credits">Maintainer</Link> of this Application.
                  </Typography>
                  <Button href="/credits" variant="outlined" sx={{ ml: 1 }}>
                    Contact Maintainer
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Hidden>
          <GridWrapper
            xs={16}
            md={8}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <Image
                  alt="500"
                  height={200}
                  src="/static/images/logo.svg"
                  width={200}
                />
                <Typography variant="h1" sx={{ my: 2 }}>
                  Welcome Back!
                </Typography>
                <Typography variant="h2" sx={{ my: 2 }}>
                  Please login to proceed!
                </Typography>
              </Box>
              <Container maxWidth="sm">
                <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
                  <FormControl variant="outlined" fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      value={values.user}
                      onChange={handleChange("user")}
                      disabled={loading}
                    />
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="login-password">Password</InputLabel>
                      <OutlinedInput
                        id="login-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        disabled={loading}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </FormControl>
                  <LoginButton
                    onClick={() => handleLogin()}
                    variant="contained"
                    loading={loading}
                  >
                    Login
                  </LoginButton>
                </Card>
              </Container>
            </Container>
          </GridWrapper>
        </Grid>
      </MainContent>
    </>
  )
}

export default Login
