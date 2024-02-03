import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import StatusToggleButton from '../Toggles/StatusToggleButton';

const LiftsTable = () => {
	const { lifts, areas } = useContext(MountainContext);
	const [gridApi, setGridApi] = useState(null);

	const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});

	const columnDefs = [
		{ headerName: 'Name', field: 'name' },
		{
			headerName: 'Area',
			field: 'area',
			valueGetter: (params) => areaMap[params.data.area],
		},
		{
			headerName: 'Status',
			field: 'status',
			cellRenderer: 'statusToggleButton',
			cellRendererParams: { type: 'lift' },
		},
		{
			headerName: 'Location',
			field: 'coordinates',
			valueFormatter: (params) => (params.value ? `${params.value.lat}, ${params.value.lng}` : 'No coordinates'),
		},
	];

	useEffect(() => {
		if (gridApi) {
			gridApi.setGridOption('rowData', lifts);
		}
	}, [lifts, gridApi]);

	const onGridReady = (params) => {
		setGridApi(params.api);
	};

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={lifts}
				components={{ statusToggleButton: StatusToggleButton }}
				onGridReady={onGridReady}
			/>
		</div>
	);
};

export default LiftsTable;