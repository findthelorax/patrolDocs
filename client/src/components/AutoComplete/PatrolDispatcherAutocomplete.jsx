import React, { useContext, useState, useEffect } from 'react';
import { MountainContext } from '../../contexts/MountainContext';
import { DateContext } from '../../contexts/DateContext';
import { Autocomplete, TextField, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const PatrolDispatcherAutocomplete = () => {
    const { patrollers, patrolDispatcher, fetchPatrolDispatcherForDate, setPatrolDispatcher } = useContext(MountainContext);
    const { selectedDate } = useContext(DateContext);
    const [selectedDispatcher, setSelectedDispatcher] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    useEffect(() => {
        if (selectedDate) {
            const dispatcherForSelectedDate = patrolDispatcher.find(dispatcher => new Date(dispatcher.date).toDateString() === selectedDate.toDateString());
            setSelectedDispatcher(dispatcherForSelectedDate || null);
        }
    }, [selectedDate, patrolDispatcher]);

    const handleSelectionChange = (event, newValue) => {
        setSelectedDispatcher(newValue);
        setOpenConfirmDialog(true);
    };

    const handleConfirmChange = async () => {
        setOpenConfirmDialog(false);
        setPatrolDispatcher(selectedDispatcher);
        await fetchPatrolDispatcherForDate(selectedDispatcher.date);
    };

    const handleCancelChange = () => {
        setOpenConfirmDialog(false);
        setSelectedDispatcher(patrolDispatcher);
    };

    return (
        <>
            <Autocomplete
                id="patrol-dispatcher-autocomplete"
                options={patrollers || []}
                getOptionLabel={(option) => option && option.name ? option.name : ""}
                value={selectedDispatcher}
                onChange={handleSelectionChange}
                renderInput={(params) => 
                    <TextField 
                        {...params} 
                        label="Patrol Dispatcher" 
                        required 
                        fullWidth
                        placeholder="Select Patrol Dispatcher"
                        style={{ width: '200px' }}
                    />
                }
            />
            <Dialog
                open={openConfirmDialog}
                onClose={handleCancelChange}
            >
                <DialogTitle>Confirm Dispatcher Change</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancelChange} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmChange} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PatrolDispatcherAutocomplete;