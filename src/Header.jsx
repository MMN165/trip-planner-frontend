import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Header() {
	return (
		<AppBar
			position="sticky"
			color="default"
			elevation={1}
			sx={{
				backgroundColor: "#ffffff",
				borderBottom: "1px solid #e0e0e0",
				color: "#333333",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Typography
					variant="h6"
					component="div"
					sx={{ fontWeight: 700 }}
				>
					MapMuse
				</Typography>
				<Stack direction="row" spacing={2}>
					<Button variant="text" color="primary">
						Login
					</Button>
					<Button
						variant="contained"
						color="primary"
						sx={{ color: "#ffffff" }}
					>
						Sign up
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
