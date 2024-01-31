import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const AreaAutocomplete = ({ selectedArea, setSelectedArea }) => {
    const { areas } = useContext(MountainContext);

    return (
        <Autocomplete
            id="area-autocomplete"
            options={areas || []}
            getOptionLabel={(option) => option.name}
            value={selectedArea}
            onChange={(event, newValue) => {
                setSelectedArea(newValue);
            }}
            autoHighlight
            autoSelect
            noOptionsText="No Areas Found"
            renderInput={(params) => <TextField {...params} label="Area" required />}
        />
    );
};

export default AreaAutocomplete;