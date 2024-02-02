import React, { useContext, useEffect, useState } from 'react';
import { MountainContext } from '../../contexts/MountainContext';
import { DateContext } from '../../contexts/DateContext';
import { Card, CardContent, Typography } from '@mui/material';

const PatrolDispatcherDisplay = () => {
    const { patrolDispatcher, patrollers } = useContext(MountainContext);
    const { selectedDate } = useContext(DateContext);
    const [selectedDispatcher, setSelectedDispatcher] = useState(null);

    useEffect(() => {
        if (selectedDate && selectedDate instanceof Date) {
            const patrolDate = new Date(patrolDispatcher.date);
            if (!isNaN(patrolDate)) {
                if (patrolDate.toISOString() === selectedDate.toISOString()) {
                    setSelectedDispatcher(patrolDispatcher.patroller);
                } else {
                    setSelectedDispatcher(null);
                }
            }
        }
    }, [selectedDate, patrolDispatcher]);

    const getPatrollerName = (patrollerId) => {
        const patroller = patrollers.find(p => p._id === patrollerId);
        return patroller ? `${patroller.firstName} ${patroller.lastName}` : 'Unknown';
    }

    return (
        <Card style={{ width: '220px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
                <Typography variant="body2" component="p">
                    {selectedDispatcher ? getPatrollerName(selectedDispatcher) : 'No patrol dispatcher today.'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PatrolDispatcherDisplay;