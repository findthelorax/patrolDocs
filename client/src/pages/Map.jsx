import React from 'react';
import { Grid } from '@mui/material';
// import MountainMap from '../components/Mountain/MountainMap';
// import MountainMapBox from '../components/Mountain/MountainMapBox';
// import MountainMapGoogle from '../components/Mountain/MountainMap';

function Map() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			{/* <Grid item xs={12}>
				<MountainMapBox />
			</Grid> */}
			{/* <Grid item xs={12}>
				<MountainMap />
			</Grid> */}
			{/* <Grid item xs={12}>
				<MountainMapGoogle />
			</Grid> */}
		</Grid>
	);
}

export default Map;
