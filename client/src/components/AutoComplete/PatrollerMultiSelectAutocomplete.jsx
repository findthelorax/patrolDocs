import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const PatrollerAutocomplete = ({ selectedPatrollers, setSelectedPatrollers }) => {
	const { patrollers } = useContext(MountainContext);

	return (
		<Autocomplete
			multiple
			id="patroller-autocomplete"
			value={selectedPatrollers}
			options={patrollers}
			onChange={(event, newValues) => {
				setSelectedPatrollers(newValues);
			}}
			getOptionLabel={(option) => option.name}
			autoHighlight
			autoSelect
			noOptionsText="No Patrollers Found"
			renderInput={(params) => <TextField {...params} label="Patrollers" placeholder="Select Patrollers" />}
		/>
	);
};

export default PatrollerAutocomplete;