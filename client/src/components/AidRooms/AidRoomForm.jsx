import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { api as aidRoomApi } from '../../api/AidRoomAPI';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddAidRoomForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const aidRoom = { name, area: selectedArea._id };
			await aidRoomApi.createAidRoom(selectedMountain._id, aidRoom);
			setName('');
			setSelectedArea(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Aid room created successfully');
		} catch (error) {
			console.error('Error creating aidRoom', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating aid room');
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
							Add First Aid Room
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

const AddAidRoomLogForm = () => {
	const [log, setLog] = useState('');
	const [selectedFirstAidRoom, setSelectedFirstAidRoom] = useState(null);
	// eslint-disable-next-line
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, aidRooms } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await aidRoomApi.createAidRoomLog(selectedMountain._id, selectedFirstAidRoom._id, { log });
			setLog('');
			setSelectedFirstAidRoom(null);
			setSelectedPatroller(null);
			fetchMountains();
			setOpenSnackbar(true);
			setSnackbarMessage('Aid room log created successfully');
		} catch (error) {
			console.error('Error creating aidRoom log', error);
			setOpenSnackbar(true);
			setSnackbarMessage('Error creating aid room log');
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<MountainAutocomplete
							options={aidRooms}
							selectedValue={selectedFirstAidRoom}
							setSelectedValue={setSelectedFirstAidRoom}
							label="First Aid Room"
						/>
						<PatrollerAutocomplete />
						<TextField
							label="Log"
							value={log}
							onChange={(e) => setLog(e.target.value)}
							required
							multiline
						/>
						<Button type="submit" variant="contained">
							Add First Aid Room Log
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export { AddAidRoomForm, AddAidRoomLogForm };
