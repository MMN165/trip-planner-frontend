import { Box, Typography } from "@mui/material";
import { PURPLE_DARK } from "../../constants";

function Settings({ profile }) {
    return (
        <Box sx={{ color: "#fff" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Manage Account
            </Typography>
            <Typography sx={{ color: PURPLE_DARK }}>
                Name: {profile?.meta?.name}
            </Typography>
            <Typography sx={{ color: PURPLE_DARK }}>
                Email: {profile?.meta?.email}
            </Typography>
        </Box>
    );
}

export default Settings;