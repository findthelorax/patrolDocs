import React, { useContext } from 'react';
import { Select, MenuItem } from '@mui/material';
import { MountainContext } from '../../../contexts/MountainContext';

const PatrollerCellRenderer = (props) => {
    const { value, setValue } = props;

    // Get the list of patrollers from the context
    const { patrollers } = useContext(MountainContext);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Select value={value} onChange={handleChange}>
            {patrollers.map((patroller) => (
                <MenuItem key={patroller.id} value={patroller.name}>
                    {patroller.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default PatrollerCellRenderer;