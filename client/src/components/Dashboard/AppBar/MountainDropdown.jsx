import React, { useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MountainContext } from '../../../contexts/MountainContext';

function MountainDropdown({ selectedMountain, setSelectedMountain, setOpenSnackbar, setSnackbarMessage }) {
    const { mountains, selectMountain } = useContext(MountainContext);

    const handleMountainChange = (event) => {
        const selectedMountain = mountains.find((mountain) => mountain._id === event.target.value);
        if (selectedMountain) {
            setSelectedMountain(selectedMountain);
            selectMountain(selectedMountain);
            localStorage.setItem('selectedMountainId', event.target.value);
            setOpenSnackbar(true);
            setSnackbarMessage(`Mountain changed to ${selectedMountain.name}`);
        } else {
            console.error(`No mountain found with ID ${event.target.value}`);
        }
    };

    return (
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="mountain-label" sx={{ fontSize: '0.75rem'}}>Mountain</InputLabel>
            <Select
                labelId="mountain-label"
                value={selectedMountain ? selectedMountain._id : ''}
                onChange={handleMountainChange}
                label="Mountain"
                sx={{ '& .MuiOutlinedInput-input': { padding: '10px 14px' } }}
            >
                {Array.isArray(mountains) &&
                    mountains.map((mountain) => (
                        <MenuItem key={mountain._id} value={mountain._id}>
                            {mountain.name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}

export default MountainDropdown;