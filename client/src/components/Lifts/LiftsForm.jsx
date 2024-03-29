import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { api as liftApi } from '../../api/LiftAPI';
import { MountainContext } from '../../contexts/MountainContext';

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
	const { selectedMountain, fetchMountains, lifts, patrollers } = useContext(MountainContext);

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
						<Autocomplete
							options={lifts || []}
							getOptionLabel={(option) => option.name}
							value={selectedLift}
							onChange={(event, newValue) => {
								setSelectedLift(newValue);
							}}
                            autoHighlight
							autoSelect
							noOptionsText="No lifts available"
							renderInput={(params) => <TextField {...params} label="Lift" required />}
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