import { createTheme } from '@mui/material/styles';

export const colors = [
	'#632B30',
	'#D58936',
	'#DEAE33',
	'#B39C4D',
	'#007CBE',
	'#94BFBE',
	'#9E4770',
	'#D65780',
	'#384D48',
];
export const incidentFormStyles = {
	'& .MuiInputBase-root': {
		height: '40px',
		fontSize: '0.875rem',
	},
};

const styleOverrides = {
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& $notchedOutline': {
						borderColor: 'black',
					},
					'&:hover $notchedOutline': {
						borderColor: 'black',
					},
					'&.Mui-focused $notchedOutline': {
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
		MuiTableContainer: {
			styleOverrides: {
				root: {
					'&.MuiPaper-root': {
						marginTop: '25px',
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: '0.75rem',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					'&:focus': {
						borderColor: 'black',
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: colors[0],
						textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
					},
				},
			},
		},
		MuiAutocomplete: {
			defaultProps: {
				size: 'small',
				minwidth: 200,
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					minWidth: '200px',
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&:nth-of-type(odd)': {
						backgroundColor: '#d3cdcd',
					},
					'&.open': {
						backgroundColor: 'lightgreen',
					},
					'&.closed': {
						backgroundColor: 'lightcoral',
					},
					'&.in-service': {
						backgroundColor: 'lightgreen',
					},
					'&.out-of-service': {
						backgroundColor: 'lightcoral',
					},
				},
			},
		},
	},
};

const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#dc7b67',
		},
		secondary: {
			main: '#dcb667',
		},
	},
	...styleOverrides,
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#dc7b67',
		},
		secondary: {
			main: '#dcb667',
		},
		background: {
			default: '#333333',
		},
	},
	...styleOverrides,
});

export { lightTheme, darkTheme };
