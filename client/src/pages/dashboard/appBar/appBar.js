import React from 'react';
import { Toolbar, IconButton, Badge, Avatar, Divider, Box, AppBar } from '@mui/material';
import { Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function SearchAppBar() {
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
			</Toolbar>
		</AppBar>
	);
}

export default SearchAppBar;