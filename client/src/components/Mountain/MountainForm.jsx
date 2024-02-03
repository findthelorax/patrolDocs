import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Card, CardContent, Stack } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import StateAutocomplete from '../AutoComplete/StatesAutocomplete';

const AddMountainForm = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState(null);
    const { fetchMountains, api } = useContext(MountainContext);
    const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const mountain = { 
                name, 
                location: {
                    city,
                    state
                }
            };
            await api.mountainApi.createMountain(mountain);
            setName('');
            setCity('');
            setState(null);
            fetchMountains();
            setOpenSnackbar(true);
            setSnackbarMessage('Mountain created successfully');
        } catch (error) {
            console.error('Error creating mountain', error);
            setOpenSnackbar(true);
            setSnackbarMessage('Error creating mountain');
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                        <StateAutocomplete state={state} setState={setState} />
                        <Button type="submit" variant="contained">Add Mountain</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddMountainForm;