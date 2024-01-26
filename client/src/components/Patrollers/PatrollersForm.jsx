import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Select, MenuItem, Grid } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { api as patrollerApi } from '../../api/PatrollerAPI';

const AddPatrollerForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');
	const [mountainId, setMountainId] = useState('');
	const { mountains, fetchPatrollers } = useContext(MountainContext); // Use MountainContext

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const patroller = { firstName, lastName, position, mountainId }; // Associate patroller with selected mountain
			await patrollerApi.addPatroller(patroller);
			setFirstName('');
			setLastName('');
			setPosition('');
			setMountainId('');
			fetchPatrollers();
		} catch (error) {
			console.error('Error adding patroller', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									label="First Name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label="Last Name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</Grid>
						</Grid>
						<TextField
							label="Position"
							value={position}
							onChange={(e) => setPosition(e.target.value)}
							required
						/>
						<Button type="submit" variant="contained">
							Add Patroller
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddPatrollerForm;
