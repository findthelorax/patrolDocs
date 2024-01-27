import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
    async getAllHuts(mountainId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/hut`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching all huts for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async addHut(mountainId, hut) {
        try {
            const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/hut`, hut);
            return response.data;
        } catch (error) {
            console.error(`Error adding hut for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getHut(mountainId, hutId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateHut(mountainId, hutId, updatedHut) {
        try {
            const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}`, updatedHut);
            return response.data;
        } catch (error) {
            console.error(`Error updating hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteHut(mountainId, hutId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getHutLog(mountainId, hutId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}/log`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching log for hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async addHutLog(mountainId, hutId, log) {
        try {
            const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}/log`, log);
            return response.data;
        } catch (error) {
            console.error(`Error adding log for hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getHutLog(mountainId, hutId, logId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}/log/${logId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching log with id ${logId} for hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateHutLog(mountainId, hutId, logId, updatedLog) {
        try {
            const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}/log/${logId}`, updatedLog);
            return response.data;
        } catch (error) {
            console.error(`Error updating log with id ${logId} for hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteHutLog(mountainId, hutId, logId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/hut/${hutId}/log/${logId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting log with id ${logId} for hut with id ${hutId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },
};