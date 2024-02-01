import React from 'react';
import { Grid } from '@mui/material';
import AddMountainForm from '../components/Mountain/MountainForm';
import AddAreaForm from '../components/Areas/AreaForm';
import AddTrailForm from '../components/Trails/TrailsForm';
import { AddAidRoomForm, AddAidRoomLogForm } from '../components/AidRooms/AidRoomForm';
import { AddEquipmentForm, AddEquipmentLogForm } from '../components/Equipment/EquipmentForm';
import { AddHutForm, AddHutLogForm } from '../components/Huts/HutsForm';
import { AddLiftForm, AddLineCheckForm } from '../components/Lifts/LiftsForm';
import { AddLodgeForm, AddLodgeLogForm } from '../components/Lodges/LodgesForm';
import AddPatrollerForm from '../components/Patrollers/PatrollersForm';

function Dashboard({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddMountainForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddAreaForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddTrailForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddAidRoomForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddEquipmentForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddHutForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddLiftForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddLodgeForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddPatrollerForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddAidRoomLogForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddEquipmentLogForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddHutLogForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddLodgeLogForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddLineCheckForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
			</Grid>
		</Grid>
	);
}

export default Dashboard;
