import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
	async createLog(mountainId, log) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/incident`, log);
			return response.data;
		} catch (error) {
			console.error(`Error creating log`, error);
			throw error;
		}
	},

	async getAllLogs(mountainId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/incident`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching all logs`, error);
			throw error;
		}
	},

	async getLog(mountainId, incidentLogId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/incident/${incidentLogId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching log with id ${incidentLogId}`, error);
			throw error;
		}
	},

	async updateLog(mountainId, incidentLogId, updatedLog) {
		try {
			const response = await axios.patch(`${IP}:${PORT}/mountain/${mountainId}/incident/${incidentLogId}`, updatedLog);
			return response.data;
		} catch (error) {
			console.error(`Error updating log with id ${incidentLogId}`, error);
			throw error;
		}
	},

	async deleteLog(mountainId, incidentLogId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/incident/${incidentLogId}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting log with id ${incidentLogId}`, error);
			throw error;
		}
	},
};
