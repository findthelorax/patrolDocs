import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { api as aidRoomApi } from '../../api/AidRoomAPI';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddAidRoomForm = () => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = nameRef.current.value;
		const aidRoom = { name, area: selectedArea._id };
		try {
			await aidRoomApi.createAidRoom(selectedMountain._id, aidRoom);
			nameRef.current.value = '';
			setSelectedArea(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${aidRoom.name} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error(`Error creating ${aidRoom.name}`, error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating aid room');
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
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await aidRoomApi.createAidRoomLog(selectedMountain._id, selectedFirstAidRoom._id, { log });
			setLog('');
			setSelectedFirstAidRoom(null);
			setSelectedPatroller(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage('Aid room log created successfully');
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating aidRoom log', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating aid room log');
			setOpenSnackbar(true);
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
