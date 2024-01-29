import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as liftApi } from '../../api/LiftAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddLineCheckForm = () => {
    const [description, setDescription] = useState('');
    const { selectedMountain, selectedLift, fetchMountains } = useContext(MountainContext);

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
                        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline />
                        <Button type="submit" variant="contained">Add Line Check</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddLineCheckForm;