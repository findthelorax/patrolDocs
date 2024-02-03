import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddLodgeForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas, api } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lodge = { name, area: selectedArea._id };
			await api.lodgeApi.createLodge(selectedMountain._id, lodge);
			setName('');
			setSelectedArea(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Lodge created successfully');
		} catch (error) {
			console.error('Error creating lodge', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating lodge');
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
							Add Lodge
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

const AddLodgeLogForm = () => {
	const [log, setLog] = useState('');
	const [selectedLodge, setSelectedLodge] = useState(null);
	// eslint-disable-next-line
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, lodges, api } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await api.lodgeApi.createLodgeLog(selectedMountain._id, selectedLodge._id, { log });
			setLog('');
			setSelectedLodge('');
			setSelectedPatroller(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Lodge log created successfully');
		} catch (error) {
			console.error('Error creating lodge log', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating lodge log');
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<MountainAutocomplete
							options={lodges}
							selectedValue={selectedLodge}
							setSelectedValue={setSelectedLodge}
							label="Lodge"
						/>
						<PatrollerAutocomplete
							selectedPatroller={selectedPatroller}
							setSelectedPatroller={setSelectedPatroller}
						/>
						<Button type="submit" variant="contained">
							Add Lodge Log
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export { AddLodgeForm, AddLodgeLogForm };
