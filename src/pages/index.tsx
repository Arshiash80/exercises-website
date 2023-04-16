import NetworkManager from "@/utils/NetworkManager";
import { GetStaticPaths, GetStaticProps } from "next";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "next/link";
import CardGrid from "@/components/CardGrid";
import { AppPageProps } from "@/@types/appPageProps";

type HomePageProps = {
	muscles: string[];
};
const HomePage = ({ muscles, setHeadTitle }: HomePageProps & AppPageProps) => {
	setHeadTitle("");
	return (
		<>
			<Typography variant="h2">Muscles</Typography>
			<main>
				<CardGrid>
					{muscles.map((muscle, index) => (
						<Grid
							item
							xs={12}
							md={6}
							key={index}
							width={"100%"}
							justifyContent={"space-between"}
						>
							<Box width={"100%"}>
								<Link href={`/exercises/${muscle}`}>
									<Paper
										elevation={3}
										sx={{
											padding: 4,
										}}
									>
										<Typography
											textAlign={"center"}
											variant="h5"
											color="initial"
										>
											{muscle}
										</Typography>
									</Paper>
								</Link>
							</Box>
						</Grid>
					))}
				</CardGrid>
			</main>
		</>
	);
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	const options: INetworkRequestOptions<undefined> = {
		method: "GET",
		url: `https://${process.env.RAPIDAPI_HOST}/search/muscles`,
		headers: {
			"content-type": "application/json",
			"X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
			"X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
		},
	};

	let response_muscles: string[] = [];
	try {
		const response = await new NetworkManager(options).request<any>();
		response_muscles = response;
	} catch (error) {
		console.error("Server Error:", error);
		response_muscles = [];
	}

	return {
		props: {
			muscles: response_muscles,
		},
	};
};
