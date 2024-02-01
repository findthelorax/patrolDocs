import React, { useState, useEffect, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { api } from '../../api/IncidentLogAPI';
import { MountainContext } from '../../contexts/MountainContext';
import IncidentForm from './IncidentForm';
import DeleteButton from './CellRenders/DeleteButton';

const IncidentTable = () => {
	const { trails, huts, lodges, lifts, patrollers, selectedMountain } = useContext(MountainContext);
	const [selectedPatrollers, setSelectedPatrollers] = useState([]);
	const [rowData, setRowData] = useState([]);
	const [newRow, setNewRow] = useState({
		callTime: '',
		incident: '',
		location: '',
		patroller: '',
		onScene: '',
		stable: '',
		transport: '',
		dryRun: false,
	});

	// eslint-disable-next-line
	const [gridApi, setGridApi] = useState(null);
	const deleteRow = (deletedRowId) => {
		setRowData(rowData.filter((row) => row.id !== deletedRowId));
	};
	const locationOptions = [
		...(trails ? trails.map((option) => `Trails/${option.name}`) : []),
		...(huts ? huts.map((option) => `Huts/${option.name}`) : []),
		...(lodges ? lodges.map((option) => `Lodges/${option.name}`) : []),
		...(lifts ? lifts.map((option) => `Lifts/${option.name}`) : []),
	];

	const columnDefs = [
		{ headerName: 'Call Time', field: 'callTime', editable: true, width: 100 },
		{ headerName: 'Incident', field: 'incident', editable: true },
		{ headerName: 'Location', field: 'location', editable: true },
		{ headerName: 'Patrollers', field: 'patrollers', editable: true },
		{ headerName: 'On Scene', field: 'onScene', editable: true, width: 100 },
		{ headerName: 'Stable', field: 'stable', editable: true, width: 100 },
		{ headerName: 'Transport', field: 'transport', editable: true, width: 100 },
		{ headerName: 'Dry Run', field: 'dryRun', editable: false, width: 100 },
		{
			headerName: 'Action',
			field: 'action',
			width: 100,
			cellRenderer: 'DeleteButton',
			cellRendererParams: {
				clicked: deleteRow,
				mountainId: selectedMountain ? selectedMountain._id : null,
			},
		},
	];

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				// Add a null check for selectedMountain
				if (selectedMountain && selectedMountain._id) {
					const logs = await api.getAllLogs(selectedMountain._id);
					const rowData = logs.map((log) => ({ id: log._id, ...log }));
					setRowData(Array.isArray(rowData) ? rowData : []);
				}
			} catch (error) {
				console.error('Error fetching logs', error);
				setRowData([]);
			}
		};

		fetchLogs();
	}, [selectedMountain]);

	const handleTimestamp = (field) => {
		const timestamp = new Date();
		const formattedTimestamp = timestamp.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});

		// If there is already a timestamp, ask the user for confirmation before overwriting it
		if (newRow[field] && !window.confirm('Are you sure you want to overwrite the existing timestamp?')) {
			return;
		}

		setNewRow((prevState) => ({
			...prevState,
			[field]: formattedTimestamp,
		}));

		return formattedTimestamp;
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setNewRow((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handlePatrollerChange = (event, newValue) => {
		setSelectedPatrollers(newValue);
		const patrollersString = newValue.map((patroller) => `${patroller.firstName} ${patroller.lastName}`).join(', ');
		setNewRow((prevState) => ({
			...prevState,
			patrollers: patrollersString,
		}));
	};

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setNewRow((prevState) => ({
			...prevState,
			[name]: checked,
			onScene: checked ? null : prevState.onScene,
			stable: checked ? null : prevState.stable,
			transport: checked ? null : prevState.transport,
		}));
	};

	const handleSubmit = async () => {
		// Define a regular expression for time in HH:MM:SS format
		const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

		// Validate the time fields
		if (
			!timeRegex.test(newRow.callTime) ||
			(!newRow.dryRun &&
				(!timeRegex.test(newRow.onScene) ||
					!timeRegex.test(newRow.stable) ||
					!timeRegex.test(newRow.transport)))
		) {
			alert('Please enter a valid time in HH:MM:SS format.');
			return;
		}

		const patrollersString = selectedPatrollers
			.map((patroller) => `${patroller.firstName} ${patroller.lastName}`)
			.join(', ');

		setNewRow((prevState) => ({
			...prevState,
			patrollers: patrollersString,
		}));

		try {
			if (selectedMountain && selectedMountain._id) {
				await api.createLog(selectedMountain._id, newRow);
			}
		} catch (error) {
			console.error('Error creating log', error);
		}

		setRowData((prevState) => [newRow, ...prevState]);
		setSelectedPatrollers([]);
		setNewRow({
			callTime: '',
			incident: '',
			location: '',
			patrollers: '',
			onScene: '',
			stable: '',
			transport: '',
			dryRun: false,
		});
	};

	const components = {
		DeleteButton: DeleteButton,
	};
	return (
		<div className="ag-theme-quartz-dark" style={{ height: '80vh', width: '100%' }}>
			<IncidentForm
				newRow={newRow}
				setNewRow={setNewRow}
				handleTimestamp={handleTimestamp}
				handleInputChange={handleInputChange}
				handleCheckboxChange={handleCheckboxChange}
				handleSubmit={handleSubmit}
				locationOptions={locationOptions}
				patrollers={patrollers}
				selectedPatrollers={selectedPatrollers}
				setSelectedPatrollers={setSelectedPatrollers}
				handlePatrollerChange={handlePatrollerChange}
			/>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={[newRow, ...rowData]}
				onGridReady={(params) => setGridApi(params.api)}
				components={components}
			/>
		</div>
	);
};

export default IncidentTable;
