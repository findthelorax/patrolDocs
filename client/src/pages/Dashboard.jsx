import React from 'react';
import { Grid } from '@mui/material';
import TrailStatsCard from '../components/Trails/TrailStatsCard';
import LiftStatsCard from '../components/Lifts/LiftStatsCard';

function Dashboard() {
	return (
		<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={6}>
				<LiftStatsCard />
			</Grid>
			<Grid item xs={12} sm={6}>
				<TrailStatsCard />
			</Grid>
			<Grid item xs={12} sm={6}>
				Incident Logs
				Area Trail Checks
				Sort Trails, etc by Area(dropdown/hide in agGrid?)
				Open/Close a whole area
				

			</Grid>
		</Grid>
	);
}

export default Dashboard;