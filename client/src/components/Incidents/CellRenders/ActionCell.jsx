import React from 'react';
import { Button } from '@mui/material';

const ActionCellRenderer = ({ rowIndex, api, context }) => {
	const { handleSubmit } = context;
	if (rowIndex === 0) {
		return (
			<Button onClick={() => handleSubmit()} variant="contained">
				Submit
			</Button>
		);
	} else {
		return (
			<Button
				onClick={() => api.applyTransaction({ remove: [api.getDisplayedRowAtIndex(rowIndex).data] })}
				variant="contained"
			>
				Delete
			</Button>
		);
	}
};

export default ActionCellRenderer;
