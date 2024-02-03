import React, { useState, createContext } from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        localStorage.setItem('selectedDate', newDate.toISOString());
        setOpenDatePicker(false);
    };

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate, openDatePicker, setOpenDatePicker, handleDateChange }}>
            {children}
        </DateContext.Provider>
    );
};