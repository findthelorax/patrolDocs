import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as liftApi } from '../../api/LiftAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddLiftForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { selectedMountain, fetchMountains } = useContext(MountainContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const lift = { name, description };
            await liftApi.createLift(selectedMountain.id, lift);
            setName('');
            setDescription('');
            fetchMountains(); // fetch the updated list of mountains
        } catch (error) {
            console.error('Error adding lift', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <Button type="submit" variant="contained">Add Lift</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddLiftForm;