import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
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
	const [screen, setScreen] = useState("home"); // "login" | "signup" | "home"
	return (
		<>
			<ThemeProvider theme={theme}>
				<Header onNav={setScreen} />
				{screen === "login" && <Login onNav={setScreen} />}
				{screen === "signup" && <Signup onNav={setScreen} />}
				{screen === "home" && <Home />}
			</ThemeProvider>
		</>
	);
}

export default App;
