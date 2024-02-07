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
