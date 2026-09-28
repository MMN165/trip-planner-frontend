import { useState, useEffect } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Divider,
	Stack,
	TextField,
	InputAdornment,
	IconButton,
	Button,
} from "@mui/material";
import GoogleButton from "../components/GoogleButton";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { PURPLE, PURPLE_DARK, BG, fieldSx } from "../constants";
import API from "../api";

export default function Login({ onNav }) {
	const [showPw, setShowPw] = useState(false);
	const [form, setForm] = useState({
		identifier: "",
		password: "",
	});
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			const identifier = form.identifier.trim();

			const loginData = {
				password: form.password,
			};

			if (identifier.includes("@")) {
				loginData.email = identifier;
			} else {
				loginData.username = identifier;
			}

			const response = await API.post("/users/login", loginData);

			console.log("Login successful!", response.data);

			localStorage.setItem(
				"travelerProfile",
				JSON.stringify(response.data),
			);

			setTimeout(() => onNav("trips"));
		} catch (err) {
			console.error("Login error:", err.response?.data);
			console.error("Status:", err.response?.status);
			console.error("Full error:", err);
		}
	};

	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev || "";
		};
	}, []);

	return (
		<Box
			sx={{
				height: "calc(100svh - 64px)",
				backgroundColor: BG,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflowY: "hidden",
			}}
		>
			<Card
				elevation={0}
				sx={{
					width: "100%",
					maxWidth: 420,
					borderRadius: 3,
					border: "1px solid #e8e8e8",
					backgroundColor: "#fff",
				}}
			>
				<CardContent sx={{ p: 4 }}>
					{/* heading */}
					<Typography
						variant="h5"
						sx={{
							fontWeight: 700,
							color: "#1a1a1a",
							mb: 0.5,
							fontFamily: "Georgia, serif",
						}}
					>
						Welcome back
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#6b7280", mb: 3 }}
					>
						Sign in to continue to MapMuse
					</Typography>

					{/* SSO */}
					<GoogleButton label="Continue with Google" />

					<Divider
						sx={{ my: 2.5, color: "#9ca3af", fontSize: "0.75rem" }}
					>
						or
					</Divider>

					{/* fields */}
					<Stack spacing={2}>
						<TextField
							fullWidth
							label="Email or username"
							variant="outlined"
							size="small"
							sx={fieldSx}
							name="identifier"
							value={form.identifier}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							label="Password"
							variant="outlined"
							size="small"
							type={showPw ? "text" : "password"}
							sx={fieldSx}
							inputprops={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											size="small"
											onClick={() => setShowPw((v) => !v)}
											edge="end"
											sx={{ color: "#9ca3af" }}
										>
											<EyeIcon open={showPw} />
										</IconButton>
									</InputAdornment>
								),
							}}
							name="password"
							onChange={handleChange}
						/>
					</Stack>

					{/* forgot */}
					<Box sx={{ textAlign: "right", mt: 0.75, mb: 2.5 }}>
						<Typography
							component="span"
							variant="caption"
							sx={{
								color: "#6b7280",
								cursor: "pointer",
								"&:hover": { color: "#4f46e5" },
							}}
						>
							Forgot password?
						</Typography>
					</Box>

					{/* CTA */}
					<Button
						fullWidth
						variant="contained"
						size="large"
						sx={{
							backgroundColor: PURPLE,
							color: "#fff",
							fontWeight: 600,
							textTransform: "none",
							borderRadius: 2,
							py: 1.25,
							fontSize: "0.95rem",
							boxShadow: "0 2px 8px rgba(208,191,255,0.5)",
							"&:hover": {
								backgroundColor: PURPLE_DARK,
								boxShadow: "0 4px 14px rgba(208,191,255,0.6)",
							},
						}}
						onClick={handleSubmit}
					>
						Log in
					</Button>

					{/* footer */}
					<Typography
						variant="body2"
						sx={{ textAlign: "center", mt: 2.5, color: "#6b7280" }}
					>
						Don't have an account?{" "}
						<Typography
							component="span"
							variant="body2"
							onClick={() => onNav("signup")}
							sx={{
								color: "#7c3aed",
								fontWeight: 600,
								cursor: "pointer",
								"&:hover": { textDecoration: "underline" },
							}}
						>
							Sign up
						</Typography>
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}
