import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchAppBar from './dashboard/appBar/appBar';
import { PermanentDrawerLeft } from './dashboard/drawer/Drawer';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';

function MainLayout() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const drawerWidth = 240;

	return (
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
					<SearchAppBar open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle}/>
					<Box component="main" sx={{ p: { xs: 2, sm: 3 } }}>
						<Routes>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="*" element={<Dashboard />} />
						</Routes>
					</Box>
				</Box>
			</Box>
	);
}

export default MainLayout;