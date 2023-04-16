import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import NetworkManager from "@/utils/NetworkManager";
import { AppPageProps } from "@/@types/appPageProps";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";

type ExerciseForMusclePageProps = {
	selectedMuscle: string;
	exercies: IExercise[];
};

const ExerciseForMusclePage = ({
	selectedMuscle,
	exercies,
	setHeadTitle,
}: ExerciseForMusclePageProps & AppPageProps) => {
	setHeadTitle(`${selectedMuscle}`);
	const [hasWindow, setHasWindow] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true);
		}
	}, []);
	return (
		<>
			<Typography variant="h3">
				Exercises for
				<br />
				{selectedMuscle}
				<br />
				muscle
			</Typography>
			<main>
				{hasWindow && (
					<Grid container spacing={3} marginTop={2}>
						{exercies.map((exercie, index) => (
							<Grid
								item
								xs={12}
								md={6}
								key={index}
								width={"100%"}
								justifyContent={"space-between"}
							>
								<Card>
									<CardHeader
										title={exercie.Name}
										subheader={`Force: ${exercie.Force}`}
									/>
									<ReactPlayer
										url={exercie["Youtube link"]}
										width={"100%"}
										volume={0}
										controls={true}
										title="green iguana"
									/>
									{exercie["Primary Muscles"] && (
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Primary Muscles
											</Typography>
											<ul>
												{exercie["Primary Muscles"].map((muscle, index) => (
													<li key={index}>
														<Typography variant="body2" color="text.secondary">
															{muscle}
														</Typography>
													</li>
												))}
											</ul>
										</CardContent>
									)}
									{exercie["Secondary Muscles"] && (
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Secondary Muscles
											</Typography>
											<ul>
												{exercie["Secondary Muscles"].map((muscle, index) => (
													<li key={index}>
														<Typography variant="body2" color="text.secondary">
															{muscle}
														</Typography>
													</li>
												))}
											</ul>
										</CardContent>
									)}
								</Card>
							</Grid>
						))}
					</Grid>
				)}
			</main>
		</>
	);
};

export default ExerciseForMusclePage;

export const getStaticPaths: GetStaticPaths = async () => {
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
		response_muscles = [];
	}

	const paths = response_muscles.map((slug) => ({
		params: { muscle: slug },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<
	ExerciseForMusclePageProps
> = async ({ params }: GetStaticPropsContext) => {
	const selectedMuscle = params?.muscle?.toString() ?? "";
	const options: INetworkRequestOptions<undefined> = {
		method: "GET",
		url: `https://${process.env.RAPIDAPI_HOST}/search/`,
		params: { secondaryMuscle: selectedMuscle },
		headers: {
			"content-type": "application/json",
			"X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
			"X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
		},
	};

	let response_exercises: IExercise[] = [];
	try {
		const response = await new NetworkManager(options).request<any>();
		response_exercises = response;
	} catch (error) {
		console.error("Server Error:", error);
		response_exercises = [];
	}

	return {
		props: {
			selectedMuscle,
			exercies: response_exercises,
		},
	};
};
