import React from 'react';
import { Grid } from '@mui/material';
import { AddAidRoomForm, AddAidRoomLogForm } from '../components/AidRooms/AidRoomForm';
import AidRoomsTable from '../components/AidRooms/AidRoomsTable';

function FirstAidRooms({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddAidRoomForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddAidRoomLogForm />
			</Grid>
			<Grid item xs={12}>
				<AidRoomsTable />
			</Grid>
		</Grid>
	);
}

export default FirstAidRooms;
