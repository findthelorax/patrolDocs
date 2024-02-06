import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { MountainProvider } from '../contexts/MountainContext';
// import { DateProvider } from '../contexts/DateContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme/theme';
// import { ThemeContext } from '../contexts/ThemeContext';
// import { SnackbarProvider } from '../contexts/SnackbarContext';

// import MainLayout from '../pages/MainLayout';

function App() {
	const [darkMode, setDarkMode] = useState(false);

	const theme = darkMode ? darkTheme : lightTheme;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* <SnackbarProvider> */}
				{/* <ThemeContext.Provider value={{ darkMode, setDarkMode }}> */}
					{/* <DateProvider> */}
						{/* <MountainProvider> */}
							<Router>
								<Routes>
									{/* <Route path="*" element={<MainLayout />} /> */}
								</Routes>
							</Router>
						{/* </MountainProvider> */}
					{/* </DateProvider> */}
				{/* </ThemeContext.Provider> */}
			{/* </SnackbarProvider> */}
		</ThemeProvider>
	);
}

export default App;
