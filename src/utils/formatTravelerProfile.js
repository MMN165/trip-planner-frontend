/**
 * buildTravelerProfile
 * Converts survey state into a clean JSON object for storage/updating.
 *
 * @param {object} values       - survey values state from Signup.jsx
 * @param {object} signupValues - { fullName, email } from the signup card
 * @returns {object} structured profile JSON
 */
export function buildTravelerProfile(values, signupValues) {
	return {
		preferences: {
			basics: {
				name: values.name || null,
				ageRange: values.ageRange || null,
				location: values.location || null,
			},
			experience: {
				tripTypes: values.tripTypes,
				travelPace: values.travelPace || null,
				wakeUp: values.wakeUp || null,
				downtime: values.downtime,
				idealDay: values.idealDay || null,
			},
			budget: {
				budgetLevel: values.budgetLevel || null,
				spendingStyle: values.spendingStyle || null,
			},
			foodAndLifestyle: {
				dietaryRestrictions: values.dietaryRestrictions || null,
				foodAdventure: values.foodAdventure,
				alcohol: values.alcohol || null,
			},
		},
	};
}
