import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const FirstAidRoomAutocomplete = ({ selectedFirstAidRoom, setSelectedFirstAidRoom }) => {
    const { firstAidRooms } = useContext(MountainContext);

    return (
        <Autocomplete
            id="firstAidRoom-autocomplete"
            options={firstAidRooms || []}
            getOptionLabel={(option) => option && option.name ? option.name : ""}
            value={selectedFirstAidRoom}
            onChange={(event, newValue) => {
                setSelectedFirstAidRoom(newValue);
            }}
            autoHighlight
            autoSelect
            noOptionsText="No First Aid Rooms available"
            renderInput={(params) => <TextField {...params} label="First Aid Rooms" required />}
        />
    );
};

export default FirstAidRoomAutocomplete;