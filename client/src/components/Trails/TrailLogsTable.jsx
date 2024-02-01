import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const TrailLogsTable = () => {
    const { trailLogs, trails, mountains, patrollers } = useContext(MountainContext);

    const trailMap = trails.reduce((map, trail) => ({ ...map, [trail._id]: trail.name }), {});
    const mountainMap = mountains.reduce((map, mountain) => ({ ...map, [mountain._id]: mountain.name }), {});
    const patrollerMap = patrollers.reduce((map, patroller) => ({ ...map, [patroller._id]: `${patroller.firstName} ${patroller.lastName}` }), {});

    const columnDefs = [
        { 
            headerName: "Mountain", 
            field: "mountain",
            valueGetter: params => mountainMap[params.data.mountain]
        },
        { 
            headerName: "Trail", 
            field: "trail",
            valueGetter: params => trailMap[params.data.trail]
        },
        { 
            headerName: "Date", 
            field: "date",
            valueGetter: params => new Date(params.data.date).toLocaleDateString()
        },
        { 
            headerName: "Status", 
            field: "status",
            valueGetter: params => params.data.status ? 'Checked' : 'Not Checked'
        },
        { 
            headerName: "Checked By", 
            field: "checkedBy",
            valueGetter: params => patrollerMap[params.data.checkedBy]
        },
        { 
            headerName: "Condition", 
            field: "condition"
        },
        { 
            headerName: "Comments", 
            field: "comments"
        },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 400, width: 600 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={trailLogs}
            />
        </div>
    );
};

export default TrailLogsTable;