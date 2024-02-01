import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const LiftsTable = () => {
    const { lifts, areas } = useContext(MountainContext);

    const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});

    const columnDefs = [
        { headerName: "Name", field: "name" },
        { 
            headerName: "Area", 
            field: "area",
            valueGetter: params => areaMap[params.data.area]
        },
        { headerName: "Status", field: "status" },
        { headerName: "Location", field: "coordinates" },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 400, width: 600 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={lifts}
            />
        </div>
    );
};

export default LiftsTable;