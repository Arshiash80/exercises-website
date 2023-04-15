import { Grid } from "@mui/material";
import { ReactNode } from "react";

type CardGridProps<T> = {
	children: ReactNode;
};
function CardGrid<T>({ children }: CardGridProps<T>) {
	return (
		<main>
			<Grid container spacing={3} width={"100%"} marginTop={2}>
				{children}
			</Grid>
		</main>
	);
}

export default CardGrid;
