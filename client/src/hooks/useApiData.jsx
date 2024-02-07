import { useState, useEffect, useCallback } from 'react';

export const useApiData = (apiFunc, id) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiFunc(id);
            setData(response || []);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [apiFunc, id]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, fetchData]);

    return [data, isLoading, fetchData, error, setData];
};