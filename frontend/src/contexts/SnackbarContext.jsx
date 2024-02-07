import React, { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { alpha } from '@mui/system';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage, snackbarSeverity, setSnackbarSeverity }}>
            {children}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert 
                    onClose={handleClose} 
                    severity={snackbarSeverity} 
                    variant="filled"
                    sx={{ 
                        bgcolor: snackbarSeverity === 'success' ? alpha('rgb(144, 238, 144)', 0.8) : alpha('rgb(255, 204, 204)', 0.8), 
                        borderColor: snackbarSeverity === 'success' ? 'darkgreen' : 'darkred',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};