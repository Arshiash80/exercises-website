import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { useState } from "react";
import NextNProgress from "nextjs-progressbar";
import { Container } from "@mui/material";
import AppBar from "@/components/AppBar";

export default function App({ Component, pageProps }: AppProps) {
	const [headTitle, setHeadTitle] = useState<string>("");
	const [headDescripion, setHeadDescripion] = useState<string>("");
	return (
		<>
			<div>
				<Head>
					<title key={"title"}>{`${
						headTitle && headTitle + " - "
					} My Exercises Dictionary`}</title>
					<meta
						name="description"
						content={headDescripion ?? "Nextjs movies application"}
						key={"description"}
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<NextNProgress />
				<Container maxWidth="md">
					<AppBar />
					<Component
						{...pageProps}
						setHeadTitle={setHeadTitle}
						setHeadDescripion={setHeadDescripion}
					/>
				</Container>
			</div>
		</>
	);
}
