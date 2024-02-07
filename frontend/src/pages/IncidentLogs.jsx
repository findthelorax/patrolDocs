import React from 'react';
import { Grid } from '@mui/material';
import IncidentTable from '../components/Incidents/IncidentTable';
import IncidentLogTable from '../components/IncidentLogs/IncidentLogTable';
import IncidentLogForm from '../components/IncidentLogs/IncidentLogForm';

function IncidentLogs() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={12} m={12} lg={12} xl={12}>
				<IncidentTable />
			</Grid>
			<Grid item xs={12} sm={12} m={12} lg={12} xl={12}>
				<IncidentLogForm />
			</Grid>
			<Grid item xs={12} sm={12} m={12} lg={12} xl={12}>
				<IncidentLogTable />
			</Grid>
		</Grid>
	);
}

export default IncidentLogs;
