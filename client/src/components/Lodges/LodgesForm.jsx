import React, { useState, useContext } from 'react';
import {
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
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import AreaAutocomplete from '../AutoComplete/AreaAutocomplete';
import LodgeAutocomplete from '../AutoComplete/LodgeAutocomplete';

const AddLodgeForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lodge = { name, area: selectedArea._id };
			await lodgeApi.createLodge(selectedMountain._id, lodge);
			setName('');
			setSelectedArea(null);
			fetchMountains();
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
							<AreaAutocomplete selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
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
	const [ log, setLog ] = useState('');
	const [ selectedLodge, setSelectedLodge ] = useState('');
	// eslint-disable-next-line
	const [ selectedPatroller, setSelectedPatroller ] = useState(null);
	const { selectedMountain, fetchMountains } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await lodgeApi.createLodgeLog(selectedMountain._id, selectedLodge._id, { log });
			setLog('');
			setSelectedLodge('');
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
					<LodgeAutocomplete
                            selectedLodge={selectedLodge}
                            setSelectedLodge={setSelectedLodge}
                        />
						<PatrollerAutocomplete />
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
