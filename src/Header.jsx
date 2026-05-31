import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { PURPLE, PURPLE_DARK } from "./constants";
import { useState } from "react";

export default function Header({ onNav }) {
	const profile = JSON.parse(localStorage.getItem("travelerProfile"));
	const [open, setOpen] = useState(false);

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
				
				{/* Logo */}
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

				<Stack
					direction="row"
					spacing={2}
					sx={{ position: "relative" }}
				>
					{profile ? (
						<>
							{/* Profile Button */}
							<Button
								variant="text"
								color="primary"
								onClick={() => setOpen(!open)}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									padding: "10px 16px",
									borderRadius: "12px",
									backgroundColor: "white",
									cursor: "pointer",
									fontSize: "16px",
									fontWeight: "500",
								}}
							>
								{profile.name} ▼

							</Button>

							{/* Dropdown */}
							{open && (
								<div
									style={{
										position: "absolute",
										top: "50px",
										right: "0",
										backgroundColor: "#fff",
										border: "1px solid #e0e0e0",
										borderRadius: "12px",
										boxShadow:
											"0 4px 12px rgba(0,0,0,0.1)",
										zIndex: 1000,
										minWidth: "180px",
										overflow: "hidden",
									}}
								>
									<Button
										fullWidth
										onClick={() => {
											onNav("profile");
											setOpen(false);
										}}
										style={{
											justifyContent: "flex-start",
											padding: "12px 16px",
											color: "#333",
										}}
									>
										My Account
									</Button>

									<Button
										fullWidth
										onClick={() => {
											localStorage.removeItem(
												"travelerProfile"
											);
											setOpen(false);
											onNav("home");
										}}
										style={{
											justifyContent: "flex-start",
											padding: "12px 16px",
											color: "#d32f2f",
										}}
									>
										Logout
									</Button>
								</div>
							)}
						</>
					) : (
						<>
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
									"&:hover": {
										backgroundColor: PURPLE_DARK,
									},
								}}
							>
								Sign up
							</Button>
						</>
					)}
				</Stack>
			</Toolbar>
		</AppBar>
	);
}