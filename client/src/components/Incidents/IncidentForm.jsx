import * as React from 'react';
import { useState } from 'react';
import { Button, Box, Checkbox, FormControlLabel, Card, CardContent } from '@mui/material';
import { format } from 'date-fns';
import PatrollerAutocomplete from '../AutoComplete/PatrollerMultiSelectAutocomplete';
import IncidentField from './IncidentField';
import LocationField from '../Location/LocationField';
import TimePickerField from './TimePickerField';

const IncidentForm = ({ newRow, setNewRow, handleInputChange, handleCheckboxChange, handleSubmit, handlePatrollerChange, selectedPatrollers, setSelectedPatrollers }) => {
	// eslint-disable-next-line
	const [gridApi, setGridApi] = useState(null);
	const [locationType, setLocationType] = useState('Trails');
	const [location, setLocation] = useState(null);
	const [otherLocation, setOtherLocation] = useState('');

	const handleTimeChange = (name, time) => {
		if (time !== null) {
			const formattedTime = format(time, 'HH:mm:ss');
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
				<TimePickerField label="Call Time" name="callTime" value={newRow.callTime} handleTimeChange={handleTimeChange} />

				<LocationField
					locationType={locationType}
					setLocationType={setLocationType}
					location={location}
					setLocation={setLocation}
					setNewRow={setNewRow}
					otherLocation={otherLocation}
					setOtherLocation={setOtherLocation}
				/>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<IncidentField newRow={newRow} setNewRow={setNewRow} handleInputChange={handleInputChange} />

					<PatrollerAutocomplete
						selectedPatrollers={selectedPatrollers}
						setSelectedPatrollers={setSelectedPatrollers}
						handlePatrollerChange={handlePatrollerChange}
					/>
				</Box>
				<TimePickerField
					label="On Scene"
					name="onScene"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<TimePickerField
					label="Stable"
					name="stable"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<TimePickerField
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
