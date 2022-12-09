import "../styles/globals.css"
import type { AppProps } from "next/app"
import { CssBaseline } from "@mui/material"
import { NextPage } from "next"
import { FC } from "react"

import { SidebarProvider } from "src/contexts/SidebarContext"
import EmptyLayout from "src/layouts/EmptyLayout"
import ThemeProviderWrapper from "src/theme/ThemeProvider"

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.layout || EmptyLayout
  return (
    <SidebarProvider>
      <ThemeProviderWrapper>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProviderWrapper>
    </SidebarProvider>
  )
}

export default App
