import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { api as hutApi } from '../../api/HutAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddHutForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { selectedMountain, fetchMountains } = useContext(MountainContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const hut = { name, description };
            await hutApi.addHut(selectedMountain.id, hut);
            setName('');
            setDescription('');
            fetchMountains(); // fetch the updated list of mountains
        } catch (error) {
            console.error('Error adding hut', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <Button type="submit" variant="contained">Add Hut</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

const AddHutLogForm = () => {
    const [log, setLog] = useState('');
    const [hutId, setHutId] = useState('');
    const { selectedMountain, fetchMountains, huts } = useContext(MountainContext); // Assume huts is available in MountainContext

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await hutApi.addHutLog(selectedMountain.id, hutId, { log });
            setLog('');
            setHutId('');
            fetchMountains();
        } catch (error) {
            console.error('Error adding hut log', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <FormControl variant="outlined" required>
                            <InputLabel id="hut-label">Hut</InputLabel>
                            <Select
                                labelId="hut-label"
                                value={hutId}
                                onChange={(e) => setHutId(e.target.value)}
                                label="Hut"
                            >
                                {/* {huts.map((hut) => (
                                    <MenuItem key={hut.id} value={hut.id}>
                                        {hut.name}
                                    </MenuItem>
                                ))} */}
                            </Select>
                        </FormControl>
                        <TextField label="Log" value={log} onChange={(e) => setLog(e.target.value)} required multiline />
                        <Button type="submit" variant="contained">Add Hut Log</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export { AddHutForm, AddHutLogForm };