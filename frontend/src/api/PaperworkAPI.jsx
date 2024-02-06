import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
	async createPaperwork(paperwork) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain`, paperwork);
			return response.data;
		} catch (error) {
			console.error(`Error creating paperwork`, error);
			throw error;
		}
	},

	async getAllPaperworks() {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching all paperworks`, error);
			throw error;
		}
	},

	async getPaperwork(id) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching paperwork with id ${id}`, error);
			throw error;
		}
	},

	async updatePaperwork(id, updatedPaperwork) {
		try {
			const response = await axios.patch(`${IP}:${PORT}/mountain/${id}`, updatedPaperwork);
			return response.data;
		} catch (error) {
			console.error(`Error updating paperwork with id ${id}`, error);
			throw error;
		}
	},

	async deletePaperwork(id) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting paperwork with id ${id}`, error);
			throw error;
		}
	},
};
