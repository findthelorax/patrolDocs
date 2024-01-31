import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { api as hutApi } from '../../api/HutAPI';
import { MountainContext } from '../../contexts/MountainContext';
import AreaAutocomplete from '../AutoComplete/AreaAutocomplete';
import HutAutocomplete from '../AutoComplete/HutAutocomplete';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

const AddHutForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const hut = { name, area: selectedArea._id };
			await hutApi.createHut(selectedMountain._id, hut);
			setName('');
			setSelectedArea(null);
			fetchMountains();
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
							<AreaAutocomplete
								selectedArea={selectedArea}
								setSelectedArea={setSelectedArea}
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
	const [selectedHut, setSelectedHut] = useState('');
	// eslint-disable-next-line
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await hutApi.createHutLog(selectedMountain._id, selectedHut._id, { log });
			setLog('');
			setSelectedHut(null);
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
						<HutAutocomplete selectedHut={selectedHut} setSelectedHut={setSelectedHut} />
						<PatrollerAutocomplete />
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
