import React from 'react';
import { Grid } from '@mui/material';
import { AddLodgeForm, AddLodgeLogForm } from '../components/Lodges/LodgesForm';

function Lodges({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddLodgeForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddLodgeLogForm />
			</Grid>
		</Grid>
	);
}

export default Lodges;
