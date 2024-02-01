import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Select, MenuItem, Typography } from '@mui/material';
import { api as equipmentApi } from '../../api/EquipmentAPI';
import { MountainContext } from '../../contexts/MountainContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import LocationTypeAutocomplete from '../AutoComplete/LocationTypeAutocomplete';
import { EquipmentTypes } from '../../helpers/constants';

const AddEquipmentForm = () => {
	const [type, setType] = useState('');
	const [idNumber, setIDNumber] = useState('');
	const [description, setDescription] = useState('');
	const [locationType, setLocationType] = useState(null);
	const [location, setLocation] = useState(null);
	const [otherLocation, setOtherLocation] = useState('');
	const { selectedMountain, fetchMountains, locations } = useContext(MountainContext);
	const [selectedLocation, setSelectedLocation] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const locationValue = locationType === 'Other' ? otherLocation : location;
			const equipment = { type, idNumber, description, location: locationValue };
			await equipmentApi.createEquipment(selectedMountain.id, equipment);
			setType('');
			setIDNumber('');
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
						<Select value={type} onChange={(e) => setType(e.target.value)} required displayEmpty>
							<MenuItem value="" disabled>
								<Typography color="text.secondary" variant='body2'>Type</Typography>
							</MenuItem>
							{Object.values(EquipmentTypes).map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
						<TextField
							label="IDNumber"
							value={idNumber}
							onChange={(e) => setIDNumber(e.target.value)}
							required
							onKeyDown={(event) => {
								if (!/[0-9]/.test(event.key)) {
									event.preventDefault();
								}
							}}
						/>
						<TextField
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							multiline
						/>
						<LocationTypeAutocomplete
							locationType={locationType}
							setLocationType={setLocationType}
							setLocation={setLocation}
						/>
						{locationType !== 'Other' ? (
							<MountainAutocomplete 
								options={locations} 
								selectedValue={selectedLocation} 
								setSelectedValue={setSelectedLocation} 
								label="Location" 
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
	const [ equipmentS, setEquipmentS ] = useState(null);
	const { selectedMountain, fetchMountains, equipment } = useContext(MountainContext);
	const [selectedEquipment, setSelectedEquipment] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await equipmentApi.createEquipmentLog(selectedMountain.id, equipmentS.id, { log });
			setLog('');
			setEquipmentS(null);
			fetchMountains();
		} catch (error) {
			console.error('Error creating equipment log', error);
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
