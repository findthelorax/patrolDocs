import React, { useContext, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

function EquipmentTable() {
	const { equipment, fetchEquipment, isLoading, selectedMountain, handleServiceToggle } = useContext(MountainContext);

	useEffect(() => {
		if (selectedMountain) {
			fetchEquipment(selectedMountain._id);
		}
	}, [fetchEquipment, selectedMountain]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	function formatDate(dateString) {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	}

	function getServiceStatusClass(item) {
		const currentDate = new Date();
		const outOfServiceDate = new Date(item.outOfServiceDate);
		const inServiceDate = new Date(item.inServiceDate);

		if (currentDate >= outOfServiceDate) {
			return 'out-of-service';
		} else if (currentDate >= inServiceDate) {
			return 'in-service';
		} else {
			return '';
		}
	}

	function handleEdit(item) {
		// Implement your edit logic here
		console.log(`Editing item ${item._id}`);
	}
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Type</TableCell>
						<TableCell align="right">ID Number</TableCell>
						<TableCell align="right">In Service Date</TableCell>
						<TableCell align="right">Out of Service Date</TableCell>
						<TableCell align="right">Comments</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{equipment.map((item) => (
						<TableRow key={item.idNumber} className={getServiceStatusClass(item)}>
							<TableCell component="th" scope="row">
								{item.name}
							</TableCell>
							<TableCell align="right">{item.type}</TableCell>
							<TableCell align="right">{item.idNumber}</TableCell>
							<TableCell align="right">{formatDate(item.outOfServiceDate)}</TableCell>
							<TableCell align="right">{formatDate(item.inServiceDate)}</TableCell>
							<TableCell align="right">{item.comments}</TableCell>
							<TableCell align="right">
								<Button variant="contained" color="primary" onClick={() => handleServiceToggle(item)}>
									{item.inService ? 'Remove from service' : 'Put in service'}
								</Button>
								<Button variant="contained" color="secondary" onClick={() => handleEdit(item)}>
									Edit
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default EquipmentTable;
