import React, { createContext, useState } from 'react';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    return (
        <SnackbarContext.Provider value={{ openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage }}>
            {children}
        </SnackbarContext.Provider>
    );
};