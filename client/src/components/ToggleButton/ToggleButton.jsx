// ToggleButton.jsx
import React from 'react';
import { Button } from '@material-ui/core';

function ToggleButton({ item, updateItem }) {
    const toggleStatus = async () => {
        const updatedItem = { ...item, status: item.status === 'open' ? 'closed' : 'open' };
        try {
            await updateItem(item.mountain, item._id, updatedItem);
        } catch (error) {
            console.error(`Failed to update item status: ${error}`);
        }
    };

    return (
        <Button variant="contained" color="primary" onClick={toggleStatus}>
            {item.status === 'open' ? 'Close' : 'Open'}
        </Button>
    );
}

export default ToggleButton;