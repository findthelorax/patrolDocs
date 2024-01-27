import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff4400',
        },
        secondary: {
            main: '#f44336',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderColor: 'black',
                    },
                    '&:hover fieldset': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderColor: 'black',
                    borderWidth: 1,
                    borderStyle: 'solid',
                },
            },
        },
    },
});

export default theme;