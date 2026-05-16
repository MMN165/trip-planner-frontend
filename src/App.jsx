import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";
import Home from "./pages/Home";

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
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Home />
		</ThemeProvider>
	);
}

export default App;
