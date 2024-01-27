import React from 'react';
import { MdAccessTime } from 'react-icons/md';

const IncidentTableHeader = (props) => {
    const handleClick = () => {
        // Get the first row node
        const firstRowNode = props.api.getDisplayedRowAtIndex(0);

        // Create a new date object
        const date = new Date();

        // Format the date to a locale string
        const formattedDate = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        // Update the respective field of the first row with the formatted date
        firstRowNode.setDataValue(props.column.colId, formattedDate);

        // If you want to refresh the cell after updating the data
        props.api.refreshCells({ rowNodes: [firstRowNode], columns: [props.column.colId], force: true });
    };

    return (
        <div>
            <span>{props.displayName}</span>
            <button onClick={handleClick}>
                <MdAccessTime />
            </button>
        </div>
    );
};

export default IncidentTableHeader;