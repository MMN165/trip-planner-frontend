import { useState, useEffect } from "react";
import {
	Box,
	Card,
	CardContent,
	Paper,
	Typography,
	Stack,
	TextField,
	Chip,
	Slider,
	Button,
	Divider,
	InputAdornment,
	IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import GroupIcon from "@mui/icons-material/Group";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PublicIcon from "@mui/icons-material/Public";
import EventIcon from "@mui/icons-material/Event";
import GoogleButton from "../components/GoogleButton";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { BG, PURPLE, PURPLE_DARK, fieldSx } from "./../constants";
import { buildTravelerProfile } from "../utils/formatTravelerProfile";

const totalSteps = 8;

const chipStyles = {
	px: 2,
	py: 1,
	borderRadius: 2,
	textTransform: "none",
};

const stepMeta = [
	{ title: "Welcome to your travel survey", icon: null },
	{ title: "Basic Info", icon: <PersonIcon /> },
	{ title: "Travel Experience", icon: <FlightTakeoffIcon /> },
	{ title: "Budget Compatibility", icon: <AttachMoneyIcon /> },
	{ title: "Travel Personality", icon: <DirectionsWalkIcon /> },
	{ title: "Group Dynamics", icon: <GroupIcon /> },
	{ title: "Food & Lifestyle", icon: <RestaurantIcon /> },
	{ title: "Destination Preferences", icon: <PublicIcon /> },
	{ title: "Logistics & Ending", icon: <EventIcon /> },
];

export default function Signup({ onNav }) {
	const [step, setStep] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [showSurvey, setShowSurvey] = useState(false);
	const [showPw, setShowPw] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [signupValues, setSignupValues] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [values, setValues] = useState({
		name: "",
		ageRange: "",
		location: "",
		passportStatus: "",
		travelFrequency: "",
		tripTypes: [],
		budgetLevel: "",
		spendingStyle: "",
		lodging: "",
		shareRooms: "",
		travelPace: "",
		wakeUp: "",
		nightlife: 3,
		downtime: 3,
		idealDay: "",
		planningStyle: "",
		frustrations: [],
		socialLevel: 3,
		aloneTime: "",
		foodNotes: "",
		foodAdventure: 3,
		alcohol: "",
		dreamDestinations: "",
		climates: [],
		regions: [],
		availability: "",
		planningHorizon: "",
		favoriteTrip: "",
	});

	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev || "";
		};
	}, []);

	const setValue = (key, value) =>
		setValues((prev) => ({ ...prev, [key]: value }));

	const toggleMulti = (key, option) => {
		setValues((prev) => {
			const current = Array.isArray(prev[key]) ? prev[key] : [];
			return {
				...prev,
				[key]: current.includes(option)
					? current.filter((item) => item !== option)
					: [...current, option],
			};
		});
	};

	const renderChips = (options, field, multi = false) => (
		<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
			{options.map((option) => {
				const selected = multi
					? values[field].includes(option)
					: values[field] === option;
				return (
					<Chip
						key={option}
						label={option}
						variant={selected ? "filled" : "outlined"}
						color={selected ? "primary" : "default"}
						onClick={() =>
							multi
								? toggleMulti(field, option)
								: setValue(field, option)
						}
						sx={chipStyles}
					/>
				);
			})}
		</Box>
	);

	const nextStep = () => {
		if (step < totalSteps) setStep((c) => c + 1);
	};
	const prevStep = () => {
		if (step > 0) setStep((c) => c - 1);
	};
	const setSignupValue = (key, value) =>
		setSignupValues((prev) => ({ ...prev, [key]: value }));
	const startSurvey = () => {
		setShowSurvey(true);
		setStep(0);
	};
	const handleSubmit = () => {
		const profile = buildTravelerProfile(values, signupValues);
		localStorage.setItem("travelerProfile", JSON.stringify(profile));
		setSubmitted(true);
		setTimeout(() => onNav("home"), 1400);
	};

	// ── Submitted ──────────────────────────────────────────────────────────────
	if (submitted) {
		return (
			<Box
				sx={{
					height: "calc(100svh - 64px)",
					backgroundColor: BG,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					px: 3,
				}}
			>
				<Paper
					elevation={3}
					sx={{
						maxWidth: 600,
						width: "100%",
						p: 5,
						textAlign: "center",
						borderRadius: 4,
					}}
				>
					<Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
						Thanks! Your travel profile is saved.
					</Typography>
					<Typography sx={{ color: "#6b7280" }}>
						We're matching your travel style and will have better
						trip ideas soon.
					</Typography>
				</Paper>
			</Box>
		);
	}

	// ── Sign-up card ───────────────────────────────────────────────────────────
	if (!showSurvey) {
		return (
			<Box
				sx={{
					height: "calc(100svh - 64px)",
					backgroundColor: BG,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					overflowY: "hidden",
					px: 2,
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
						<Typography
							variant="h5"
							sx={{
								fontWeight: 700,
								color: "#1a1a1a",
								mb: 0.5,
								fontFamily: "Georgia, serif",
							}}
						>
							Create your account
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: "#6b7280", mb: 3 }}
						>
							Start exploring with MapMuse today
						</Typography>

						<GoogleButton label="Sign up with Google" />

						<Divider
							sx={{
								my: 2.5,
								color: "#9ca3af",
								fontSize: "0.75rem",
							}}
						>
							or
						</Divider>

						<Stack spacing={2}>
							<TextField
								fullWidth
								label="Full name"
								variant="outlined"
								size="small"
								sx={fieldSx}
								value={signupValues.fullName}
								onChange={(e) =>
									setSignupValue("fullName", e.target.value)
								}
							/>
							<TextField
								fullWidth
								label="Email address"
								type="email"
								variant="outlined"
								size="small"
								sx={fieldSx}
								value={signupValues.email}
								onChange={(e) =>
									setSignupValue("email", e.target.value)
								}
							/>
							<TextField
								fullWidth
								label="Password"
								variant="outlined"
								size="small"
								type={showPw ? "text" : "password"}
								sx={fieldSx}
								value={signupValues.password}
								onChange={(e) =>
									setSignupValue("password", e.target.value)
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												size="small"
												onClick={() =>
													setShowPw((v) => !v)
												}
												edge="end"
												sx={{ color: "#9ca3af" }}
											>
												<EyeIcon open={showPw} />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<TextField
								fullWidth
								label="Confirm password"
								variant="outlined"
								size="small"
								type={showConfirm ? "text" : "password"}
								sx={fieldSx}
								value={signupValues.confirmPassword}
								onChange={(e) =>
									setSignupValue(
										"confirmPassword",
										e.target.value,
									)
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												size="small"
												onClick={() =>
													setShowConfirm((v) => !v)
												}
												edge="end"
												sx={{ color: "#9ca3af" }}
											>
												<EyeIcon open={showConfirm} />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Stack>

						<Button
							fullWidth
							variant="contained"
							size="large"
							onClick={startSurvey}
							sx={{
								mt: 3,
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
									boxShadow:
										"0 4px 14px rgba(208,191,255,0.6)",
								},
							}}
						>
							Sign up
						</Button>

						<Typography
							variant="body2"
							sx={{
								textAlign: "center",
								mt: 2.5,
								color: "#6b7280",
							}}
						>
							Already have an account?{" "}
							<Typography
								component="span"
								variant="body2"
								onClick={() => onNav("login")}
								sx={{
									color: "#7c3aed",
									fontWeight: 600,
									cursor: "pointer",
									"&:hover": { textDecoration: "underline" },
								}}
							>
								Log in
							</Typography>
						</Typography>
					</CardContent>
				</Card>
			</Box>
		);
	}

	// ── Survey ─────────────────────────────────────────────────────────────────
	const progressPct = Math.min(((step + 1) / (totalSteps + 1)) * 100, 100);

	return (
		<Box
			sx={{
				height: "calc(100svh - 64px)",
				backgroundColor: BG,
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* Progress bar — outside the card, pinned below header */}
			<Box sx={{ px: 0, pt: 0 }}>
				<Box
					sx={{
						backgroundColor: "#e5e7eb",
						height: 6,
						width: "100%",
					}}
				>
					<Box
						sx={{
							width: `${progressPct}%`,
							height: "100%",
							background:
								"linear-gradient(90deg, #c4b5fd 0%, #a78bfa 50%, #818cf8 100%)",
							transition: "width 0.4s ease",
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						px: 3,
						pt: 0.75,
					}}
				>
					<Typography
						variant="caption"
						sx={{ color: "#9ca3af", fontWeight: 500 }}
					>
						Step {Math.min(step + 1, totalSteps + 1)} of{" "}
						{totalSteps + 1}
					</Typography>
				</Box>
			</Box>

			{/* Survey card */}
			<Box
				sx={{
					flex: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					px: 2,
					pb: 2,
					overflow: "hidden",
				}}
			>
				<Paper
					elevation={3}
					sx={{
						width: "100%",
						maxWidth: 960,
						borderRadius: 4,
						overflow: "hidden",
						display: "flex",
						flexDirection: "column",
						maxHeight: "calc(100svh - 130px)",
					}}
				>
					<Box
						sx={{ p: { xs: 3, md: 5 }, overflowY: "auto", flex: 1 }}
					>
						<Box sx={{ maxWidth: 840, mx: "auto" }}>
							{/* Step title with icon (single, no duplicate) */}
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1.5,
									mb: 3,
								}}
							>
								{stepMeta[step].icon && (
									<Box
										sx={{
											color: "primary.main",
											display: "flex",
											alignItems: "center",
										}}
									>
										{stepMeta[step].icon}
									</Box>
								)}
								<Typography
									variant="h4"
									sx={{ fontWeight: 800 }}
								>
									{stepMeta[step].title}
								</Typography>
							</Box>

							{step === 0 && (
								<Box sx={{ display: "grid", gap: 3 }}>
									<Box
										sx={{
											p: 4,
											borderRadius: 4,
											backgroundColor:
												"rgba(208,191,255,0.12)",
										}}
									>
										Takes ~3–5 minutes. Your answers will
										help us understand your travel style and
										preferences, so we can provide better
										trip recommendations and inspiration.
									</Box>
								</Box>
							)}

							{step === 1 && (
								<Stack spacing={3}>
									<TextField
										label="Name"
										value={values.name}
										onChange={(e) =>
											setValue("name", e.target.value)
										}
										fullWidth
									/>
									<Typography sx={{ fontWeight: 700 }}>
										Age range
									</Typography>
									{renderChips(
										["18-24", "25-34", "35-44", "45+"],
										"ageRange",
									)}
									<TextField
										label="City / State"
										value={values.location}
										onChange={(e) =>
											setValue("location", e.target.value)
										}
										fullWidth
									/>
									<Typography sx={{ fontWeight: 700 }}>
										Passport status
									</Typography>
									{renderChips(
										[
											"Have passport",
											"Need renewal",
											"No passport",
										],
										"passportStatus",
									)}
								</Stack>
							)}

							{step === 2 && (
								<Stack spacing={3}>
									<Typography sx={{ fontWeight: 700 }}>
										How often do you travel?
									</Typography>
									{renderChips(
										[
											"A few times a year",
											"Once a year",
											"Rarely",
											"First big trip",
										],
										"travelFrequency",
									)}
									<Typography sx={{ fontWeight: 700 }}>
										What kinds of trips do you usually
										enjoy?
									</Typography>
									{renderChips(
										[
											"Beach",
											"City exploration",
											"Nature/hiking",
											"Luxury",
											"Food-focused",
											"Party/nightlife",
											"Relaxation",
											"Adventure",
											"Cultural/history",
											"Shopping",
											"Cruises",
											"Theme parks",
										],
										"tripTypes",
										true,
									)}
								</Stack>
							)}

							{step === 3 && (
								<Stack spacing={3}>
									<Typography sx={{ fontWeight: 700 }}>
										What's your typical budget for a 5–7 day
										trip?
									</Typography>
									{renderChips(
										[
											"Budget traveler ($)",
											"Moderate ($$)",
											"Comfortable ($$$)",
											"Luxury ($$$$)",
										],
										"budgetLevel",
									)}
									<Typography sx={{ fontWeight: 700 }}>
										Which statement sounds most like you?
									</Typography>
									{renderChips(
										[
											"I'll spend to maximize experiences",
											"I balance cost and comfort",
											"I try to save where possible",
											"Cheapest option always",
										],
										"spendingStyle",
									)}
									<Typography sx={{ fontWeight: 700 }}>
										Preferred lodging?
									</Typography>
									{renderChips(
										[
											"Hostel",
											"Airbnb",
											"Hotel",
											"Resort",
											"Don't care",
										],
										"lodging",
									)}
									<Typography sx={{ fontWeight: 700 }}>
										Are you comfortable sharing rooms?
									</Typography>
									{renderChips(
										["Yes", "Maybe", "No"],
										"shareRooms",
									)}
								</Stack>
							)}

							{step === 4 && (
								<Stack spacing={3}>
									<Typography sx={{ fontWeight: 700 }}>
										What's your travel pace?
									</Typography>
									{renderChips(
										[
											"Packed itinerary",
											"Balanced",
											"Mostly spontaneous",
											"Relax and wander",
										],
										"travelPace",
									)}
									<Typography sx={{ fontWeight: 700 }}>
										How early do you wake up on trips?
									</Typography>
									{renderChips(
										[
											"Before 7am",
											"7–9am",
											"9–11am",
											"Noon+",
										],
										"wakeUp",
									)}
									<Box>
										<Typography
											sx={{ fontWeight: 700, mb: 1 }}
										>
											How important is nightlife?
										</Typography>
										<Slider
											value={values.nightlife}
											onChange={(e, v) =>
												setValue("nightlife", v)
											}
											min={1}
											max={5}
											marks
											valueLabelDisplay="auto"
										/>
									</Box>
									<Box>
										<Typography
											sx={{ fontWeight: 700, mb: 1 }}
										>
											How important is downtime?
										</Typography>
										<Slider
											value={values.downtime}
											onChange={(e, v) =>
												setValue("downtime", v)
											}
											min={1}
											max={5}
											marks
											valueLabelDisplay="auto"
										/>
									</Box>
									<Typography sx={{ fontWeight: 700 }}>
										Choose your ideal vacation day
									</Typography>
									{renderChips(
										[
											"Museum + café",
											"Beach + drinks",
											"Hiking + exploring",
											"Shopping + food",
											"Clubbing + nightlife",
										],
										"idealDay",
									)}
								</Stack>
							)}

							{step === 5 && (
								<Stack spacing={3}>
									<Typography sx={{ fontWeight: 700 }}>
										How do you handle planning?
									</Typography>
									{renderChips(
										[
											"I plan everything",
											"I like shared planning",
											"I prefer following along",
										],
										"planningStyle",
									)}
									<Typography sx={{ fontWeight: 700 }}>
										What frustrates you most while
										traveling?
									</Typography>
									{renderChips(
										[
											"Being late",
											"Overspending",
											"Overplanning",
											"Constant schedule changes",
											"Too much partying",
											"Not enough flexibility",
											"Messiness",
											"Slow decision making",
										],
										"frustrations",
										true,
									)}
									<Box>
										<Typography
											sx={{ fontWeight: 700, mb: 1 }}
										>
											How social are you on trips?
										</Typography>
										<Slider
											value={values.socialLevel}
											onChange={(e, v) =>
												setValue("socialLevel", v)
											}
											min={1}
											max={5}
											marks
											valueLabelDisplay="auto"
										/>
									</Box>
									<Typography sx={{ fontWeight: 700 }}>
										Do you need alone time while traveling?
									</Typography>
									{renderChips(
										["Frequently", "Sometimes", "Rarely"],
										"aloneTime",
									)}
								</Stack>
							)}

							{step === 6 && (
								<Stack spacing={3}>
									<TextField
										label="Food preferences or restrictions"
										value={values.foodNotes}
										onChange={(e) =>
											setValue(
												"foodNotes",
												e.target.value,
											)
										}
										fullWidth
									/>
									<Box>
										<Typography
											sx={{ fontWeight: 700, mb: 1 }}
										>
											How adventurous are you with food?
										</Typography>
										<Slider
											value={values.foodAdventure}
											onChange={(e, v) =>
												setValue("foodAdventure", v)
											}
											min={1}
											max={5}
											marks
											valueLabelDisplay="auto"
										/>
									</Box>
									<Typography sx={{ fontWeight: 700 }}>
										Alcohol on trips?
									</Typography>
									{renderChips(
										[
											"Love nightlife",
											"Casual drinks",
											"Rarely drink",
											"Don't drink",
										],
										"alcohol",
									)}
								</Stack>
							)}

							{step === 7 && (
								<Stack spacing={3}>
									<TextField
										label="Top dream destinations"
										value={values.dreamDestinations}
										onChange={(e) =>
											setValue(
												"dreamDestinations",
												e.target.value,
											)
										}
										fullWidth
									/>
									<Typography sx={{ fontWeight: 700 }}>
										Which climates do you prefer?
									</Typography>
									{renderChips(
										[
											"Tropical",
											"Cold/snowy",
											"Mild",
											"Desert",
											"Doesn't matter",
										],
										"climates",
										true,
									)}
									<Typography sx={{ fontWeight: 700 }}>
										Which regions interest you?
									</Typography>
									{renderChips(
										[
											"Europe",
											"Asia",
											"South America",
											"Caribbean",
											"US/Canada",
											"Africa",
											"Australia/New Zealand",
										],
										"regions",
										true,
									)}
								</Stack>
							)}

							{step === 8 && (
								<Stack spacing={3}>
									<Typography sx={{ fontWeight: 700 }}>
										Typical trip availability
									</Typography>
									{renderChips(
										[
											"Weekend only",
											"Long weekends",
											"1 week trips",
											"2+ weeks",
										],
										"availability",
									)}
									<Typography sx={{ fontWeight: 700 }}>
										How far ahead do you prefer planning?
									</Typography>
									{renderChips(
										[
											"Last minute",
											"1–2 months",
											"3–6 months",
											"Far in advance",
										],
										"planningHorizon",
									)}
									<TextField
										multiline
										minRows={3}
										label="Favorite trip you've ever taken"
										value={values.favoriteTrip}
										onChange={(e) =>
											setValue(
												"favoriteTrip",
												e.target.value,
											)
										}
										fullWidth
									/>
								</Stack>
							)}
						</Box>
					</Box>

					<Divider />
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							p: 3,
						}}
					>
						<Button
							variant="text"
							onClick={prevStep}
							disabled={step === 0}
							sx={{ textTransform: "none" }}
						>
							Previous
						</Button>
						<Button
							variant="contained"
							size="large"
							onClick={
								step === totalSteps ? handleSubmit : nextStep
							}
							sx={{
								backgroundColor: PURPLE,
								textTransform: "none",
								py: 1.4,
							}}
						>
							{step === totalSteps ? "Finish survey" : "Next"}
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}
