import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import SearchAppBar from '../components/Dashboard/AppBar/AppBar';
import { PermanentDrawerLeft } from '../components/Dashboard/Drawer/Drawer';
import Footer from '../components/Dashboard/Footer/Footer';
import SnackbarAlert from '../components/SnackbarAlert/SnackbarAlert';
import AppRoutes from './AppRoutes';

function MainLayout() {
	const theme = useTheme();
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

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
						setOpenSnackbar={setOpenSnackbar}
						setSnackbarMessage={setSnackbarMessage}
					/>
					<Box component="main" sx={theme.layoutStyles.main}>
					<AppRoutes setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
					</Box>
					<SnackbarAlert open={openSnackbar} handleClose={handleCloseSnackbar} message={snackbarMessage} />
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}

export default MainLayout;