import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const PatrollersTable = () => {
    const { patrollers } = useContext(MountainContext);

    const columnDefs = [
        { headerName: "First Name", field: "firstName" },
        { headerName: "Last Name", field: "lastName" },
        { headerName: "Position", field: "position" },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 400, width: 600 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={patrollers}
            />
        </div>
    );
};

export default PatrollersTable;