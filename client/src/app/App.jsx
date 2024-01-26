import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MountainProvider } from '../contexts/MountainContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

import MainLayout from '../pages/MainLayout';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<MountainProvider>
					<Routes>
						<Route path="*" element={<MainLayout />} />
					</Routes>
				</MountainProvider>
			</Router>
		</ThemeProvider>
	);
}

export default App;