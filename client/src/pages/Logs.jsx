import React from 'react';
import { Grid } from '@mui/material';
import TrailLogsTable from '../components/Trails/TrailLogsTable';
import LiftLineChecksTable from '../components/Lifts/LiftLineChecksTable';
import HutLogsTable from '../components/Huts/HutLogsTable';
import EquipmentLogsTable from '../components/Equipment/EquipmentLogsTable';
import AidRoomLogsTable from '../components/AidRooms/AidRoomLogsTable';
import { AddLineCheckForm } from '../components/Lifts//LiftsForm';
import { AddHutLogForm } from '../components/Huts/HutsForm';
import { AddEquipmentLogForm } from '../components/Equipment/EquipmentForm';
import { AddAidRoomLogForm } from '../components/AidRooms/AidRoomForm';

function Logs({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<TrailLogsTable />
			</Grid>
			<Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
					<LiftLineChecksTable setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<AddLineCheckForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
			</Grid>
			<Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
					<HutLogsTable setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<AddHutLogForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
			</Grid>
			<Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
					<EquipmentLogsTable setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<AddEquipmentLogForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
			</Grid>
			<Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
					<AidRoomLogsTable setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<AddAidRoomLogForm setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Logs;
