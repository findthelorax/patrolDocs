import React, { useState, useEffect, useContext } from 'react';
import {
	Autocomplete,
	Card,
	CardContent,
	Button,
	TextField,
	Checkbox,
	MenuItem,
	FormControl,
	FormControlLabel,
	InputLabel,
	Select,
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { api } from '../../api/IncidentLog';
import { MdAccessTime } from 'react-icons/md';
import { MountainContext } from '../../contexts/MountainContext';
import IncidentTableHeader from './IncidentTableHeader';
import IncidentTableHeaderSubmit from './IncidentTableHeaderSubmit';
import IncidentTableDryRun from './IncidentTableDryRun';

const IncidentTable = () => {
	const { trails, huts, lodges, lifts, patrollers } = useContext(MountainContext);
	const [rowData, setRowData] = useState([]);
	const [newRow, setNewRow] = useState({
		time: '',
		incident: '',
		location: '',
		patroller: '',
		onScene: '',
		stable: '',
		transport: '',
		dryRun: false,
	});

	const [gridApi, setGridApi] = useState(null);

	const locationOptions = [
		...(trails ? trails.map((option) => `Trails/${option.name}`) : []),
		...(huts ? huts.map((option) => `Huts/${option.name}`) : []),
		...(lodges ? lodges.map((option) => `Lodges/${option.name}`) : []),
		...(lifts ? lifts.map((option) => `Lifts/${option.name}`) : []),
	];

	const columnDefs = [
		{
			headerName: 'Time',
			field: 'time',
			editable: true,
			headerComponent: IncidentTableHeader,
			headerComponentParams: {
				displayName: 'Time',
			},
		},
		{ headerName: 'Incident', field: 'incident', editable: true },
		{ headerName: 'Location', field: 'location', editable: true },
		{ headerName: 'Patroller', field: 'patroller', editable: true },
		{
			headerName: 'On Scene',
			field: 'onScene',
			editable: true,
			headerComponent: IncidentTableHeader,
			headerComponentParams: {
				displayName: 'On Scene',
			},
		},
		{
			headerName: 'Stable',
			field: 'stable',
			editable: true,
			headerComponent: IncidentTableHeader,
			headerComponentParams: {
				displayName: 'Stable',
			},
		},
		{
			headerName: 'Transport',
			field: 'transport',
			editable: true,
            sortable: true,
			headerComponent: IncidentTableHeader,
			headerComponentParams: {
				displayName: 'Transport',
			},
		},
		{
			headerName: 'Dry Run',
			field: 'dryRun',
			editable: true,
            sortable: true,
			headerComponent: IncidentTableDryRun,
			headerComponentParams: {
				displayName: 'Dry Run',
				newRow: newRow,
				setNewRow: setNewRow,
			},
		},
		{
			headerName: 'Actions',
			field: 'actions',
			headerComponent: IncidentTableHeaderSubmit,
		},
	];

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const logs = await api.getAllLogs();
				setRowData(logs);
			} catch (error) {
				console.error('Error fetching logs', error);
			}
		};

		fetchLogs();
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewRow((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		setRowData((prevState) => [newRow, ...prevState]);
		setNewRow({
			time: '',
			incident: '',
			location: '',
			patroller: '',
			onScene: '',
			stable: '',
			transport: '',
			dryRun: false,
		});
	};

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '80vh', width: '100%' }}>
			<Card>
				<CardContent style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
					{/* <Button onClick={() => handleTimestamp('time')} variant="contained">
						<MdAccessTime />
					</Button> */}
					<TextField
						name="time"
						value={newRow.time}
						onChange={handleInputChange}
						variant="outlined"
						size="small"
						style={{ width: '100px' }}
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
					{/* <Button onClick={() => handleTimestamp('onScene')} variant="contained">
						<MdAccessTime />
					</Button> */}
					<TextField
						name="onScene"
						value={newRow.onScene}
						onChange={handleInputChange}
						placeholder="On Scene"
						variant="outlined"
						size="small"
						style={{ width: '100px' }}
					/>{' '}
					{/* <Button onClick={() => handleTimestamp('stable')} variant="contained">
						<MdAccessTime />
					</Button> */}
					<TextField
						name="stable"
						value={newRow.stable}
						onChange={handleInputChange}
						placeholder="Stable"
						variant="outlined"
						size="small"
						style={{ width: '100px' }}
					/>{' '}
					{/* <Button onClick={() => handleTimestamp('transport')} variant="contained">
						<MdAccessTime />
					</Button> */}
					<TextField
						name="transport"
						value={newRow.transport}
						onChange={handleInputChange}
						placeholder="Transport"
						variant="outlined"
						size="small"
						style={{ width: '100px' }}
					/>
					{/* <FormControlLabel
						control={<Checkbox checked={newRow.dryRun} onChange={handleCheckboxChange} name="dryRun" />}
						label="Dry Run"
					/> */}
					<Button onClick={handleSubmit} variant="contained">
						Submit
					</Button>
					<Button onClick={() => gridApi && gridApi.exportDataAsCsv()} variant="contained">
						Export
					</Button>
				</CardContent>
			</Card>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={[newRow, ...rowData]}
				onGridReady={(params) => setGridApi(params.api)}
				frameworkComponents={{ IncidentTableHeader }}
			/>
		</div>
	);
};

export default IncidentTable;
