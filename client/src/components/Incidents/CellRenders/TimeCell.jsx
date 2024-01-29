import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { MdAccessTime } from 'react-icons/md';

const TimeCellRenderer = ({ value, rowIndex, api, context, field }) => {
    const isFirstRow = rowIndex === 0;
    const [time, setTime] = useState(value);

    const handleClockIconClick = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
        setTime(formattedTime);
        api.applyTransaction({ update: [{ rowIndex, data: { ...api.getDisplayedRowAtIndex(rowIndex).data, [field]: formattedTime } }] });
    };

    useEffect(() => {
        setTime(value);
    }, [value]);

    return isFirstRow ? (
        <TextField
            value={time}
            onChange={(event) => {
                setTime(event.target.value);
                api.applyTransaction({ update: [{ rowIndex, data: { ...api.getDisplayedRowAtIndex(rowIndex).data, [field]: event.target.value } }] });
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton onClick={handleClockIconClick}>
                            <MdAccessTime />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    ) : (
        <>{value}</>
    );
};

export default TimeCellRenderer;