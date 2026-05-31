import { Box, Typography } from "@mui/material";
import { PURPLE_DARK } from "../../constants";

function YourTrips({ profile }) {
    return (
        <Box sx={{ color: "#fff" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Your Trips
            </Typography>
            <Typography sx={{ color: PURPLE_DARK }}>
                Trips
            </Typography>
            <Typography sx={{ color: PURPLE_DARK }}>

            </Typography>
        </Box>
    );
}

export default YourTrips;