import React from 'react';
import { Grid } from '@mui/material';
import IncidentTable from '../components/Incidents/IncidentTable';

function IncidentLogs() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			
			<Grid item xs={12}>
				<IncidentTable />
			</Grid>

		</Grid>
	);
}

export default IncidentLogs;