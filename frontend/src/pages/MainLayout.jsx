import React, { useState, useContext } from 'react';
import { Box, useTheme } from '@mui/material';
import SearchAppBar from '../components/Dashboard/AppBar/AppBar';
import { PermanentDrawerLeft } from '../components/Dashboard/Drawer/Drawer';
import Footer from '../components/Dashboard/Footer/Footer';
import AppRoutes from './AppRoutes';
import { SnackbarContext } from '../contexts/SnackbarContext'; // Import SnackbarContext

function MainLayout() {
	const theme = useTheme();
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	 // eslint-disable-next-line
	const { openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage } = useContext(SnackbarContext);

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const drawerWidth = 240;

	return (
		<Box sx={theme.layoutStyles.mainLayout}>
			<Box sx={theme.layoutStyles.innerLayout}>
				<PermanentDrawerLeft open={isDrawerOpen} handleDrawerClose={handleDrawerToggle} />
				<Box
					sx={{
						...theme.layoutStyles.content,
						width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`,
					}}
				>
					<SearchAppBar
						open={isDrawerOpen}
						handleDrawerToggle={handleDrawerToggle}
					/>
					<Box component="main" sx={theme.layoutStyles.main}>
						<AppRoutes />
					</Box>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}

export default MainLayout;