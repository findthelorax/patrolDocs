import React from 'react';
import { Grid } from '@mui/material';
import TrailsTable from '../components/Trails/TrailsTable';
import AddTrailForm from '../components/Trails/TrailsForm';

function Trails() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddTrailForm />
			</Grid>
			<TrailsTable />
		</Grid>
	);
}

export default Trails;
