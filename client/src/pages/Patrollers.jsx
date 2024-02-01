import React from 'react';
import { Grid } from '@mui/material';
import AddPatrollerForm from '../components/Patrollers/PatrollersForm';
import PatrollersTable from '../components/Patrollers/PatrollersTable';

function Patrollers({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddPatrollerForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<PatrollersTable />
			</Grid>
		</Grid>
	);
}

export default Patrollers;
