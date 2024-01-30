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

const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#dc7b67',
		},
		secondary: {
			main: '#dcb667',
		},
	},
	components: {
		MuiFormControl: {
			styleOverrides: {
				root: {
					minWidth: 200,
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
					'& .MuiOutlinedInput-input': {
						padding: '10px 14px',
					},
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
		MuiTableContainer: {
			styleOverrides: {
				root: {
					marginTop: '25px',
				},
			},
		},
	},
});

export { lightTheme, darkTheme };
