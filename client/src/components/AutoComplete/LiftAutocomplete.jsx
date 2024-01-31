import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const LiftAutocomplete = ({ selectedLift, setSelectedLift }) => {
    const { lifts } = useContext(MountainContext);

    return (
        <Autocomplete
            id="lift-autocomplete"
            options={lifts || []}
            getOptionLabel={(option) => option && option.name ? option.name : ""}
            value={selectedLift}
            onChange={(event, newValue) => {
                setSelectedLift(newValue);
            }}
            autoHighlight
            autoSelect
            noOptionsText="No lifts available"
            renderInput={(params) => <TextField {...params} label="Lift" required />}
        />
    );
};

export default LiftAutocomplete;