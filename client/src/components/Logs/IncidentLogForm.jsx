import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as incidentLogApi } from '../../api/IncidentLog';
import { MountainContext } from '../../contexts/MountainContext';

const AddIncidentLogForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { selectedMountain } = useContext(MountainContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const log = { title, description, mountainId: selectedMountain.id };
            await incidentLogApi.createLog(log);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding log', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline />
                        <Button type="submit" variant="contained">Add Log</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddIncidentLogForm;