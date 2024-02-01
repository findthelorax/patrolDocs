import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AlertRef = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} variant="standard" {...props} ref={ref} />
));

const SnackbarAlert = ({ open, handleClose, message }) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <AlertRef onClose={handleClose} severity="success">
            {message}
        </AlertRef>
    </Snackbar>
);

export default SnackbarAlert;