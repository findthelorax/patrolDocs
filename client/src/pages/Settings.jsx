import React from 'react';
import { Grid } from '@mui/material';
import AddMountainForm from '../components/Mountain/MountainForm';
import AddAreaForm from '../components/Mountain/AreaForm';
// import AddLodgeForm from '../components/Lodges/LodgesForm';
import { AddHutForm, AddHutLogForm } from '../components/Huts/HutsForm';
import AddLiftForm from '../components/Lifts/LiftsForm';
import AddTrailForm from '../components/Trails/TrailsForm';
import AddPatrollerForm from '../components/Patrollers/PatrollersForm';

function Settings() {
	return (
		<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddMountainForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddAreaForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddHutForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddHutLogForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddLiftForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddTrailForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddPatrollerForm />
			</Grid>
		</Grid>
	);
}

export default Settings;