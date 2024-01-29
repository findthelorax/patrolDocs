import React from 'react';
import { api } from '../../../api/IncidentLog';

const IncidentTableHeaderButton = (props) => {
    const handleSubmit = async () => {
        // Get the first row node
        const firstRowNode = props.api.getDisplayedRowAtIndex(0);

        // Create the log
        const log = firstRowNode.data;

        try {
            // Save the log in the database
            await api.createLog(log);
        } catch (error) {
            console.error(`Error submitting log`, error);
        }
    };

    const handleClear = () => {
        // Get the first row node
        const firstRowNode = props.api.getDisplayedRowAtIndex(0);

        try {
            // Clear the first row of inputted data
            firstRowNode.setDataValue('time', '');
            firstRowNode.setDataValue('incident', '');
            firstRowNode.setDataValue('location', '');
            firstRowNode.setDataValue('patroller', '');
            firstRowNode.setDataValue('onScene', '');
            firstRowNode.setDataValue('stable', '');
            firstRowNode.setDataValue('transport', '');
            firstRowNode.setDataValue('dryRun', false);
        } catch (error) {
            console.error(`Error clearing log`, error);
        }
    };

    return (
        <div>
            <span>{props.displayName}</span>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
};

export default IncidentTableHeaderButton;