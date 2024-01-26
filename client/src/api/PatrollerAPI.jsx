import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

export const api = {
    async getAllPatrollers() {
        try {
            const response = await axios.get(`${IP}:${PORT}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching patrollers', error);
            throw error;
        }
    },

    async addPatroller(patroller) {
        try {
            const response = await axios.post(`${IP}:${PORT}/`, patroller);
            return response.data;
        } catch (error) {
            console.error('Error adding patroller', error);
            throw error;
        }
    },

    async getPatroller(patrollerId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${patrollerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async updatePatroller(patrollerId, updatedPatroller) {
        try {
            const response = await axios.put(`${IP}:${PORT}/${patrollerId}`, updatedPatroller);
            return response.data;
        } catch (error) {
            console.error(`Error updating patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async deletePatroller(patrollerId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/${patrollerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async getAllLogs(patrollerId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${patrollerId}/dispatcher`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching logs for patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async createLog(patrollerId, log) {
        try {
            const response = await axios.post(`${IP}:${PORT}/${patrollerId}/dispatcher`, log);
            return response.data;
        } catch (error) {
            console.error(`Error creating log for patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async getLog(patrollerId, dispatcherId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${patrollerId}/dispatcher/${dispatcherId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching log with id ${dispatcherId} for patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async updateLog(patrollerId, dispatcherId, updatedLog) {
        try {
            const response = await axios.patch(`${IP}:${PORT}/${patrollerId}/dispatcher/${dispatcherId}`, updatedLog);
            return response.data;
        } catch (error) {
            console.error(`Error updating log with id ${dispatcherId} for patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async deleteLog(patrollerId, dispatcherId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/${patrollerId}/dispatcher/${dispatcherId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting log with id ${dispatcherId} for patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async addMountainToPatroller(patrollerId, mountainId) {
        try {
            const response = await axios.put(`${IP}:${PORT}/${patrollerId}/addMountain/${mountainId}`);
            return response.data;
        } catch (error) {
            console.error(`Error adding mountain with id ${mountainId} to patroller with id ${patrollerId}`, error);
            throw error;
        }
    },

    async removeMountainFromPatroller(patrollerId, mountainId) {
        try {
            const response = await axios.put(`${IP}:${PORT}/${patrollerId}/removeMountain/${mountainId}`);
            return response.data;
        } catch (error) {
            console.error(`Error removing mountain with id ${mountainId} from patroller with id ${patrollerId}`, error);
            throw error;
        }
    },
};