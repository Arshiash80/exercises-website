import Head from "next/head";
import type { AppProps } from "next/app";
import { useState } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
	const [headTitle, setHeadTitle] = useState<string>("");
	const [headDescripion, setHeadDescripion] = useState<string>("");
	return (
		<>
			<div>
				<Head>
					<title key={"title"}>{`${
						headTitle && headTitle + " - "
					} My Exercise Dictionary`}</title>
					<meta
						name="description"
						content={headDescripion ?? "Nextjs movies application"}
						key={"description"}
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Container maxWidth="md">
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
