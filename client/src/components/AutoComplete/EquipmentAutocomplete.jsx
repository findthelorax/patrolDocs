import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const EquipmentAutocomplete = ({ equipment, setEquipment }) => {
    const { equipments = [] } = useContext(MountainContext);
    
    return (
        <Autocomplete
            id="equipment-autocomplete"
            options={equipments || []}
            getOptionLabel={(option) => option.name}
            value={equipment}
            onChange={(event, newValue) => {
                setEquipment(newValue);
            }}
            autoHighlight
            autoSelect
            noOptionsText="No equipment available"
            renderInput={(params) => <TextField {...params} label="Equipment" required />}
        />
    );
};

export default EquipmentAutocomplete;