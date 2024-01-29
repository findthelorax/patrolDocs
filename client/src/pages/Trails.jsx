import React from 'react';
import { Grid } from '@mui/material';
import TrailsTable from '../components/Trails/TrailsTable';

function Trails() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<TrailsTable />
		</Grid>
	);
}

export default Trails;