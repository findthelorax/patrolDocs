import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as equipmentApi } from '../../api/EquipmentAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddEquipmentForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { selectedMountain, fetchMountains } = useContext(MountainContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const equipment = { name, description };
            await equipmentApi.createEquipment(selectedMountain.id, equipment);
            setName('');
            setDescription('');
            fetchMountains(); // fetch the updated list of mountains
        } catch (error) {
            console.error('Error adding equipment', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline />
                        <Button type="submit" variant="contained">Add Equipment</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

const AddEquipmentLogForm = () => {
    const [log, setLog] = useState('');
    const [equipment, setEquipment] = useState(null);
    const { selectedMountain, fetchMountains, equipments } = useContext(MountainContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await equipmentApi.addEquipmentLog(selectedMountain.id, equipment.id, { log });
            setLog('');
            setEquipment(null);
            fetchMountains(); // fetch the updated list of mountains
        } catch (error) {
            console.error('Error adding equipment log', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <Autocomplete
                            id="equipment-autocomplete"
                            options={equipments}
                            getOptionLabel={(option) => option.name}
                            value={equipment}
                            onChange={(event, newValue) => {
                                setEquipment(newValue);
                            }}
                            autoHighlight
                            autoSelect
                            renderInput={(params) => <TextField {...params} label="Equipment" required />}
                        />
                        <TextField label="Log" value={log} onChange={(e) => setLog(e.target.value)} required multiline />
                        <Button type="submit" variant="contained">Add Equipment Log</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export { AddEquipmentForm, AddEquipmentLogForm };