import React, { useState, useContext } from 'react';
import {
	TextField,
	Button,
	Box,
	Card,
	CardContent,
	Stack,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MountainContext } from '../../contexts/MountainContext';

const AddAreaForm = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [selectedMountain, setSelectedMountain] = useState('');
	const { mountains, fetchMountains, api } = useContext(MountainContext);
	const theme = useTheme();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const area = { name, description };
			await api.addArea(selectedMountain, area);
			setName('');
			setDescription('');
			setSelectedMountain('');
			fetchMountains();
		} catch (error) {
			console.error('Error adding area', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<FormControl fullWidth required>
							<InputLabel id="mountain-label">Mountain</InputLabel>
							<Select
								labelId="mountain-label"
								value={selectedMountain}
								label="Mountain"
								onChange={(e) => setSelectedMountain(e.target.value)}
							>
								{/* {mountains && mountains.map((mountain) => (
                                    <MenuItem key={mountain.id} value={mountain.id}>
                                        {mountain.name}
                                    </MenuItem>
                                ))} */}
							</Select>
						</FormControl>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<Button
							type="submit"
							variant="contained"
							style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}
						>
							Add Area
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddAreaForm;
