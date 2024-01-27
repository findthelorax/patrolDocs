import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as incidentLogApi } from '../../api/IncidentLog';
import { MountainContext } from '../../contexts/MountainContext';

const AddIncidentLogForm = () => {
    const [title, setTitle] = useState('');
    const [patrollers, setPatrollers] = useState([]);
    const { selectedMountain, patrollerList } = useContext(MountainContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const log = { title, mountainId: selectedMountain.id, patrollers };
            await incidentLogApi.createLog(log);
            setTitle('');
            setPatrollers([]);
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
                        <Autocomplete
                            multiple
                            id="patrollers-autocomplete"
                            options={patrollerList}
                            getOptionLabel={(option) => option.name}
                            value={patrollers}
                            onChange={(event, newValue) => {
                                setPatrollers(newValue);
                            }}
                            autoHighlight
                            autoSelect
                            renderInput={(params) => <TextField {...params} label="Patrollers" required />}
                        />
                        <Button type="submit" variant="contained">Add Log</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddIncidentLogForm;