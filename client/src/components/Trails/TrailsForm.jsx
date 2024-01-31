import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as trailApi } from '../../api/TrailAPI';
import { MountainContext } from '../../contexts/MountainContext';
import AreaAutocomplete from '../AutoComplete/AreaAutocomplete';

const AddTrailForm = () => {
	const [name, setName] = useState('');
	const [area, setArea] = useState(null);
	const { selectedMountain, fetchMountains } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const trail = { name, areaId: area._id };
			await trailApi.createTrail(selectedMountain._id, trail);
			setName('');
			setArea(null);
			fetchMountains();
		} catch (error) {
			console.error('Error creating trail', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<AreaAutocomplete area={area} setArea={setArea} />
						<Button type="submit" variant="contained">
							Add Trail
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddTrailForm;