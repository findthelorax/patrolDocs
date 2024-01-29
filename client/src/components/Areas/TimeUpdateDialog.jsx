import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

function TimeUpdateDialog({ open, onClose, onConfirm }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{'Confirm Time Update'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to update the opening time to the current time?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button onClick={onConfirm} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TimeUpdateDialog;