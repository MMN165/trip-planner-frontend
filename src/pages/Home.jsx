import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../Header";
import homeBg from "../assets/home-bkg.jpg";

function Home() {
	return (
		<Box
			component="main"
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				backgroundImage: `url(${homeBg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				color: "#ffffff",
				width: "100%",
			}}
		>
			<Box
				sx={{
					width: "100%",
					maxWidth: 900,
					px: 3,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					textAlign: "left",
				}}
			>
				<Typography
					variant="h1"
					align="center"
					sx={{
						mb: 2,
						color: "#ffffff",
						fontSize: "clamp(2.5rem, 5vw, 4rem)",
					}}
				>
					Welcome to MapMuse
				</Typography>
				<Typography
					variant="h5"
					align="center"
					sx={{
						fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
						lineHeight: 1.5,
					}}
				>
					Craft your perfect trip
				</Typography>
			</Box>
		</Box>
	);
}

export default Home;
