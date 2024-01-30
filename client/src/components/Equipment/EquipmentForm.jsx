import React, { useState, useContext } from 'react';
import { Autocomplete, TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api as equipmentApi } from '../../api/EquipmentAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddEquipmentForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [locationType, setLocationType] = useState(null);
    const [location, setLocation] = useState(null);
    const [otherLocation, setOtherLocation] = useState('');
    const { selectedMountain, fetchMountains, huts, lodges, trails } = useContext(MountainContext);

    const locationTypes = ['Huts', 'First Aid Rooms', 'Trails', 'Other'];

    const locations = {
        'Huts': huts,
        'First Aid Rooms': lodges,
        'Trails': trails,
        'Other': [],
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const locationValue = locationType === 'Other' ? otherLocation : location;
            const equipment = { name, description, location: locationValue };
            await equipmentApi.createEquipment(selectedMountain.id, equipment);
            setName('');
            setDescription('');
            setLocationType(null);
            setLocation(null);
            setOtherLocation('');
            fetchMountains();
        } catch (error) {
            console.error('Error creating equipment', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            multiline
                        />
                        <Autocomplete
                            id="location-type-autocomplete"
                            options={locationTypes}
                            value={locationType}
                            onChange={(event, newValue) => {
                                setLocationType(newValue);
                                setLocation(null); // Reset the location when the type changes
                            }}
                            autoHighlight
                            autoSelect
                            noOptionsText="No location types available"
                            renderInput={(params) => <TextField {...params} label="Location Type" required />}
                        />
                        {locationType !== 'Other' ? (
                            <Autocomplete
                                id="location-autocomplete"
                                options={locationType ? locations[locationType] : []}
                                getOptionLabel={(option) => option.name}
                                value={location}
                                onChange={(event, newValue) => {
                                    setLocation(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                autoHighlight
                                autoSelect
                                noOptionsText={locationType ? `No ${locationType}s available` : "No locations available"}
                                renderInput={(params) => <TextField {...params} label={locationType || "Location"} required />}
                            />
                        ) : (
                            <TextField
                                label="Other Location"
                                value={otherLocation}
                                onChange={(e) => setOtherLocation(e.target.value)}
                                required
                            />
                        )}
                        <Button type="submit" variant="contained">
                            Add Equipment
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

const AddEquipmentLogForm = () => {
	const [log, setLog] = useState('');
	const [equipment, setEquipment] = useState(null);
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, equipments, patrollers } = useContext(MountainContext);
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await equipmentApi.createEquipmentLog(selectedMountain.id, equipment.id, { log });
			setLog('');
			setEquipment(null);
            setSelectedPatroller(null);
			fetchMountains(); // fetch the updated list of mountains
		} catch (error) {
			console.error('Error creating equipment log', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<Autocomplete
							id="equipment-autocomplete"
							options={equipments || []}
							getOptionLabel={(option) => option.name}
							value={equipment}
							onChange={(event, newValue) => {
								setEquipment(newValue);
							}}
							autoHighlight
							autoSelect
							noOptionsText="No equipment available"
							renderInput={(params) => <TextField {...params} label="Equipment" required />}
						/>
						<Autocomplete
							options={patrollers || []}
							getOptionLabel={(option) => option.name}
							value={selectedPatroller}
							onChange={(event, newValue) => {
								setSelectedPatroller(newValue);
							}}
							autoHighlight
							autoSelect
							noOptionsText="No patrollers available"
							renderInput={(params) => <TextField {...params} label="Patroller" required />}
						/>
						<TextField
							label="Log"
							value={log}
							onChange={(e) => setLog(e.target.value)}
							required
							multiline
						/>
						<Button type="submit" variant="contained">
							Add Equipment Log
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export { AddEquipmentForm, AddEquipmentLogForm };
