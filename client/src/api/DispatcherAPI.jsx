import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
	async getAllDispatcherLogs(mountainId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/dispatcher`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching all logs for dispatchers.`, error);
			throw error;
		}
	},

	async getDispatcherForDate(mountainId, date) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/dispatcher/${date}`);
			return response.data;
		} catch (error) {
			if (axios.isCancel(error)) {
				console.error('Request cancelled', error.message);
			} else if (error.code === 'ECONNABORTED') {
				console.error('Request timed out', error.message);
			} else {
				console.error(`Error fetching dispatcher for mountain with id ${mountainId} on date ${date}`, error);
			}
			throw error;
		}
	},

	async createDispatcherLog(mountainId, date) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/dispatcher`, date);
			return response.data;
		} catch (error) {
			console.error(`Error creating dispatcher log.`, error);
			throw error;
		}
	},

	async getDispatcherLog(mountainId, dispatcherLogId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/dispatcher/${dispatcherLogId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching log with id ${dispatcherLogId}`, error);
			throw error;
		}
	},

	async updateDispatcherLog(mountainId, dispatcherLogId) {
		try {
			const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}/dispatcher/${dispatcherLogId}`);
			return response.data;
		} catch (error) {
			console.error(`Error updating log with id ${dispatcherLogId}.`, error);
			throw error;
		}
	},

	async deleteDispatcherLog(mountainId, dispatcherLogId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/dispatcher/${dispatcherLogId}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting log with id ${dispatcherLogId}.`, error);
			throw error;
		}
	},
};
