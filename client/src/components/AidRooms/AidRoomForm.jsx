import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { api as aidRoomApi } from '../../api/AidRoomAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddAidRoomForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const aidRoom = { name, area: selectedArea._id };
			await aidRoomApi.createAidRoom(selectedMountain._id, aidRoom);
			setName('');
			setSelectedArea(null);
			fetchMountains(); // fetch the updated list of mountains
		} catch (error) {
			console.error('Error creating aidRoom', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<FormControl fullWidth required>
							<Autocomplete
								id="area-autocomplete"
								options={areas || []}
								getOptionLabel={(option) => option.name}
								value={selectedArea}
								onChange={(event, newValue) => {
									setSelectedArea(newValue);
								}}
								autoHighlight
								autoSelect
								noOptionsText="No areas available"
								renderInput={(params) => <TextField {...params} label="Area" required />}
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
	const [aidRoom, setAidRoom] = useState('');
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, aidRooms, patrollers } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await aidRoomApi.createAidRoomLog(selectedMountain._id, aidRoom._id, { log });
			setLog('');
			setAidRoom('');
			setSelectedPatroller(null);
			fetchMountains();
		} catch (error) {
			console.error('Error creating aidRoom log', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<Autocomplete
							id="aidRoom-autocomplete"
							options={aidRooms || []}
							getOptionLabel={(option) => (option ? option.name : '')}
							value={aidRoom}
							onChange={(event, newValue) => {
								setAidRoom(newValue);
							}}
							autoHighlight
							autoSelect
							noOptionsText="No First Aid Rooms available"
							renderInput={(params) => <TextField {...params} label="First Aid Room" required />}
						/>
						<Autocomplete
							options={patrollers || []}
							getOptionLabel={(option) => option.name}
							value={selectedPatroller}
							onChange={(event, newValue) => {
								setSelectedPatroller(newValue);
							}}
							autoHighlight
							autoSelect
							noOptionsText="No patrollers available"
							renderInput={(params) => <TextField {...params} label="Patroller" required />}
						/>
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
