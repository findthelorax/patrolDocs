import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const LocationAutocomplete = ({ locationType, location, setLocation }) => {
	const { locations } = useContext(MountainContext);

	return (
		<Autocomplete
			id="location-autocomplete"
			options={locationType ? locations[locationType] : []}
			getOptionLabel={(option) => (option && option.name ? option.name : '')}
			value={location}
			onChange={(event, newValue) => {
				setLocation(newValue);
			}}
			isOptionEqualToValue={(option, value) => option._id === value._id}
			autoHighlight
			autoSelect
			noOptionsText={locationType ? `No ${locationType} available` : 'No locations available'}
			renderInput={(params) => (
				<TextField {...params} label={locationType || 'Location'} required />
			)}
		/>
	);
};

export default LocationAutocomplete;
