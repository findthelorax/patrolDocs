import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const HutAutocomplete = ({ selectedHut, setSelectedHut }) => {
    const { huts } = useContext(MountainContext);

    return (
        <Autocomplete
            id="hut-autocomplete"
            options={huts || []}
            getOptionLabel={(option) => option && option.name ? option.name : ""}
            value={selectedHut}
            onChange={(event, newValue) => {
                setSelectedHut(newValue);
            }}
            autoHighlight
            autoSelect
            noOptionsText="No huts available"
            renderInput={(params) => <TextField {...params} label="Hut" required />}
        />
    );
};

export default HutAutocomplete;