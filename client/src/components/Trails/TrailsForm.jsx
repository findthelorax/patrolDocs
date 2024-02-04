import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, MenuItem } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddTrailForm = () => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const [difficulty, setDifficulty] = useState('');
	const [type, setType] = useState('');
	const { selectedMountain, areas, api, handleCreateTrail } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const name = nameRef.current.value;
			const trail = { name, areaId: selectedArea._id, difficulty, type };
			await handleCreateTrail(trail);
			nameRef.current.value = '';
			setSelectedArea(null);
			setDifficulty('');
			setType('');
			setSnackbarSeverity('success');
			setSnackbarMessage(`${trail.name} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating trail', error);
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating trail`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" inputRef={nameRef} required />
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
