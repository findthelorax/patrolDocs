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

	const handleSelectionChange = async (event, newValue) => {
		if (patrollers.includes(newValue)) {
			setSelectedDispatcher(newValue);
			const existingDispatcher = await fetchPatrolDispatcherForDate(selectedDate);
			if (existingDispatcher) {
				setOpenConfirmDialog(true);
			} else {
				setPatrolDispatcher({ ...newValue, date: selectedDate });
			}
		} else {
			setSelectedDispatcher(null);
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
		if (patrollers.includes(patrolDispatcher)) {
			setSelectedDispatcher(patrolDispatcher);
		} else {
			setSelectedDispatcher(null);
		}
	}, [patrolDispatcher, patrollers]);

	useEffect(() => {
		const fetchDispatcher = async () => {
			const existingDispatcher = await fetchPatrolDispatcherForDate(selectedDate);
			if (existingDispatcher && patrollers.some(patroller => patroller._id === existingDispatcher.patroller._id)) {
				setSelectedDispatcher(existingDispatcher.patroller);
			}
		};

		fetchDispatcher();
	}, [selectedDate, fetchPatrolDispatcherForDate, patrollers]);

	return (
		<>
			<Autocomplete
				id="patrol-dispatcher-autocomplete"
				options={patrollers || []}
				getOptionLabel={(option) =>
					option && option.firstName && option.lastName ? `${option.firstName} ${option.lastName}` : 'No name'
				}
				value={selectedDispatcher}
				onChange={handleSelectionChange}
				clearIcon={false}
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
