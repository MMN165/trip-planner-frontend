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
		meta: {
			name: signupValues?.fullName || values.name || null,
			email: signupValues?.email || null,
			updatedAt: new Date().toISOString(),
		},
		basics: {
			name: values.name || null,
			ageRange: values.ageRange || null,
			location: values.location || null,
			passportStatus: values.passportStatus || null,
		},
		experience: {
			travelFrequency: values.travelFrequency || null,
			tripTypes: values.tripTypes,
		},
		budget: {
			budgetLevel: values.budgetLevel || null,
			spendingStyle: values.spendingStyle || null,
			lodging: values.lodging || null,
			shareRooms: values.shareRooms || null,
		},
		personality: {
			travelPace: values.travelPace || null,
			wakeUp: values.wakeUp || null,
			nightlife: values.nightlife,
			downtime: values.downtime,
			idealDay: values.idealDay || null,
		},
		groupDynamics: {
			planningStyle: values.planningStyle || null,
			frustrations: values.frustrations,
			socialLevel: values.socialLevel,
			aloneTime: values.aloneTime || null,
		},
		foodAndLifestyle: {
			foodNotes: values.foodNotes || null,
			foodAdventure: values.foodAdventure,
			alcohol: values.alcohol || null,
		},
		destinations: {
			dreamDestinations: values.dreamDestinations || null,
			climates: values.climates,
			regions: values.regions,
		},
		logistics: {
			availability: values.availability || null,
			planningHorizon: values.planningHorizon || null,
			favoriteTrip: values.favoriteTrip || null,
		},
	};
}

/**
 * profileToPromptText
 * Converts the stored JSON profile into a readable string for LLM injection.
 * Call this at prompt-build time, not at save time.
 *
 * @param {object} profile - output of buildTravelerProfile
 * @returns {string}
 */
export function profileToPromptText(profile) {
	const {
		basics,
		experience,
		budget,
		personality,
		groupDynamics,
		foodAndLifestyle,
		destinations,
		logistics,
	} = profile;

	const pick = (val) => val || "Not specified";
	const list = (arr) =>
		Array.isArray(arr) && arr.length > 0 ? arr.join(", ") : "Not specified";
	const scale = (val) => (val != null ? `${val}/5` : "Not specified");

	return `
TRAVELER PROFILE — ${pick(basics.name)}${basics.ageRange ? `, ${basics.ageRange}` : ""}${basics.location ? `, ${basics.location}` : ""}

EXPERIENCE & FREQUENCY
Travel frequency: ${pick(experience.travelFrequency)}.
Enjoys: ${list(experience.tripTypes)}.
Passport: ${pick(basics.passportStatus)}.

BUDGET
Budget level: ${pick(budget.budgetLevel)}.
Spending style: ${pick(budget.spendingStyle)}.
Preferred lodging: ${pick(budget.lodging)}.
Comfortable sharing rooms: ${pick(budget.shareRooms)}.

PERSONALITY
Travel pace: ${pick(personality.travelPace)}.
Wake-up time on trips: ${pick(personality.wakeUp)}.
Nightlife importance: ${scale(personality.nightlife)}.
Downtime importance: ${scale(personality.downtime)}.
Ideal vacation day: ${pick(personality.idealDay)}.

GROUP DYNAMICS
Planning style: ${pick(groupDynamics.planningStyle)}.
Travel frustrations: ${list(groupDynamics.frustrations)}.
Social level on trips: ${scale(groupDynamics.socialLevel)}.
Needs alone time: ${pick(groupDynamics.aloneTime)}.

FOOD & LIFESTYLE
Food notes: ${pick(foodAndLifestyle.foodNotes)}.
Food adventurousness: ${scale(foodAndLifestyle.foodAdventure)}.
Alcohol: ${pick(foodAndLifestyle.alcohol)}.

DESTINATIONS
Dream destinations: ${pick(destinations.dreamDestinations)}.
Preferred climates: ${list(destinations.climates)}.
Regions of interest: ${list(destinations.regions)}.

LOGISTICS
Trip length: ${pick(logistics.availability)}.
Planning horizon: ${pick(logistics.planningHorizon)}.
Favorite past trip: ${pick(logistics.favoriteTrip)}.
`.trim();
}

/**
 * buildTripRecsPrompt
 * Full LLM prompt from a stored profile JSON.
 *
 * @param {object} profile - output of buildTravelerProfile
 * @returns {string}
 */
export function buildTripRecsPrompt(profile) {
	const profileText = profileToPromptText(profile);

	return `You are a travel expert. Based on the traveler profile below, suggest 3 personalized trip ideas.

For each trip include:
- Destination and why it's a great fit for this traveler
- Suggested trip length and best time to visit
- 3–4 highlights or activities matched to their interests
- Any watch-outs based on their frustrations or preferences

Keep recommendations specific and practical. Avoid generic tourist advice.

---
${profileText}
---

Provide 3 trip recommendations:`;
}
