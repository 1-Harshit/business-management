import { Public } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

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

const Home = () => (
  <>
    <Head>
      <title>Credits</title>
    </Head>
    <MainContent>
      <Container maxWidth="md">
        <Box textAlign="center" justifyContent="center">
          <Box sx={{ top: 100, left: 100 }}>
            <Avatar
              sx={{ width: 200, height: 200 }}
              src="/static/images/avatars/harshit.jpg"
            />
          </Box>
          <Typography variant="h2" sx={{ my: 2 }}>
            Hey there, I'm Harshit! 👋 <br />
          </Typography>
          <Typography variant="h3" sx={{ mb: 3 }}>
            I build this application for my dear father and his company.
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ mb: 3 }}>
            This was my first frontend on my own. :) <br />
            Hit me up, we can chat on any geeky stuff.
          </Typography>
          <Button
            href="https://1-Harshit.github.io"
            variant="contained"
            sx={{ m: 1 }}
            startIcon={<Public />}
          >
            My website
          </Button>
        </Box>
      </Container>
    </MainContent>
    <Hidden mdDown>
      <Footer />
    </Hidden>
  </>
)

export default Home
