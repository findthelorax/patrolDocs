import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import StatusToggleButton from '../Toggles/StatusToggleButton';
import ConditionSelectRenderer from '../Toggles/ConditionsSelector';

const TrailsTable = () => {
	const { trails, areas, api } = useContext(MountainContext);
	const [gridApi, setGridApi] = useState(null);

	const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});

	const columnDefs = [
		{ headerName: 'Trail Name', field: 'name' },
		{
			headerName: 'Area',
			field: 'area',
			valueGetter: (params) => areaMap[params.data.area],
		},
		{ headerName: 'Difficulty', field: 'difficulty' },
		{ headerName: 'Type', field: 'type' },
		{
			headerName: 'Condition',
			field: 'condition',
			cellRenderer: 'conditionSelectRenderer',
			editable: true,
			onCellValueChanged: (params) => {
				const updatedTrail = { ...params.data, condition: params.newValue };
				console.log("🚀 ~ file: TrailsTable.jsx:31 ~ TrailsTable ~ updatedTrail:", updatedTrail)
				api.trailApi.updateTrail(updatedTrail.mountain, updatedTrail._id, updatedTrail);
			},
		},
		{
			headerName: 'Status',
			field: 'status',
			cellRenderer: 'statusToggleButton',
			cellRendererParams: { type: 'trail' },
		},
	];

	useEffect(() => {
		if (gridApi) {
			gridApi.setGridOption('rowData', trails);
		}
	}, [trails, gridApi]);

	const onGridReady = (params) => {
		setGridApi(params.api);
	};

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={trails}
				components={{
					statusToggleButton: StatusToggleButton,
					conditionSelectRenderer: ConditionSelectRenderer,
				}}
				onGridReady={onGridReady}
			/>
		</div>
	);
};

export default TrailsTable;
