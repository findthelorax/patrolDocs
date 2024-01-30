import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as liftApi } from '../../api/LiftAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddLineCheckForm = () => {
	const [description, setDescription] = useState('');
	const [selectedLift, setSelectedLift] = useState(null);
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, lifts, patrollers } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const lineCheck = { description };
			await liftApi.createLineCheck(selectedMountain.id, selectedLift.id, lineCheck);
			setDescription('');
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
						<Autocomplete
							options={lifts || []}
							getOptionLabel={(option) => option.name}
							value={selectedLift}
							onChange={(event, newValue) => {
								setSelectedLift(newValue);
							}}
							renderInput={(params) => <TextField {...params} label="Lift" required />}
						/>
						<Autocomplete
							options={patrollers || []}
							getOptionLabel={(option) => option.name}
							value={selectedPatroller}
							onChange={(event, newValue) => {
								setSelectedPatroller(newValue);
							}}
							renderInput={(params) => <TextField {...params} label="Patroller" required />}
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

export default AddLineCheckForm;