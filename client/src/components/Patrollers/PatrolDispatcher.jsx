import React, { useState, useContext } from 'react';
import { MountainContext } from '../context/MountainContext';

const SetPatrolDispatcher = () => {
    const { patrollers, fetchPatrolDispatcherForDate } = useContext(MountainContext);
    const [selectedPatroller, setSelectedPatroller] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchPatrolDispatcherForDate(selectedDate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Patroller:
                <select value={selectedPatroller} onChange={e => setSelectedPatroller(e.target.value)}>
                    {patrollers.map(patroller => (
                        <option key={patroller._id} value={patroller._id}>{patroller.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Date:
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </label>
            <button type="submit">Set Patrol Dispatcher</button>
        </form>
    );
};

export default SetPatrolDispatcher;