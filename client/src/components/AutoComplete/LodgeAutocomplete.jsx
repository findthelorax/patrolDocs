import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const LodgeAutocomplete = ({ selectedLodge, setSelectedLodge }) => {
    const { lodges } = useContext(MountainContext);

    return (
        <Autocomplete
            id="lodge-autocomplete"
            options={lodges || []}
            getOptionLabel={(option) => option && option.name ? option.name : ""}
            value={selectedLodge}
            onChange={(event, newValue) => {
                setSelectedLodge(newValue);
            }}
            autoHighlight
            autoSelect
            noOptionsText="No lodges available"
            renderInput={(params) => <TextField {...params} label="Lodge" required />}
        />
    );
};

export default LodgeAutocomplete;