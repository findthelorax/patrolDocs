import * as React from 'react';
import { ListItemButtonm, ListItemText, ListSubheader, ListItemIcon, ListItemButton } from '@mui/material';
import { AiOutlineDashboard } from 'react-icons/ai';
// import { StyledListSubheader, StyledListItemIcon } from '../../../styles/mainLayoutStyles';
import { Link } from 'react-router-dom';

export const MainListItems = () => (
	<React.Fragment>
		<ListSubheader component="div">Dashboard</ListSubheader>
		<ListItemButton component={Link} to="/dashboard">
			<ListItemIcon>
				<AiOutlineDashboard />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
	</React.Fragment>
);

export const SecondaryListItems = () => (
	<React.Fragment>
		<ListSubheader component="div">Logs</ListSubheader>
		<ListItemButton component={Link} to="/map">
			<ListItemIcon>
				<AiOutlineDashboard />
			</ListItemIcon>
			<ListItemText primary="Map" />
		</ListItemButton>
	</React.Fragment>
);

export const SettingsListItems = () => (
	<React.Fragment>
		<ListSubheader component="div">Settings</ListSubheader>
	</React.Fragment>
);