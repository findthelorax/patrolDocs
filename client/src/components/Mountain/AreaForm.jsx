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
	Autocomplete
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MountainContext } from '../../contexts/MountainContext';

const AddAreaForm = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [selectedMountain, setSelectedMountain] = useState(null);
	const { mountains, fetchMountains, api } = useContext(MountainContext);
	const theme = useTheme();

	const [openModal, setOpenModal] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		if (mountains.length === 0) {
			setOpenModal(true);
			setOpenSnackbar(true);
		}
	}, [mountains]);

	const handleCloseModal = () => setOpenModal(false);
	const handleCloseSnackbar = () => setOpenSnackbar(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const area = { name, description };
			await api.addArea(selectedMountain._id, area);
			setName('');
			setDescription('');
			setSelectedMountain(null);
			fetchMountains();
		} catch (error) {
			console.error('Error adding area', error);
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
							style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}
						>
							Add Area
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddAreaForm;