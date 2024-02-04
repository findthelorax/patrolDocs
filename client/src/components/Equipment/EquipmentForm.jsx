import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Select, MenuItem, Typography } from '@mui/material';
import { api as equipmentApi } from '../../api/EquipmentAPI';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import LocationField from '../Location/EquipmentLocationField';
import { EquipmentTypes } from '../../helpers/constants';

const AddEquipmentForm = () => {
	const [type, setType] = useState('');
	const idNumber = useRef();
	const description = useRef();
	const [locationType, setLocationType] = useState(null);
	const [location, setLocation] = useState(null);
	const [otherLocation, setOtherLocation] = useState('');
	const { selectedMountain, fetchMountains } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const locationValue = locationType === 'Other' ? otherLocation : { type: locationType, name: location.name, id: location._id};
		const equipment = { type, idNumber: idNumber.current.value, description: description.current.value, location: locationValue };
		try {
			await equipmentApi.createEquipment(selectedMountain._id, equipment);
			setType('');
			idNumber.current.value = '';
			description.current.value = '';
			setLocationType(null);
			setLocation(null);
			setOtherLocation('');
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${equipment.name}:${equipment.idNumber} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${equipment.name}:${equipment.idNumber}`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<Select value={type} onChange={(e) => setType(e.target.value)} required displayEmpty>
							<MenuItem value="" disabled>
								<Typography color="text.secondary" variant="body2">
									Type
								</Typography>
							</MenuItem>
							{Object.values(EquipmentTypes).map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
						<TextField
							label="IDNumber"
							inputRef={idNumber}
							required
							onKeyDown={(event) => {
								if (!/[0-9]/.test(event.key) && event.key !== 'Tab') {
									event.preventDefault();
								}
							}}
						/>
                        <TextField label="Description" inputRef={description} required multiline />

						<LocationField
							locationType={locationType}
							setLocationType={setLocationType}
							location={location}
							setLocation={setLocation}
							otherLocation={otherLocation}
							setOtherLocation={setOtherLocation}
						/>
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
	const [equipmentS, setEquipmentS] = useState(null);
	const { selectedMountain, fetchMountains, equipment } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const [selectedEquipment, setSelectedEquipment] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await equipmentApi.createEquipmentLog(selectedMountain.id, equipmentS.id, { log });
			setLog('');
			setEquipmentS(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage('Equipment log created successfully');
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating equipment log', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating equipment log');
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<MountainAutocomplete
							options={equipment}
							selectedValue={selectedEquipment}
							setSelectedValue={setSelectedEquipment}
							label="Equipment"
						/>
						<PatrollerAutocomplete />
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
