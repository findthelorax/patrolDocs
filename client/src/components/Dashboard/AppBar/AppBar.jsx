import React, { useState, useContext, useEffect } from 'react';
import { Toolbar, IconButton, Badge, Avatar, Divider, Box, AppBar, Typography } from '@mui/material';
import { Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MountainContext } from '../../../contexts/MountainContext';
import { DateContext } from '../../../contexts/DateContext';
import DarkModeButton from './LightDarkButton';
import MountainDropdown from './MountainDropdown';
import DatePicker from './DatePicker';
import { drawerWidth } from '../../../helpers/constants';

function SearchAppBar({ setOpenSnackbar, setSnackbarMessage }) {
    const { mountains, selectMountain, fetchPatrolDispatcherForDate, patrolDispatcher, setPatrolDispatcher } = useContext(MountainContext);
    const { selectedDate, setSelectedDate } = useContext(DateContext);
	const [selectedMountain, setSelectedMountain] = useState(null);
	const [openDatePicker, setOpenDatePicker] = useState(false);

	
    useEffect(() => {
        if (selectedDate && selectedMountain) {
            fetchPatrolDispatcherForDate(selectedDate)
                .then((data) => setPatrolDispatcher(data))
                .catch((error) => console.error(error));
        }
    }, [selectedDate, selectedMountain, fetchPatrolDispatcherForDate, setPatrolDispatcher]);

	useEffect(() => {
		const storedDate = localStorage.getItem('selectedDate');
		if (storedDate) {
			setSelectedDate(new Date(storedDate));
		}
		const storedMountainId = localStorage.getItem('selectedMountainId');
		if (storedMountainId && mountains) {
			const storedMountain = mountains.find((mountain) => mountain._id === storedMountainId);
			setSelectedMountain(storedMountain || null);
			if (storedMountain) {
				selectMountain(storedMountain);
			}
		}
	}, [mountains]);

	return (
		<AppBar
			sx={{
				marginLeft: drawerWidth,
				width: `calc(102.1% - ${drawerWidth}px)`,
			}}
		>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<DarkModeButton />
					<Box sx={{ marginLeft: 2 }}>
						<DatePicker openDatePicker={openDatePicker} setOpenDatePicker={setOpenDatePicker} />
					</Box>
					{patrolDispatcher ? (
						<Typography variant="h6">
							Patrol Dispatcher: {patrolDispatcher.name}
						</Typography>
					) : (
						<Typography variant="h6">
							No patrol dispatcher.
						</Typography>
					)}
				</Box>
				<MountainDropdown
					selectedMountain={selectedMountain}
					setSelectedMountain={setSelectedMountain}
					setOpenSnackbar={setOpenSnackbar}
					setSnackbarMessage={setSnackbarMessage}
				/>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton color="inherit" component={Link} to="/notifications">
						<Badge badgeContent={4} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton color="inherit" component={Link} to="/profile">
						<Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
					</IconButton>
					<Divider orientation="vertical" flexItem />
					<IconButton color="inherit" component={Link} to="/settings">
						<SettingsIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default SearchAppBar;