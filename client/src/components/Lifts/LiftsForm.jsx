import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

const AddLiftForm = ({ coordinates }) => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas, api } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lift = { name, area: selectedArea._id, coordinates };
			await api.liftApi.createLift(selectedMountain._id, lift);
			setName('');
			setSelectedArea(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Lift created successfully');
		} catch (error) {
			console.error('Error creating lift', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating lift');
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
							Add Lift
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

const AddLineCheckForm = () => {
	const [description, setDescription] = useState('');
	const [selectedLift, setSelectedLift] = useState(null);
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, lifts, api } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lineCheck = { description };
			await api.liftApi.createLineCheck(selectedMountain._id, selectedLift.id, lineCheck);
			setDescription('');
			setSelectedLift(null);
			setSelectedPatroller(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Line check created successfully');
		} catch (error) {
			console.error('Error creating line check', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating line check');
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
					<MountainAutocomplete
							options={lifts}
							selectedValue={selectedLift}
							setSelectedValue={setSelectedLift}
							label="Lift"
						/>
						<PatrollerAutocomplete
							selectedPatroller={selectedPatroller}
							setSelectedPatroller={setSelectedPatroller}
						/>						
						<TextField
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							multiline
						/>
						<Button type="submit" variant="contained">
							Add Line Check
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export { AddLiftForm, AddLineCheckForm };
