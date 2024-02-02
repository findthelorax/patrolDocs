import { Box, TextField } from '@mui/material';
import LocationTypeAutocomplete from '../AutoComplete/LocationTypeAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import { useContext } from 'react';
import { MountainContext } from '../../contexts/MountainContext';

const LocationField = ({ locationType, setLocationType, location, setLocation, setNewRow, otherLocation, setOtherLocation }) => {
    const { locations } = useContext(MountainContext);
    const locationsArray = locations[locationType] || [];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <LocationTypeAutocomplete
                locationType={locationType}
                setLocationType={setLocationType}
                setLocation={setLocation}
                defaultLocationType="Trail"
            />
            {locationType !== 'Other' ? (
                <MountainAutocomplete
                    options={locationsArray}
                    selectedValue={location}
                    setSelectedValue={(selectedLocation) => {
                        if (selectedLocation) {
                            setLocation(selectedLocation);
                            setNewRow((prevState) => ({
                                ...prevState,
                                location: selectedLocation.name,
                            }));
                        } else {
                            setLocation(null);
                            setNewRow((prevState) => ({
                                ...prevState,
                                location: null,
                            }));
                        }
                    }}
                    label="Location"
                />
            ) : (
                <TextField
                    label="Other Location"
                    value={otherLocation}
                    onChange={(e) => {
                        setOtherLocation(e.target.value);
                        setNewRow((prevState) => ({
                            ...prevState,
                            location: e.target.value,
                        }));
                    }}
                    required
                />
            )}
        </Box>
    );
};

export default LocationField;