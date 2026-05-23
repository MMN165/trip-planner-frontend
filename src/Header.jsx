import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { PURPLE, PURPLE_DARK } from "./constants";

export default function Header({ onNav }) {
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
					onClick={() => onNav("home")}
					sx={{
						fontWeight: 700,
						cursor: "pointer",
						userSelect: "none",
					}}
				>
					MapMuse
				</Typography>
				<Stack direction="row" spacing={2}>
					<Button
						variant="text"
						color="primary"
						onClick={() => onNav("login")}
					>
						Login
					</Button>
					<Button
						variant="contained"
						onClick={() => onNav("signup")}
						sx={{
							backgroundColor: PURPLE,
							color: "#ffffff",
							"&:hover": { backgroundColor: PURPLE_DARK },
						}}
					>
						Sign up
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
