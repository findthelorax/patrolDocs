import React from 'react';
import { Grid } from '@mui/material';
import AddHutForm from '../components/Huts/HutsForm';
import AddHutLogForm from '../components/Huts/HutLogForm';
import HutsTable from '../components/Huts/HutsTable';

function Huts() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddHutForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddHutLogForm />
			</Grid>
			<Grid item xs={12}>
				<HutsTable />
			</Grid>
		</Grid>
	);
}

export default Huts;
