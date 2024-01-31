import React, { useState } from 'react';
import { Autocomplete, TableCell, TableRow, TextField, Box, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Conditions } from '../../helpers/constants';
import TimeUpdateDialog from '../DatePickers/TimeUpdateDialog';

function TrailRow({ trail, patrollers }) {
	const [openingTime, setOpeningTime] = useState('');
	const [condition, setCondition] = useState('Closed');
	const [selectedPatroller, setSelectedPatroller] = useState('');
	const [closingPatroller, setClosingPatroller] = useState('');
	const [proposedTime, setProposedTime] = useState('');
	const [openDialog, setOpenDialog] = useState(false);

	const handleTimeClick = () => {
		const currentTime = new Date();
		const hours = currentTime.getHours().toString().padStart(2, '0');
		const minutes = currentTime.getMinutes().toString().padStart(2, '0');
		const newTime = `${hours}:${minutes}`;

		if (openingTime) {
			setProposedTime(newTime);
			setOpenDialog(true);
		} else {
			setOpeningTime(newTime);
		}
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const handleDialogConfirm = () => {
		setOpeningTime(proposedTime);
		setOpenDialog(false);
	};

	const handleTimeChange = (event) => {
		setOpeningTime(event.target.value);
	};

	const handleConditionChange = (event, newValue) => {
		setCondition(newValue);
	};

	const handlePatrollerChange = (event) => {
		setSelectedPatroller(event.target.value);
	};

	const handleClosingPatrollerChange = (event) => {
		setClosingPatroller(event.target.value);
	};

	return (
		<>
			<TableRow key={trail._id}>
				<TableCell >{trail.name}</TableCell>
				<TableCell style={{ width: '100px' }} >
					<Box display="flex" alignItems="center">
						<IconButton onClick={handleTimeClick}>
							<AccessTimeIcon />
						</IconButton>
						<TextField type="time" value={openingTime} onChange={handleTimeChange} />
					</Box>
				</TableCell>
				<TableCell>
				<Autocomplete
                        value={patrollers.find((patroller) => patroller._id === selectedPatroller)}
                        onChange={(event, newValue) => {
                            handlePatrollerChange(newValue ? newValue._id : '');
                        }}
						autoHighlight
						autoSelect
						noOptionsText="No patrollers available"
                        options={patrollers}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        renderInput={(params) => <TextField {...params} />}
                    />
				</TableCell>
				<TableCell>
				<Autocomplete
                        value={condition}
						onChange={handleConditionChange}
                        options={Object.values(Conditions)}
                        renderInput={(params) => <TextField {...params} />}
						renderOption={(props, option, { selected }) => (
							<Box component="li" {...props}>
								{option === 'Powder' && '❆'}
								{option === 'Soft' && '🏂'}
								{option === 'Hard' && '🧊'}
								{option === 'Variable' && '⛇'}
								{option === 'Groomed' && '🚜'}
								{option === 'Moguls' && '⛷'}
								{option === 'Closed' && '❌'}
								{option}
							</Box>
						)}
                    />
				</TableCell>
				<TableCell>
					<Autocomplete
						value={patrollers.find((patroller) => patroller._id === closingPatroller)}
						onChange={(event, newValue) => {
							handleClosingPatrollerChange(newValue ? newValue._id : '');
						}}
						autoHighlight
						autoSelect
						noOptionsText="No patrollers available"
						options={patrollers}
						getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
						renderInput={(params) => <TextField {...params} />}
					/>
				</TableCell>
			</TableRow>
			<TimeUpdateDialog open={openDialog} onClose={handleDialogClose} onConfirm={handleDialogConfirm} />
		</>
	);
}

export default TrailRow;
