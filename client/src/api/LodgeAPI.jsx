import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
	async createLodge(mountainId, lodge) {
		console.log("🚀 ~ file: LodgeAPI.jsx:7 ~ createLodge ~ lodge:", lodge)
		console.log("🚀 ~ file: LodgeAPI.jsx:7 ~ createLodge ~ mountainId:", mountainId)
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/lodge`, lodge);
			return response.data;
		} catch (error) {
			console.error(`Error creating lodge for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getAllLodges(mountainId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/lodge`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching lodges for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getOneLodge(mountainId, lodgeId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/lodge/${lodgeId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching lodge with id ${lodgeId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async updateLodge(mountainId, lodgeId, updatedLodge) {
		try {
			const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}/lodge/${lodgeId}`, updatedLodge);
			return response.data;
		} catch (error) {
			console.error(`Error updating lodge with id ${lodgeId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async deleteLodge(mountainId, lodgeId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/lodge/${lodgeId}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting lodge with id ${lodgeId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},
};
