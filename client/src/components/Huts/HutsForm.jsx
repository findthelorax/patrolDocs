import React, { useState, useContext } from 'react';
import {
	Autocomplete,
	TextField,
	Button,
	Box,
	Stack,
	Card,
	CardContent,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { api as hutApi } from '../../api/HutAPI';
import { MountainContext } from '../../contexts/MountainContext';

const AddHutForm = () => {
	const [name, setName] = useState('');
	const [selectedArea, setSelectedArea] = useState(null);
	const { selectedMountain, fetchMountains, areas } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const hut = { name, area: selectedArea.id };
			await hutApi.addHut(selectedMountain.id, hut);
			setName('');
			setSelectedArea(null);
			fetchMountains(); // fetch the updated list of mountains
		} catch (error) {
			console.error('Error adding hut', error);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<FormControl fullWidth required>
							<InputLabel id="area-select-label">Area</InputLabel>
							<Select
								labelId="area-select-label"
								id="area-select"
								value={selectedArea}
								onChange={(e) => setSelectedArea(e.target.value)}
								label="Area"
							>
								{areas &&
									areas.map((area) => (
										<MenuItem key={area.id} value={area}>
											{area.name}
										</MenuItem>
									))}
							</Select>
						</FormControl>
						<Button type="submit" variant="contained">
							Add Hut
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

const AddHutLogForm = () => {
	const [log, setLog] = useState('');
	const [hut, setHut] = useState('');
	const { selectedMountain, fetchMountains, huts } = useContext(MountainContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await hutApi.addHutLog(selectedMountain.id, hut.id, { log });
			setLog('');
			setHut('');
			fetchMountains();
		} catch (error) {
			console.error('Error adding hut log', error);
		}
	};

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <FormControl variant="outlined" required>
                            <InputLabel id="hut-label">Hut</InputLabel>
                            <Select
                                labelId="hut-label"
                                value={hut}
                                onChange={(e) => setHut(e.target.value)}
                                label="Hut"
                            >
                                {huts && huts.map((hut) => (
                                    <MenuItem key={hut.id} value={hut.id}>
                                        {hut.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField label="Log" value={log} onChange={(e) => setLog(e.target.value)} required multiline />
                        <Button type="submit" variant="contained">Add Hut Log</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export { AddHutForm, AddHutLogForm };
