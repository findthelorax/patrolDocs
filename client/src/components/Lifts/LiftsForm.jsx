import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { api as liftApi } from '../../api/LiftAPI';
import { MountainContext } from '../../contexts/MountainContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

const AddLiftForm = ({ coordinates }) => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lift = { name, area: selectedArea._id, coordinates };
			await liftApi.createLift(selectedMountain.id, lift);
			setName('');
			setSelectedArea(null);
			fetchMountains();
		} catch (error) {
			console.error('Error creating lift', error);
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
	const { selectedMountain, fetchMountains, lifts } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lineCheck = { description };
			await liftApi.createLineCheck(selectedMountain.id, selectedLift.id, lineCheck);
			setDescription('');
			setSelectedLift(null);
			setSelectedPatroller(null);
			fetchMountains();
		} catch (error) {
			console.error('Error creating line check', error);
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
						<PatrollerAutocomplete />
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
