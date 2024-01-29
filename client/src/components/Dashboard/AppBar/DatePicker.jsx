import React, { useContext } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateContext } from '../../../contexts/DateContext';
import { MountainContext } from '../../../contexts/MountainContext';

function DatePicker({ openDatePicker, setOpenDatePicker }) {
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const { fetchPatrolDispatcherForDate } = useContext(MountainContext);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        localStorage.setItem('selectedDate', newDate.toISOString());
        setOpenDatePicker(false);
        fetchPatrolDispatcherForDate(newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
                label="Date picker"
                inputFormat="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                open={openDatePicker}
                onOpen={() => setOpenDatePicker(true)}
                onClose={() => setOpenDatePicker(false)}
            />
        </LocalizationProvider>
    );
}

export default DatePicker;