import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const AppBarMountainAutocomplete = ({ selectedMountain, setSelectedMountain, setOpenSnackbar, setSnackbarMessage }) => {
	const { mountains } = useContext(MountainContext);

	const handleMountainChange = (event, newValue) => {
		if (newValue) {
			setSelectedMountain(newValue);
			setOpenSnackbar(true);
			setSnackbarMessage(`Mountain changed to ${newValue.name}`);
			localStorage.setItem('selectedMountainId', newValue._id);
		}
	};

	const value = selectedMountain || null;

	return (
		<Autocomplete
			id="mountain-autocomplete"
			options={mountains || []}
			getOptionLabel={(option) => (option && option.name ? option.name : '')}
			value={value}
			onChange={handleMountainChange}
			autoHighlight
			autoSelect
			noOptionsText="No mountains available"
			isOptionEqualToValue={(option, value) => (value ? option._id === value._id : false)}
			renderInput={(params) => <TextField {...params} label="Mountain" required />}
		/>
	);
};

export default AppBarMountainAutocomplete;
