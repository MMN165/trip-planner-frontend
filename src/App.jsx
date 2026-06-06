import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import Trips from "./pages/Trips";
import Itinerary from "./pages/Itinerary";
import { BG } from "./constants";

const theme = createTheme({
	palette: {
		primary: {
			main: "#D0BFFF",
		},
	},
	typography: {
		fontFamily: '"Segoe UI Emoji", system-ui, "Segoe UI", sans-serif',
	},
});

function App() {
	const [screen, setScreen] = useState("home");
	const [selectedTrip, setSelectedTrip] = useState(null);

	const handleNav = (screen, data) => {
		if (screen === "itinerary" && data) {
			setSelectedTrip(data); // must be set first
		}
		setScreen(screen);
	};

	return (
		<ThemeProvider theme={theme}>
			<Header onNav={handleNav} />
			{screen === "login" && <Login onNav={handleNav} />}
			{screen === "signup" && <Signup onNav={handleNav} />}
			{screen === "home" && <Home />}
			{screen === "profile" && <Profile onNav={handleNav} />}
			{screen === "trips" && <Trips onNav={handleNav} />}
			{screen === "itinerary" && (
				<Itinerary trip={selectedTrip} onNav={handleNav} />
			)}
		</ThemeProvider>
	);
}

export default App;
