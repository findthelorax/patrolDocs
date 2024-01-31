import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const MountainAutocomplete = ({ selectedMountain, setSelectedMountain, setOpenSnackbar, setSnackbarMessage }) => {
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
            getOptionLabel={(option) => option && option.name ? option.name : ""}
            value={selectedMountain}
            onChange={handleMountainChange}
            autoHighlight
            autoSelect
            noOptionsText="No mountains available"
            renderInput={(params) => 
                <TextField 
                    {...params} 
                    label="Mountain" 
                    required 
                />
            }
        />
    );
};

export default MountainAutocomplete;