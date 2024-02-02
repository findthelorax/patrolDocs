import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const LodgesTable = () => {
    const { lodges, areas } = useContext(MountainContext);

    const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});

    const columnDefs = [
        { headerName: "Name", field: "name" },
        { 
            headerName: "Area", 
            field: "area",
            valueGetter: params => areaMap[params.data.area]
        },
        { headerName: "Status", field: "status" },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={lodges}
            />
        </div>
    );
};

export default LodgesTable;