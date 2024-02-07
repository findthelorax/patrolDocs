import React from 'react';
import { Grid } from '@mui/material';
import AddMountainForm from '../components/Mountain/MountainForm';
import AddAreaForm from '../components/Areas/AreaForm';
// import AddTrailForm from '../components/Trails/TrailsForm';
// import AddEquipmentForm from '../components/Equipment/EquipmentForm';
// import AddHutForm from '../components/Huts/HutsForm';
// import { AddLiftForm } from '../components/Lifts/LiftsForm';
// import AddPatrollerForm from '../components/Patrollers/PatrollersForm';
// import { AddLodgeForm } from '../components/Lodges/LodgesForm';
// import AddAidRoomForm from '../components/AidRooms/AidRoomForm';

function Settings() {
	return (
		<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddMountainForm />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddAreaForm />
			</Grid>
			{/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddLiftForm />
			</Grid> */}
			{/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddTrailForm />
			</Grid> */}
			{/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddAidRoomForm />
			</Grid> */}
			{/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddHutForm />
			</Grid> */}
			{/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddLodgeForm />
			</Grid> */}
			{/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddEquipmentForm />
			</Grid> */}
			{/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddPatrollerForm />
			</Grid> */}
		</Grid>
	);
}

export default Settings;
