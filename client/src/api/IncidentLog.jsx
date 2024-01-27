import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
    async getAllLogs() {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching all logs`, error);
            throw error;
        }
    },

    async createLog(log) {
        try {
            const response = await axios.post(`${IP}:${PORT}/mountain`, log);
            return response.data;
        } catch (error) {
            console.error(`Error creating log`, error);
            throw error;
        }
    },

    async getLog(incidentLogId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${incidentLogId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching log with id ${incidentLogId}`, error);
            throw error;
        }
    },

    async updateLog(incidentLogId, updatedLog) {
        try {
            const response = await axios.patch(`${IP}:${PORT}/mountain/${incidentLogId}`, updatedLog);
            return response.data;
        } catch (error) {
            console.error(`Error updating log with id ${incidentLogId}`, error);
            throw error;
        }
    },

    async deleteLog(incidentLogId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/mountain/${incidentLogId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting log with id ${incidentLogId}`, error);
            throw error;
        }
    },
};