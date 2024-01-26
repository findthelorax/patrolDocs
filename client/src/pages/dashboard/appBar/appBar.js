import React, { useContext } from 'react';
import {
	Toolbar,
	IconButton,
	Badge,
	Avatar,
	Divider,
	Box,
	AppBar,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MountainContext } from '../../../contexts/MountainContext';

function SearchAppBar() {
	const { mountains, selectMountain } = useContext(MountainContext);
	return (
		<AppBar>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
				<FormControl variant="outlined">
					<InputLabel id="mountain-label">Mountain</InputLabel>
					<Select labelId="mountain-label" onChange={(e) => selectMountain(e.target.value)} label="Mountain">
						{Array.isArray(mountains) &&
							mountains.map((mountain) => (
								<MenuItem key={mountain.id} value={mountain.id}>
									{mountain.name}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Toolbar>
		</AppBar>
	);
}

export default SearchAppBar;
