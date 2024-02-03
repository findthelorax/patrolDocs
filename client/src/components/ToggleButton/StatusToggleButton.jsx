import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext'; // import the MountainContext

function StatusToggleButton({ value, data, type }) {
    const context = useContext(MountainContext); // use the useContext hook to access the context values

    const toggleStatus = async () => {
        const updatedItem = { ...data, status: data.status === 'open' ? 'closed' : 'open' };
        try {
            if (type === 'lift') {
                await context.api.liftApi.updateLift(data.mountain, data._id, updatedItem);
                context.fetchLifts();
            } else if (type === 'trail') {
                await context.api.trailApi.updateTrail(data.mountain, data._id, updatedItem);
                context.fetchTrails();
            }
        } catch (error) {
            console.error(`Failed to update ${type} status: ${error}`);
        }
    };

    return (
        <div>
            <span style={{ marginRight: 10 }}>{value === 'open' ? 'Open' : 'Closed'}</span>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={toggleStatus}
                size="small"
                style={{ fontSize: 12, paddingLeft: 5, paddingRight: 10 }}
            >
                {value === 'open' ? `Close ${type}` : `Open ${type}`}
            </Button>
        </div>
    );
}

export default StatusToggleButton;