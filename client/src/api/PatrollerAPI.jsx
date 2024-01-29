import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
	async createPatroller(mountainId, patroller) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/patroller`, patroller);
			return response.data;
		} catch (error) {
			console.error('Error creating patroller', error);
			throw error;
		}
	},

	async getAllPatrollers(mountainId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/patroller`);
			return response.data;
		} catch (error) {
			console.error('Error fetching patrollers', error);
			throw error;
		}
	},

	async getPatroller(mountainId, patrollerId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async updatePatroller(mountainId, patrollerId, updatedPatroller) {
		try {
			const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}`, updatedPatroller);
			return response.data;
		} catch (error) {
			console.error(`Error updating patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async deletePatroller(mountainId, patrollerId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async getAllPatrolDispatcherLogs(mountainId, patrollerId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}/dispatcher`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching logs for patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async getPatrolDispatcherForDate(mountainId, date) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/patroller/dispatcher/${date}`, { timeout: 5000 });
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

	async createPatrolDispatcherLog(mountainId, patrollerId, log) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}/dispatcher`, log);
			return response.data;
		} catch (error) {
			console.error(`Error creating log for patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async getPatrolDispatcherLog(mountainId, patrollerId, dispatcherId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}/dispatcher/${dispatcherId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching log with id ${dispatcherId} for patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async updatePatrolDispatcherLog(mountainId, patrollerId, dispatcherId, updatedLog) {
		try {
			const response = await axios.patch(
				`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}/dispatcher/${dispatcherId}`,
				updatedLog
			);
			return response.data;
		} catch (error) {
			console.error(`Error updating log with id ${dispatcherId} for patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async deletePatrolDispatcherLog(mountainId, patrollerId, dispatcherId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/patroller/${patrollerId}/dispatcher/${dispatcherId}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting log with id ${dispatcherId} for patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async addMountainToPatroller(patrollerId, mountainId) {
		try {
			const response = await axios.put(`${IP}:${PORT}/patroller/${patrollerId}/createMountain/${mountainId}`);
			return response.data;
		} catch (error) {
			console.error(`Error adding mountain with id ${mountainId} to patroller with id ${patrollerId}`, error);
			throw error;
		}
	},

	async removeMountainFromPatroller(patrollerId, mountainId) {
		try {
			const response = await axios.put(`${IP}:${PORT}/patroller/${patrollerId}/removeMountain/${mountainId}`);
			return response.data;
		} catch (error) {
			console.error(`Error removing mountain with id ${mountainId} from patroller with id ${patrollerId}`, error);
			throw error;
		}
	},
};
