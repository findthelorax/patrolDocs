import { useContext, useState, useCallback, useEffect } from 'react';
import { SnackbarContext } from './SnackbarContext';

export const useApiData = (apiFunc, id) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiFunc(id);
            setData(response || []);
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    }, [apiFunc, id, setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, fetchData]);

    return [data, isLoading, fetchData];
};

export const useMountainData = (api, method, id, date) => {
    const [data, isLoading, fetchData, setData] = useApiData(api[method], id, date);
    return [data, isLoading, fetchData, setData];
};