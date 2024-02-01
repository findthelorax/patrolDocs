import React from 'react';
import { Grid } from '@mui/material';
import { AddLiftForm, AddLineCheckForm } from '../components/Lifts/LiftsForm';

function Lifts({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddLiftForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddLineCheckForm />
			</Grid>
		</Grid>
	);
}

export default Lifts;