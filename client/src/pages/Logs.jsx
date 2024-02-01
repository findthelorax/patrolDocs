import React from 'react';
import { Grid } from '@mui/material';
import TrailLogsTable from '../components/Trails/TrailLogsTable';
import LiftLineChecksTable from '../components/Lifts/LiftLineChecksTable';
import HutLogsTable from '../components/Huts/HutLogsTable';
import EquipmentLogsTable from '../components/Equipment/EquipmentLogsTable';
import AidRoomLogsTable from '../components/AidRooms/AidRoomLogsTable';

function Logs({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<TrailLogsTable />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<LiftLineChecksTable />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<HutLogsTable />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<EquipmentLogsTable />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AidRoomLogsTable />
			</Grid>
		</Grid>
	);
}

export default Logs;
