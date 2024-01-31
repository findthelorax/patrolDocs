import React, { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import SearchAppBar from '../components/Dashboard/AppBar/AppBar';
import { PermanentDrawerLeft } from '../components/Dashboard/Drawer/Drawer';
import Dashboard from './Dashboard';
import Map from './Map';
import Patrollers from './Patrollers';
import IncidentLogs from './IncidentLogs';
import Areas from './Areas';
import Lifts from './Lifts';
import Trails from './Trails';
import Equipment from './Equipment';
import Lodges from './Lodges';
import Huts from './Huts';
import FirstAidRooms from './FirstAidRooms';
import { Routes, Route } from 'react-router-dom';
import Footer from '../components/Dashboard/Footer/Footer';

function MainLayout() {
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

	const AlertRef = React.forwardRef((props, ref) => (
		<MuiAlert elevation={6} variant="standard" {...props} ref={ref} />
	));

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Box sx={{ display: 'flex', width: '100%' }}>
				<PermanentDrawerLeft open={isDrawerOpen} handleDrawerClose={handleDrawerToggle} />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`,
						flexGrow: 1,
					}}
				>
					<SearchAppBar
						open={isDrawerOpen}
						handleDrawerToggle={handleDrawerToggle}
						setOpenSnackbar={setOpenSnackbar}
						setSnackbarMessage={setSnackbarMessage}
					/>
					<Box component="main" sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
						<Routes>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/map" element={<Map />} />
							<Route path="/incidentLogs" element={<IncidentLogs />} />
							<Route path="/areas" element={<Areas />} />
							<Route path="/firstAidRooms" element={<FirstAidRooms />} />
							<Route path="/patrollers" element={<Patrollers />} />
							<Route path="/huts" element={<Huts />} />
							<Route path="/lifts" element={<Lifts />} />
							<Route path="/trails" element={<Trails />} />
							<Route path="/lodges" element={<Lodges />} />
							<Route path="/equipment" element={<Equipment />} />
							<Route path="*" element={<Dashboard />} />
						</Routes>
					</Box>
					<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
						<AlertRef onClose={handleCloseSnackbar} severity="success">
							{snackbarMessage}
						</AlertRef>
					</Snackbar>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}

export default MainLayout;
