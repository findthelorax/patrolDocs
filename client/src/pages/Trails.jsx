import React from 'react';
import { Grid } from '@mui/material';
import TrailsTable from '../components/Trails/TrailsTable';

function Trails() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12}>
				<TrailsTable />
			</Grid>
		</Grid>
	);
}

export default Trails;
