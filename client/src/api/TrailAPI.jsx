import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
	async createTrail(mountainId, trail) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/trail`, trail);
			return response.data;
		} catch (error) {
			console.error(`Error creating trail for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getAllTrails(mountainId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/trail`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching trails for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getOneTrail(mountainId, trailId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching trail with id ${trailId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async updateTrail(mountainId, trailId, updatedTrail) {
		try {
			const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}`, updatedTrail);
			return response.data;
		} catch (error) {
			console.error(`Error updating trail with id ${trailId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async deleteTrail(mountainId, trailId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting trail with id ${trailId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getAllTrailLogs(mountainId, trailId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}/log`);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching trail logs for trail with id ${trailId} and mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async createTrailLog(mountainId, trailId, log) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}/log`, log);
			return response.data;
		} catch (error) {
			console.error(
				`Error creating trail log for trail with id ${trailId} and mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async getOneTrailLog(mountainId, trailId, logId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}/log/${logId}`);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching trail log with id ${logId} for trail with id ${trailId} and mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async updateTrailLog(mountainId, trailId, logId, updatedLog) {
		try {
			const response = await axios.put(
				`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}/log/${logId}`,
				updatedLog
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error updating trail log with id ${logId} for trail with id ${trailId} and mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async deleteTrailLog(mountainId, trailId, logId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/trail/${trailId}/log/${logId}`);
			return response.data;
		} catch (error) {
			console.error(
				`Error deleting trail log with id ${logId} for trail with id ${trailId} and mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},
};
