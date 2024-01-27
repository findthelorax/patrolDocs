import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const IncidentTableDryRun = ({ displayName, newRow, setNewRow }) => {
    const handleDryRunChange = (event) => {
        if (event.target.checked) {
            setNewRow({
                ...newRow,
                onScene: null,
                stable: null,
                transport: null,
            });
        }
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={newRow.dryRun} onChange={handleDryRunChange} name="dryRun" />}
            label={displayName}
        />
    );
};

export default IncidentTableDryRun;