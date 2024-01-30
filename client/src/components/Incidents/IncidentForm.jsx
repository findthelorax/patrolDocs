import React from 'react';
import {
    Button,
    TextField,
    Checkbox,
    MenuItem,
    FormControl,
    FormControlLabel,
    InputLabel,
    Select,
    Card,
    CardContent,
} from '@mui/material';
import { MdAccessTime } from 'react-icons/md';
import Autocomplete from '@mui/material/Autocomplete';
import InputMask from 'react-input-mask';
import { format, parse } from 'date-fns';

const IncidentForm = ({
    newRow,
    setNewRow,
    handleTimestamp,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    locationOptions,
    patrollers,
}) => {

    const [gridApi, setGridApi] = useState(null);
    
	return (
			<Card>
				<CardContent style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
					<Button onClick={() => handleTimestamp('time')} variant="contained">
						<MdAccessTime />
					</Button>
					<TextField
						name="time"
						value={
							/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newRow.time)
								? format(parse(newRow.time, 'HH:mm', new Date()), 'hh:mm a')
								: newRow.time
						}
						onChange={handleInputChange}
						placeholder="Time"
						variant="outlined"
						size="small"
						style={{ width: '75px' }}
						InputProps={{
							inputComponent: InputMask,
							inputProps: {
								mask: '99:99',
								maskChar: null,
							},
						}}
					/>
					<TextField
						name="incident"
						value={newRow.incident}
						onChange={handleInputChange}
						placeholder="Incident"
						variant="outlined"
						size="small"
						style={{ width: '100px' }}
					/>
					<Autocomplete
						value={newRow.location}
						onChange={(event, newValue) => {
							setNewRow((prevState) => ({
								...prevState,
								location: newValue,
							}));
						}}
						freeSolo
						options={locationOptions}
						style={{ width: '250px' }}
						renderInput={(params) => (
							<TextField {...params} variant="outlined" placeholder="Select a location" size="small" />
						)}
					/>
					<FormControl variant="outlined" size="small" style={{ width: '100px' }}>
						<InputLabel>Patroller</InputLabel>
						<Select name="patroller" value={newRow.patroller} onChange={handleInputChange}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{patrollers &&
								patrollers.map((patroller) => (
									<MenuItem key={patroller.id} value={patroller.name}>
										{patroller.name}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<Button onClick={() => handleTimestamp('onScene')} variant="contained">
						<MdAccessTime />
					</Button>
					<TextField
						name="onScene"
						value={newRow.onScene}
						onChange={handleInputChange}
						placeholder="On Scene"
						variant="outlined"
						size="small"
						style={{ width: '60px' }}
					/>{' '}
					<Button onClick={() => handleTimestamp('stable')} variant="contained">
						<MdAccessTime />
					</Button>
					<TextField
						name="stable"
						value={newRow.stable}
						onChange={handleInputChange}
						placeholder="Stable"
						variant="outlined"
						size="small"
						style={{ width: '50px' }}
					/>{' '}
					<Button onClick={() => handleTimestamp('transport')} variant="contained">
						<MdAccessTime />
					</Button>
					<TextField
						name="transport"
						value={newRow.transport}
						onChange={handleInputChange}
						placeholder="Transport"
						variant="outlined"
						size="small"
						style={{ width: '100px' }}
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