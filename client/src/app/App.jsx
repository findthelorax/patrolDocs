import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MountainProvider } from '../contexts/MountainContext';
import { DateProvider } from '../contexts/DateContext'; // Import DateProvider instead of DateContext
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme/theme';
import { ThemeContext } from '../contexts/ThemeContext';

import MainLayout from '../pages/MainLayout';

function App() {
	const [darkMode, setDarkMode] = useState(false);

	const theme = darkMode ? darkTheme : lightTheme;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
				<MountainProvider>
					<DateProvider>
						<Router>
							<Routes>
								<Route path="*" element={<MainLayout />} />
							</Routes>
						</Router>
					</DateProvider>
				</MountainProvider>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

export default App;