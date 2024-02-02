import React, { useContext, useState, useEffect } from 'react';
import { MountainContext } from '../../contexts/MountainContext';
import { DateContext } from '../../contexts/DateContext';
import { Autocomplete, TextField, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const PatrolDispatcherAutocomplete = () => {
	const { patrollers, patrolDispatcher, fetchPatrolDispatcherForDate, setPatrolDispatcher } =
		useContext(MountainContext);
	const { selectedDate } = useContext(DateContext);
	const [selectedDispatcher, setSelectedDispatcher] = useState(null);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

	// PatrolDispatcherAutocomplete.js

	const handleSelectionChange = async (event, newValue) => {
		setSelectedDispatcher(newValue);
		const existingDispatcher = await fetchPatrolDispatcherForDate(selectedDate);
		if (existingDispatcher) {
			setOpenConfirmDialog(true);
		} else {
			setPatrolDispatcher({ ...newValue, date: selectedDate });
		}
	};

	const handleConfirmChange = () => {
		setPatrolDispatcher({ ...selectedDispatcher, date: selectedDate });
		setOpenConfirmDialog(false);
	};

	const handleCancelChange = () => {
		setSelectedDispatcher(patrolDispatcher);
		setOpenConfirmDialog(false);
	};

	useEffect(() => {
		setSelectedDispatcher(patrolDispatcher);
	}, [patrolDispatcher]);

	return (
		<>
			<Autocomplete
				id="patrol-dispatcher-autocomplete"
				options={patrollers || []}
				getOptionLabel={(option) => (option ? `${option.firstName} ${option.lastName}` : '')}
				value={selectedDispatcher}
				onChange={handleSelectionChange}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Patrol Dispatcher"
						required
						fullWidth
						placeholder="Select Patrol Dispatcher"
						style={{ width: '200px' }}
					/>
				)}
			/>
			<Dialog open={openConfirmDialog} onClose={handleCancelChange}>
				<DialogTitle>Confirm Dispatcher Change</DialogTitle>
				<DialogActions>
					<Button onClick={handleCancelChange} color="primary">
						No
					</Button>
					<Button onClick={handleConfirmChange} color="primary" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PatrolDispatcherAutocomplete;
