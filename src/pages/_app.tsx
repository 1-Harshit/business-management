import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProviderWrapper from "../theme/ThemeProvider";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProviderWrapper>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProviderWrapper>
	);
}
