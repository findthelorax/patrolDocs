import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MountainProvider } from '../contexts/MountainContext';
import { DateContext } from '../contexts/DateContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme/theme';
import { ThemeContext } from '../contexts/ThemeContext';

import MainLayout from '../pages/MainLayout';

function App() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [darkMode, setDarkMode] = useState(false);

	const theme = darkMode ? darkTheme : lightTheme;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
				<MountainProvider>
					<DateContext.Provider value={{ selectedDate, setSelectedDate }}>
						<Router>
							<Routes>
								<Route path="*" element={<MainLayout />} />
							</Routes>
						</Router>
					</DateContext.Provider>
				</MountainProvider>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

export default App;