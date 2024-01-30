import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { api as hutApi } from '../../api/HutAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddHutForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const hut = { name, area: selectedArea._id };
			await hutApi.createHut(selectedMountain._id, hut);
			setName('');
			setSelectedArea(null);
			fetchMountains(); // fetch the updated list of mountains
		} catch (error) {
			console.error('Error creating hut', error);
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
	const [hut, setHut] = useState('');
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, huts, patrollers } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await hutApi.createHutLog(selectedMountain._id, hut._id, { log });
			setLog('');
			setHut('');
			setSelectedPatroller(null);
			fetchMountains();
		} catch (error) {
			console.error('Error creating hut log', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<Autocomplete
							id="hut-autocomplete"
							options={huts || []}
							getOptionLabel={(option) => (option ? option.name : '')}
							value={hut}
							onChange={(event, newValue) => {
								setHut(newValue);
							}}
							autoHighlight
							autoSelect
							noOptionsText="No huts available"
							renderInput={(params) => <TextField {...params} label="Hut" required />}
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
						/>{' '}
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
