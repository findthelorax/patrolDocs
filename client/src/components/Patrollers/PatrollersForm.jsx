import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Container } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { api as patrollerApi } from '../../api/PatrollerAPI';

const AddPatrollerForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');
    // eslint-disable-next-line
    const { selectedMountain, fetchPatrollers } = useContext(MountainContext);
    const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const patroller = { firstName, lastName, position };
            await patrollerApi.createPatroller(selectedMountain._id, patroller);
			setFirstName('');
			setLastName('');
			setPosition('');
			fetchPatrollers();
            setOpenSnackbar(true);
            setSnackbarMessage('Patroller created successfully');
		} catch (error) {
			console.error('Error creating patroller', error);
            setOpenSnackbar(true);
            setSnackbarMessage('Error creating patroller');
		}
	};

	return (
		<Card>
        <CardContent>
            <Container maxWidth="sm">
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" fullWidth>
                                Add Patroller
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </CardContent>
    </Card>
	);
};

export default AddPatrollerForm;
