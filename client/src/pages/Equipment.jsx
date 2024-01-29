import React from 'react';
import { Grid } from '@mui/material';
import EquipmentTable from '../components/Equipment/EquipmentTable';

function Equipment() {
    return (
        <Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
            <EquipmentTable />
        </Grid>
    );
}

export default Equipment;