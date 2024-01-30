import React, { useState, useContext } from 'react';
import {
	Autocomplete,
	TextField,
	Button,
	Box,
	Stack,
	Card,
	CardContent,
	FormControl,
} from '@mui/material';
import { api as lodgeApi } from '../../api/LodgeAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddLodgeForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lodge = { name, area: selectedArea._id };
			await lodgeApi.createLodge(selectedMountain._id, lodge);
			setName('');
			setSelectedArea(null);
			fetchMountains(); // fetch the updated list of mountains
		} catch (error) {
			console.error('Error creating lodge', error);
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
	const [lodge, setLodge] = useState('');
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, lodges, patrollers } = useContext(MountainContext);
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await lodgeApi.createLodgeLog(selectedMountain._id, lodge._id, { log });
			setLog('');
			setLodge('');
			setSelectedPatroller(null);
			fetchMountains();
		} catch (error) {
			console.error('Error creating lodge log', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
							<Autocomplete
								id="lodge-autocomplete"
								options={lodges || []}
								getOptionLabel={(option) => option ? option.name : ""}
								value={lodge}
								onChange={(event, newValue) => {
									setLodge(newValue);
								}}
								autoHighlight
								autoSelect
								noOptionsText="No lodges available"
								renderInput={(params) => <TextField {...params} label="Lodge" required />}
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
						/>						<TextField
							label="Log"
							value={log}
							onChange={(e) => setLog(e.target.value)}
							required
							multiline
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
