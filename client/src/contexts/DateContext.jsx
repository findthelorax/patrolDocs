import React, { useState } from 'react';

export const DateContext = React.createContext({
    selectedDate: null,
    setSelectedDate: () => {},
});

export const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().setHours(0, 0, 0, 0));

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};