import { Box, Typography } from "@mui/material";
import { PURPLE_DARK } from "../../constants";

function TravelPreferences({ profile }) {
    return (
        <Box sx={{ color: "#fff" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Travel Preferences
            </Typography>
            <Typography sx={{ color: PURPLE_DARK }}>
            </Typography>
            <Typography sx={{ color: PURPLE_DARK }}>
                Travel Budget: {profile?.meta?.travelBudget || "N/A"}
            </Typography>
        </Box>
    );
}

export default TravelPreferences;

