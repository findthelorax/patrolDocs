import React from 'react';
import { Grid } from '@mui/material';
import { AddHutForm, AddHutLogForm } from '../components/Huts/HutsForm';
import HutsTable from '../components/Huts/HutsTable';

function Huts({ setOpenSnackbar, setSnackbarMessage }) {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddHutForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<AddHutLogForm />
			</Grid>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
				<HutsTable />
			</Grid>
		</Grid>
	);
}

export default Huts;
