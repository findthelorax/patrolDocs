import * as React from 'react';
import { ListItemText, ListItemIcon, ListItemButton, Divider } from '@mui/material';
import { GiMushroomHouse, GiTrail } from 'react-icons/gi';
import { MdSpaceDashboard, MdFoodBank, MdOutlineSledding, MdSnowmobile } from 'react-icons/md';
import { FaMap, FaSkiing } from 'react-icons/fa';
import { PiFirstAidDuotone, PiReadCvLogoDuotone } from 'react-icons/pi';
import { TbBuildingHospital, TbAerialLift } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export const MainListItems = () => (
	<>
		<ListItemButton component={Link} to="/dashboard">
			<ListItemIcon>
				<MdSpaceDashboard />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton component={Link} to="/map">
			<ListItemIcon>
				<FaMap />
			</ListItemIcon>
			<ListItemText primary="Map" />
		</ListItemButton>
	</>
);

export const SecondaryListItems = () => (
	<>
		<Divider />
		<ListItemButton component={Link} to="/incidentLogs">
			<ListItemIcon>
				<PiFirstAidDuotone />
			</ListItemIcon>
			<ListItemText primary="Incident Logs" />
		</ListItemButton>
		<ListItemButton component={Link} to="/areas">
			<ListItemIcon>
				<MdOutlineSledding />
			</ListItemIcon>
			<ListItemText primary="Areas" />
		</ListItemButton>
		<ListItemButton component={Link} to="/firstAidRooms">
			<ListItemIcon>
				<TbBuildingHospital />
			</ListItemIcon>
			<ListItemText primary="First Aid Rooms" />
		</ListItemButton>
		<ListItemButton component={Link} to="/patrollers">
			<ListItemIcon>
				<FaSkiing />
			</ListItemIcon>
			<ListItemText primary="Patrollers" />
		</ListItemButton>
	</>
);

export const SettingsListItems = () => (
	<>
		<Divider />
		<ListItemButton component={Link} to="/huts">
			<ListItemIcon>
				<GiMushroomHouse />
			</ListItemIcon>
			<ListItemText primary="Huts" />
		</ListItemButton>
		<ListItemButton component={Link} to="/lifts">
			<ListItemIcon>
				<TbAerialLift />
			</ListItemIcon>
			<ListItemText primary="Lifts" />
		</ListItemButton>
		<ListItemButton component={Link} to="/trails">
			<ListItemIcon>
				<GiTrail />
			</ListItemIcon>
			<ListItemText primary="Trails" />
		</ListItemButton>
		<ListItemButton component={Link} to="/lodges">
			<ListItemIcon>
				<MdFoodBank />
			</ListItemIcon>
			<ListItemText primary="Lodges" />
		</ListItemButton>
		<ListItemButton component={Link} to="/equipment">
			<ListItemIcon>
				<MdSnowmobile />
			</ListItemIcon>
			<ListItemText primary="Equipment" />
		</ListItemButton>
		<ListItemButton component={Link} to="/logs">
			<ListItemIcon>
				<PiReadCvLogoDuotone />
			</ListItemIcon>
			<ListItemText primary="Logs" />
		</ListItemButton>
	</>
);
