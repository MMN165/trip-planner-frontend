import { Button } from "@mui/material";
import { GoogleIcon } from "../assets/icons/GoogleIcon";

export default function GoogleButton({ label }) {
	return (
		<Button
			fullWidth
			variant="outlined"
			startIcon={<GoogleIcon />}
			sx={{
				py: 1.25,
				borderColor: "#dadce0",
				color: "#3c4043",
				fontFamily: "'Google Sans', Roboto, sans-serif",
				fontWeight: 500,
				fontSize: "0.875rem",
				textTransform: "none",
				letterSpacing: 0,
				"&:hover": { borderColor: "#aaa", backgroundColor: "#f6f6f6" },
			}}
		>
			{label}
		</Button>
	);
}
