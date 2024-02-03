import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Card, CardContent, Stack, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddAreaForm = () => {
	const [name, setName] = useState('');
	const [localSelectedMountain, setLocalSelectedMountain] = useState(null);
	const { mountains, fetchMountains, api, selectedMountain } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Check if a mountain is selected locally or in the context
		const mountainToUse = localSelectedMountain || selectedMountain;
		if (!mountainToUse) {
			setSnackbarMessage(`Please select a mountain.`);
			setOpenSnackbar(true);
			return;
		}
		try {
			const area = { name };
			const mountainId = mountainToUse._id;
			await api.mountainApi.createArea(mountainId, area);
			setName('');
			setLocalSelectedMountain(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`Area ${name} created successfully!`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating area', error);
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${name}`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<FormControl fullWidth required>
							<MountainAutocomplete
								options={mountains}
								selectedValue={localSelectedMountain}
								setSelectedValue={setLocalSelectedMountain}
								label="Mountain"
							/>
						</FormControl>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<Button type="submit" variant="contained">
							Add Area
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddAreaForm;
