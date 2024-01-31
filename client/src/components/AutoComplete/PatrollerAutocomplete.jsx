import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const PatrollerAutocomplete = ({ selectedPatroller, setSelectedPatroller }) => {
	const { patrollers } = useContext(MountainContext);

	return (
		<Autocomplete
			id="patroller-autocomplete"
			value={selectedPatroller}
			options={patrollers}
			onChange={(event, newValue) => {
				setSelectedPatroller(newValue);
			}}
			getOptionLabel={(option) => option.name}
			autoHighlight
			autoSelect
			noOptionsText="No Patrollers Found"
			renderInput={(params) => <TextField {...params} label="Patroller" placeholder="Select Patroller" />}
		/>
	);
};

export default PatrollerAutocomplete;
