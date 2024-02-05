import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

const AddHutForm = () => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const { fetchMountains, areas, handleCreateHut } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = nameRef.current.value;
		const hut = { name, area: selectedArea._id };
		try {
			await handleCreateHut(hut);
			setSelectedArea(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${hut.name} created successfully`);
			setOpenSnackbar(true);
			nameRef.current.value = '';
		} catch (error) {
			console.error('Error creating hut', error);
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${hut.name}`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" inputRef={nameRef} required />
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
	const { selectedMountain, fetchMountains, huts, handleCreateHutLog } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await handleCreateHutLog(selectedMountain._id, selectedHut._id, { log });
			setLog(null);
			setSelectedHut(null);
			setSelectedPatroller(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage('Hut log created successfully');
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating hut log', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating hut log');
			setOpenSnackbar(true);
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
