import React from 'react';
import { Grid } from '@mui/material';
import EquipmentTable from '../components/Equipment/EquipmentTable';
import AddEquipmentForm from '../components/Equipment/EquipmentForm';
import AddEquipmentLogForm from '../components/Equipment/EquipmentLogForm';

function Equipment() {
    return (
        <Grid container rowSpacing={3} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
                <AddEquipmentForm />
            </Grid>
            <Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
                <AddEquipmentLogForm />
            </Grid>
            <EquipmentTable />
        </Grid>
    );
}

export default Equipment;