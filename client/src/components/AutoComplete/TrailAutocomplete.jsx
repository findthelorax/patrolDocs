import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const TrailAutocomplete = ({ selectedTrail, setSelectedTrail }) => {
    const { trails } = useContext(MountainContext);

    return (
        <Autocomplete
            id="trail-autocomplete"
            options={trails || []}
            getOptionLabel={(option) => option && option.name ? option.name : ""}
            value={selectedTrail}
            onChange={(event, newValue) => {
                setSelectedTrail(newValue);
            }}
            autoHighlight
            autoSelect
            noOptionsText="No trails available"
            renderInput={(params) => <TextField {...params} label="Trail" required />}
        />
    );
};

export default TrailAutocomplete;