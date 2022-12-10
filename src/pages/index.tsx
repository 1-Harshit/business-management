import {
  Box,
  Button,
  Container,
  Hidden,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import Footer from "src/components/Footer"

const MainContent = styled(Box)(
  () => `
    height: 85vh;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    bottom: 0;
    @media (max-width: 600px) {
      height: 100vh;
    }
`
)

const Home = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Image
              alt="500"
              width={isMobile ? 150 : 350}
              height={isMobile ? 150 : 350}
              src="/static/images/logo.svg"
            />
            <Image
              alt="500"
              width={isMobile ? 150 : 350}
              height={isMobile ? 150 : 350}
              src="/static/images/manoj_logo.svg"
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
              If you do not have access to this application, please contact{" "}
              <Link href="/credits">Maintainer</Link> of this Application.
            </Typography>
            <Button href="/credits" variant="outlined" sx={{ ml: 1 }}>
              Contact Maintainer
            </Button>
            <Button href="/login" variant="contained" sx={{ ml: 1 }}>
              Login
            </Button>
          </Box>
        </Container>
      </MainContent>
      <Hidden mdDown>
        <Footer />
      </Hidden>
    </>
  )
}

export default Home
