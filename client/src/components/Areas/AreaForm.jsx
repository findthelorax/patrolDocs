import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Card, CardContent, Stack, FormControl, Snackbar, Alert } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddAreaForm = () => {
	const [name, setName] = useState('');
	const [localSelectedMountain, setLocalSelectedMountain] = useState(null);
	const { mountains, fetchMountains, api, selectedMountain } = useContext(MountainContext);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleCloseSnackbar = () => setOpenSnackbar(false);

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
			setSnackbarMessage(`Area ${name} created successfully!`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating area', error);
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
			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarMessage.startsWith('Error') ? 'error' : 'success'}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Card>
	);
};

export default AddAreaForm;
