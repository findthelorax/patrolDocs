import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { api as trailApi } from '../../api/TrailAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddTrailForm = () => {
    const [name, setName] = useState('');
    const [areaId, setAreaId] = useState('');
    const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const trail = { name, areaId };
            await trailApi.addTrail(selectedMountain.id, trail);
            setName('');
            setAreaId('');
            fetchMountains();
        } catch (error) {
            console.error('Error adding trail', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <FormControl variant="outlined" required>
                            <InputLabel id="area-label">Area</InputLabel>
                            <Select
                                labelId="area-label"
                                value={areaId}
                                onChange={(e) => setAreaId(e.target.value)}
                                label="Area"
                            >
                                {/* {areas.map((area) => (
                                    <MenuItem key={area.id} value={area.id}>
                                        {area.name}
                                    </MenuItem>
                                ))} */}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained">Add Trail</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddTrailForm;