import "../styles/globals.css"
import type { AppProps } from "next/app"
import { CssBaseline } from "@mui/material"

import ThemeProviderWrapper from "../theme/ThemeProvider"

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProviderWrapper>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProviderWrapper>
)

export default App
