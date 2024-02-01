import * as React from 'react';
import { useState, useContext } from 'react';
import { Button, Box, TextField, Checkbox, FormControlLabel, Card, CardContent } from '@mui/material';
import { format } from 'date-fns';
import IncidentLogTimePicker from '../DatePickers/IncidentLogTimePicker';
import PatrollerAutocomplete from '../AutoComplete/PatrollerMultiSelectAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import LocationTypeAutocomplete from '../AutoComplete/LocationTypeAutocomplete';
import { MountainContext } from '../../contexts/MountainContext';
import { incidentFormStyles } from '../../theme/theme';

const IncidentForm = ({ newRow, setNewRow, handleInputChange, handleCheckboxChange, handleSubmit }) => {
	// eslint-disable-next-line
	const [gridApi, setGridApi] = useState(null);
	const [locationType, setLocationType] = useState('Trails');
	const [location, setLocation] = useState(null);
	const [otherLocation, setOtherLocation] = useState('');
	const [selectedPatrollers, setSelectedPatrollers] = useState([]);
	const { locations } = useContext(MountainContext);

	const handleTimeChange = (name, time) => {
		if (time !== null) {
			const formattedTime = format(time, 'HH:mm');
			setNewRow((prevState) => ({
				...prevState,
				[name]: formattedTime,
			}));
		} else {
			setNewRow((prevState) => ({
				...prevState,
				[name]: null,
			}));
		}
	};

	return (
		<Card>
			<CardContent style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
				<IncidentLogTimePicker label="Call Time" name="callTime" handleTimeChange={handleTimeChange} />
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<LocationTypeAutocomplete
						locationType={locationType}
						setLocationType={setLocationType}
						setLocation={setLocation}
						defaultLocationType="Trails"
					/>
					{locationType !== 'Other' ? (
						<MountainAutocomplete
							options={locations}
							selectedValue={location}
							setSelectedValue={(selectedLocation) => {
								if (selectedLocation) {
									setLocation(selectedLocation);
									setNewRow((prevState) => ({
										...prevState,
										location: selectedLocation.name,
									}));
								} else {
									setLocation(null);
									setNewRow((prevState) => ({
										...prevState,
										location: null,
									}));
								}
							}}
							label="Location"
						/>
					) : (
						<TextField
							label="Other Location"
							value={otherLocation}
							onChange={(e) => {
								setOtherLocation(e.target.value);
								setNewRow((prevState) => ({
									...prevState,
									location: e.target.value,
								}));
							}}
							required
							sx={incidentFormStyles}
						/>
					)}
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<TextField
						name="incident"
						value={newRow.incident}
						onChange={(e) => {
							handleInputChange(e);
							setNewRow((prevState) => ({
								...prevState,
								incident: e.target.value,
							}));
						}}
						placeholder="Incident"
						variant="outlined"
						sx={incidentFormStyles}
					/>
					<PatrollerAutocomplete
						selectedPatrollers={selectedPatrollers}
						setSelectedPatrollers={setSelectedPatrollers}
					/>
				</Box>
				<IncidentLogTimePicker
					label="On Scene"
					name="onScene"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<IncidentLogTimePicker
					label="Stable"
					name="stable"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<IncidentLogTimePicker
					label="Transport"
					name="transport"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<FormControlLabel
					control={<Checkbox checked={newRow.dryRun} onChange={handleCheckboxChange} name="dryRun" />}
					label="Dry Run"
				/>
				<Button onClick={handleSubmit} variant="contained">
					Submit
				</Button>
				<Button onClick={() => gridApi && gridApi.exportDataAsCsv()} variant="contained">
					Export
				</Button>
			</CardContent>
		</Card>
	);
};

export default IncidentForm;
