import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MapIcon from "@mui/icons-material/Map";
import homeBg from "../assets/home-bkg.jpg";

function Home() {
	return (
		<Box
			component="main"
			sx={{
				height: "calc(100svh - 64px)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${homeBg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				color: "#ffffff",
				width: "100%",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					alignItems: "center",
					justifyContent: "space-between",
					px: 3,
					width: "100%",
					maxWidth: 1100,
					gap: 4,
				}}
			>
				<Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
					<Typography
						variant="h1"
						sx={{
							mb: 1,
							color: "#fff",
							fontSize: "clamp(2rem, 5vw, 4rem)",
							fontWeight: 800,
						}}
					>
						Welcome to MapMuse
					</Typography>

					<Typography
						variant="h4"
						sx={{
							mb: 1.5,
							color: "#f3e8ff",
							fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
							fontWeight: 600,
						}}
					>
						Explore your next trip itinerary
					</Typography>
				</Box>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minWidth: 260,
						minHeight: 260,
						borderRadius: "50%",
					}}
				>
					<MapIcon sx={{ fontSize: 220, color: "#ffffff" }} />
				</Box>
			</Box>
		</Box>
	);
}

export default Home;
