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
            const dispatcherForSelectedDate = patrolDispatcher.find(dispatcher => new Date(dispatcher.date).toISOString() === selectedDate.toISOString());
            setSelectedDispatcher(dispatcherForSelectedDate);
        }
    }, [selectedDate, patrolDispatcher]);

    const getPatrollerName = (patrollerId) => {
        const patroller = patrollers.find(p => p._id === patrollerId);
        return patroller ? patroller.name : 'Unknown';
    }

    return (
        <Card style={{ width: '220px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
                <Typography variant="body2" component="p">
                    {selectedDispatcher ? getPatrollerName(selectedDispatcher.patroller) : 'No patrol dispatcher today.'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PatrolDispatcherDisplay;