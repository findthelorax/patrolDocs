import React, { useState } from 'react';
import { TableCell, TableRow, TextField, Select, MenuItem, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Conditions } from '../../helpers/constants';
import TimeUpdateDialog from './TimeUpdateDialog';

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

	const handleConditionChange = (event) => {
		setCondition(event.target.value);
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
				<TableCell style={{ borderRight: '1px solid #000' }}>{trail.name}</TableCell>
				<TableCell>
					<IconButton onClick={handleTimeClick}>
						<AccessTimeIcon />
					</IconButton>
					<TextField type="time" value={openingTime} onChange={handleTimeChange} />
				</TableCell>
				<TableCell>
					<Select
						value={selectedPatroller}
						onChange={handlePatrollerChange}
						sx={{ minWidth: 200, height: '35px', overflow: 'hidden' }}
					>
						{patrollers.map((patroller) => (
							<MenuItem key={patroller._id} value={patroller._id}>
								{patroller.firstName} {patroller.lastName}
							</MenuItem>
						))}
					</Select>
				</TableCell>
				<TableCell>
					<Select
						value={condition}
						onChange={handleConditionChange}
						sx={{ minWidth: 125, height: '35px', overflow: 'hidden' }}
					>
						{Object.values(Conditions).map((condition) => (
							<MenuItem key={condition} value={condition}>
								{condition}
							</MenuItem>
						))}
					</Select>
				</TableCell>
				<TableCell>
					<Select
						value={closingPatroller}
						onChange={handleClosingPatrollerChange}
						sx={{ minWidth: 125, height: '35px', overflow: 'hidden' }}
					>
						{patrollers.map((patroller) => (
							<MenuItem key={patroller._id} value={patroller._id}>
								{patroller.firstName} {patroller.lastName}
							</MenuItem>
						))}
					</Select>
				</TableCell>
			</TableRow>
			<TimeUpdateDialog open={openDialog} onClose={handleDialogClose} onConfirm={handleDialogConfirm} />
		</>
	);
}

export default TrailRow;
