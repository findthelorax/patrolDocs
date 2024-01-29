import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Card, CardContent, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const AddMountainForm = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState(null);
    const { fetchMountains, api } = useContext(MountainContext);

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
            await api.createMountain(mountain);
            setName('');
            setCity('');
            setState(null);
            fetchMountains();
        } catch (error) {
            console.error('Error creating mountain', error);
        }
    };

    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    
    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                        <Autocomplete
                            value={state}
                            onChange={(event, newValue) => {
                                setState(newValue);
                            }}
                            options={states}
                            autoHighlight
                            autoSelect
                            renderInput={(params) => <TextField {...params} label="State" required />}
                        />
                        <Button type="submit" variant="contained">Add Mountain</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddMountainForm;