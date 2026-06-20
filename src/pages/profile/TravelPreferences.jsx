import {
	Box,
	Typography,
	Paper,
	Stack,
	TextField,
	MenuItem,
	Button,
	Divider,
	Slider,
} from "@mui/material";
import { useState } from "react";
import { PURPLE } from "../../constants";
import API from "../../api";

function TravelPreferences({ profile }) {
	const preferences = profile?.preferences || {};

	const [formData, setFormData] = useState({
		name: preferences?.basics?.name || "",
		ageRange: preferences?.basics?.ageRange || "",
		location: preferences?.basics?.location || "",

		travelPace: preferences?.experience?.travelPace || "",
		wakeUp: preferences?.experience?.wakeUp || "",
		idealDay: preferences?.experience?.idealDay || "",
		downtime: preferences?.experience?.downtime || "",

		budgetLevel: preferences?.budget?.budgetLevel || "",
		spendingStyle: preferences?.budget?.spendingStyle || "",

		dietaryRestrictions:
			preferences?.foodAndLifestyle?.dietaryRestrictions || "",
		alcohol: preferences?.foodAndLifestyle?.alcohol || "",
		foodAdventure:
			preferences?.foodAndLifestyle?.foodAdventure || "",
	});


	const handleChange = (field) => (event) => {
		setFormData({
			...formData,
			[field]: event.target.value,
		});
	};


	const handleSave = async () => {
        console.log("save clicked");
		const updatedProfile = {
			...profile,

			preferences: {
				basics: {
					name: formData.name,
					ageRange: formData.ageRange,
					location: formData.location,
				},

				experience: {
					...preferences.experience,
					travelPace: formData.travelPace,
					wakeUp: formData.wakeUp,
					idealDay: formData.idealDay,
					downtime: formData.downtime,
				},

				budget: {
					budgetLevel: formData.budgetLevel,
					spendingStyle: formData.spendingStyle,
				},

				foodAndLifestyle: {
					dietaryRestrictions:
						formData.dietaryRestrictions,
					alcohol: formData.alcohol,
					foodAdventure:
						formData.foodAdventure,
				},
			},
		};

        const response = await API.put(`users/${profile.id}/preferences`, updatedProfile);
        console.log("Profile updated successfully!", response.data);
		console.log("Updated Profile:", updatedProfile);

	};


	const Dropdown = ({
		label,
		field,
		value,
		options,
	}) => (
		<TextField
			select
			fullWidth
			label={label}
			value={value}
			onChange={handleChange(field)}
		>
			{options.map((option) => (
				<MenuItem
					key={option}
					value={option}
				>
					{option}
				</MenuItem>
			))}
		</TextField>
	);


	const PreferenceSlider = ({
		label,
		field,
	}) => (
		<Box>
			<Typography
				sx={{
					fontWeight: 700,
					mb: 1,
				}}
			>
				{label}
			</Typography>

			<Slider
				value={
					Number(
						formData[field]
							?.split("/")[0]
					) || 3
				}
				onChange={(e, value) =>
					setFormData({
						...formData,
						[field]: `${value}/5`,
					})
				}
				min={1}
				max={5}
				marks
				valueLabelDisplay="auto"
				valueLabelFormat={(value) =>
					`${value}/5`
				}
			/>
		</Box>
	);



	return (
		<Box
			sx={{
				backgroundColor: "#f9fafb",
				minHeight: "100vh",
				p: 4,
			}}
		>
            <Paper
				elevation={3}
				sx={{
					maxWidth: 900,
					mx: "auto",
					borderRadius: 4,
					p: 5,
				}}
			>
				<Typography
					variant="h4"
					sx={{
						fontWeight: 800,
						mb: 4,
                        color: "#333",
					}}
				>
					Travel Preferences
				</Typography>


				<Stack spacing={3}>

					{/* EXPERIENCE */}
					<Typography fontWeight={700}>
						Travel Style
					</Typography>


					<Dropdown
						label="Travel Pace"
						field="travelPace"
						value={formData.travelPace}
						options={[
							"Packed itinerary",
							"Balanced",
							"Mostly spontaneous",
							"Relax and wander",
						]}
					/>


					<Dropdown
						label="Wake Up Time"
						field="wakeUp"
						value={formData.wakeUp}
						options={[
							"Before 7am",
							"7–9am",
							"9–11am",
							"Noon+",
						]}
					/>


					<Dropdown
						label="Ideal Vacation Day"
						field="idealDay"
						value={formData.idealDay}
						options={[
							"Museum + café",
							"Beach + drinks",
							"Hiking + exploring",
							"Shopping + food",
							"Clubbing + nightlife",
						]}
					/>


					<PreferenceSlider
						label="How important is downtime?"
						field="downtime"
					/>


					<Divider />


					{/* BUDGET */}
					<Typography fontWeight={700}>
						Budget
					</Typography>


					<Dropdown
						label="Travel Budget"
						field="budgetLevel"
						value={formData.budgetLevel}
						options={[
							"Budget traveler ($)",
							"Moderate ($$)",
							"Comfortable ($$$)",
							"Luxury ($$$$)",
						]}
					/>


					<Dropdown
						label="Spending Style"
						field="spendingStyle"
						value={formData.spendingStyle}
						options={[
							"I'll spend to maximize experiences",
							"I balance cost and comfort",
							"I try to save where possible",
							"Cheapest option always",
						]}
					/>


					<Divider />


					{/* FOOD */}
					<Typography fontWeight={700}>
						Food & Lifestyle
					</Typography>


					<TextField
						label="Dietary Restrictions"
						value={
							formData.dietaryRestrictions
						}
						onChange={handleChange(
							"dietaryRestrictions"
						)}
						fullWidth
					/>


					<PreferenceSlider
						label="Food Adventure Level"
						field="foodAdventure"
					/>


					<Dropdown
						label="Alcohol Preference"
						field="alcohol"
						value={formData.alcohol}
						options={[
							"Love nightlife",
							"Casual drinks",
							"Rarely drink",
							"Don't drink",
						]}
					/>


					<Button
						variant="contained"
						size="large"
						onClick={handleSave}
						sx={{
							backgroundColor: PURPLE,
							textTransform: "none",
							py: 1.4,
							mt: 2,
						}}
					>
						Save Changes
					</Button>

				</Stack>
			</Paper>
		</Box>
	);
}


export default TravelPreferences;