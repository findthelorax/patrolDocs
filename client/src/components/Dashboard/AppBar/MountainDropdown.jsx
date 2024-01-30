import React, { useContext } from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { MountainContext } from '../../../contexts/MountainContext';

function MountainDropdown({ selectedMountain, setSelectedMountain, setOpenSnackbar, setSnackbarMessage }) {
    const { mountains, selectMountain } = useContext(MountainContext);

    const handleMountainChange = (event, newValue) => {
        if (newValue) {
            setSelectedMountain(newValue);
            selectMountain(newValue);
            localStorage.setItem('selectedMountainId', newValue._id);
            setOpenSnackbar(true);
            setSnackbarMessage(`Mountain changed to ${newValue.name}`);
        }
    };

    return (
        <Autocomplete
            id="mountain-autocomplete"
            options={mountains || []}
            getOptionLabel={(option) => option.name}
            value={selectedMountain}
            onChange={handleMountainChange}
            autoHighlight
            autoSelect
            noOptionsText="No mountains available"
            renderInput={(params) => <TextField {...params} label="Mountain" required />}
        />
    );
}

export default MountainDropdown;