import React, { useState } from 'react';
import { Grid } from '@mui/material';
import MountainMap from '../components/Mountain/MountainMapGoogle';
import AddMountainForm from '../components/Mountain/MountainForm';
import AddAreaForm from '../components/Mountain/AreaForm';
// import AddLodgeForm from '../components/Lodges/LodgesForm';
import { AddHutForm, AddHutLogForm } from '../components/Huts/HutsForm';
import AddLiftForm from '../components/Lifts/LiftsForm';
import AddTrailForm from '../components/Trails/TrailsForm';
import AddPatrollerForm from '../components/Patrollers/PatrollersForm';

function Dashboard() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			{/* <Grid item xs={12}>
				<MountainMap />
			</Grid> */}
			<Grid item xs={12}>
				<AddMountainForm />
			</Grid>
			<Grid item xs={12}>
				<AddAreaForm />
			</Grid>
			<Grid item xs={12}>
				<AddHutForm />
			</Grid>
			<Grid item xs={12}>
				<AddHutLogForm />
			</Grid>
			<Grid item xs={12}>
				<AddLiftForm />
			</Grid>
			<Grid item xs={12}>
				<AddTrailForm />
			</Grid>
			<Grid item xs={12}>
				<AddPatrollerForm />
			</Grid>
			{/* <Grid item xs={12}>
				<MountainMap />
			</Grid> */}
		</Grid>
	);
}

export default Dashboard;