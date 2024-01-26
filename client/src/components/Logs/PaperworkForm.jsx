import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { api } from '../../api/PaperworkAPI';

const AddPaperworkForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const paperwork = { title, description };
            await api.createPaperwork(paperwork);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding paperwork', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline />
                        <Button type="submit" variant="contained">Add Paperwork</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddPaperworkForm;