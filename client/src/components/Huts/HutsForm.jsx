import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

const AddHutForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas, api } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const hut = { name, area: selectedArea._id };
			await api.hutApi.createHut(selectedMountain._id, hut);
			setName('');
			setSelectedArea(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Hut created successfully');
		} catch (error) {
			console.error('Error creating hut', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating hut');
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<FormControl fullWidth required>
							<MountainAutocomplete 
								options={areas} 
								selectedValue={selectedArea} 
								setSelectedValue={setSelectedArea} 
								label="Area" 
							/>						
							</FormControl>
						<Button type="submit" variant="contained">
							Add Hut
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

const AddHutLogForm = () => {
	const [log, setLog] = useState('');
	const [selectedHut, setSelectedHut] = useState(null);
	// eslint-disable-next-line
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, huts, api } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await api.hutApi.createHutLog(selectedMountain._id, selectedHut._id, { log });
			setLog(null);
			setSelectedHut(null);
			setSelectedPatroller(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Hut log created successfully');
		} catch (error) {
			console.error('Error creating hut log', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating hut log');
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<MountainAutocomplete
							options={huts}
							selectedValue={selectedHut}
							setSelectedValue={setSelectedHut}
							label="Hut"
						/>
						<PatrollerAutocomplete
							selectedPatroller={selectedPatroller}
							setSelectedPatroller={setSelectedPatroller}
						/>
						<TextField
							label="Log"
							value={log}
							onChange={(e) => setLog(e.target.value)}
							required
							multiline
						/>
						<Button type="submit" variant="contained">
							Add Hut Log
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export { AddHutForm, AddHutLogForm };
