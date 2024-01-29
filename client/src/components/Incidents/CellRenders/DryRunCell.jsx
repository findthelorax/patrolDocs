import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';

const DryRunCellRenderer = ({ value, rowIndex, api }) => {
    const isFirstRow = rowIndex === 0;
    const [checked, setChecked] = useState(value);

    useEffect(() => {
        setChecked(value);
    }, [value]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        api.applyTransaction({ update: [{ rowIndex, data: { ...api.getDisplayedRowAtIndex(rowIndex).data, dryRun: event.target.checked } }] });
    };

    return isFirstRow ? (
        <Checkbox
            checked={checked}
            onChange={handleChange}
        />
    ) : (
        value ? '✔️' : ''
    );
};

export default DryRunCellRenderer;