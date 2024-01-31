import { Button } from '@mui/material';
import { api } from '../../../api/IncidentLogAPI';

const DeleteButton = (props) => {
    const handleClick = async () => {
        try {
            await api.deleteLog(props.data.id);
            props.onRowDeleted(props.data.id);
        } catch (error) {
            console.error(`Error deleting log with id ${props.data.id}`, error);
        }
    };

    return <Button onClick={handleClick}>Delete</Button>;
};

export default DeleteButton;