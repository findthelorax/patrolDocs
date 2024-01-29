import React, { useState, useContext, useEffect } from 'react';
import {
	TextField,
	Button,
	Box,
	Card,
	CardContent,
	Stack,
	MenuItem,
	InputLabel,
	FormControl,
	Modal,
	Snackbar,
	Alert,
	Autocomplete,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MountainContext } from '../../contexts/MountainContext';

const AddAreaForm = () => {
	const [name, setName] = useState('');
	const [selectedMountain, setSelectedMountain] = useState(null);
	const { mountains, fetchMountains, api } = useContext(MountainContext);
	const theme = useTheme();

	const [openModal, setOpenModal] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleCloseModal = () => setOpenModal(false);
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
								options={mountains}
								getOptionLabel={(option) => option.name}
								value={selectedMountain}
								onChange={(event, newValue) => {
									setSelectedMountain(newValue);
								}}
								autoHighlight
								autoSelect
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