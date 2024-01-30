import React from 'react';
import { Grid } from '@mui/material';
import AddMountainForm from '../components/Mountain/MountainForm';
import AddAreaForm from '../components/Areas/AreaForm';

function Dashboard() {
	return (
		<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddMountainForm />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<AddAreaForm />
			</Grid>

		</Grid>
	);
}

export default Dashboard;