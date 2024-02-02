import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, MenuItem } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddTrailForm = ({ setOpenSnackbar, setSnackbarMessage }) => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const [difficulty, setDifficulty] = useState('');
	const [type, setType] = useState('');
	const { selectedMountain, areas, api } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const trail = { name, areaId: selectedArea._id, difficulty, type };
			await api.trailApi.createTrail(selectedMountain._id, trail);
			setName('');
			setSelectedArea(null);
			setDifficulty('');
			setType('');
			setSnackbarMessage(`${trail.name} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating trail', error);
			setSnackbarMessage(`Error creating trail`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<MountainAutocomplete
							options={areas}
							selectedValue={selectedArea}
							setSelectedValue={setSelectedArea}
							label="Area"
						/>
						<TextField
							select
							label="Difficulty"
							value={difficulty}
							onChange={(e) => setDifficulty(e.target.value)}
							required
						>
							<MenuItem value={'green'}>Green</MenuItem>
							<MenuItem value={'blue'}>Blue</MenuItem>
							<MenuItem value={'black'}>Black</MenuItem>
							<MenuItem value={'double black'}>Double Black</MenuItem>
						</TextField>
						<TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} required>
							<MenuItem value={'glades'}>Glades</MenuItem>
							<MenuItem value={'moguls'}>Moguls</MenuItem>
							<MenuItem value={'natural'}>Natural</MenuItem>
							<MenuItem value={'race'}>Race</MenuItem>
							<MenuItem value={'park'}>Park</MenuItem>
							<MenuItem value={'groomed'}>Groomed</MenuItem>
						</TextField>
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
