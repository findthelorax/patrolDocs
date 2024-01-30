import React, { useState, useContext, } from 'react';
import {
	TextField,
	Button,
	Box,
	Card,
	CardContent,
	Stack,
	FormControl,
	Snackbar,
	Alert,
	Autocomplete,
} from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const AddAreaForm = () => {
	const [name, setName] = useState('');
	const [selectedMountain, setSelectedMountain] = useState(null);
	const { mountains, fetchMountains, api } = useContext(MountainContext);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleCloseSnackbar = () => setOpenSnackbar(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const area = { name };
			await api.createArea(selectedMountain._id, area);
			setName('');
			setSelectedMountain(null);
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
							<Autocomplete
								id="mountain-autocomplete"
								options={mountains || []}
								getOptionLabel={(option) => option.name}
								value={selectedMountain}
								onChange={(event, newValue) => {
									setSelectedMountain(newValue);
								}}
								autoHighlight
								autoSelect
								noOptionsText="No mountains available"
								renderInput={(params) => <TextField {...params} label="Mountain" required />}
							/>
						</FormControl>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<Button
							type="submit"
							variant="contained"
						>
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