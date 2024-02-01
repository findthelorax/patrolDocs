import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
	async createLift(mountainId, lift) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/lift`, lift);
			return response.data;
		} catch (error) {
			console.error(`Error creating lift for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getAllLifts(mountainId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/lift`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching lifts for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getLift(mountainId, liftId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching lift with id ${liftId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async updateLift(mountainId, liftId, updatedLift) {
		try {
			const response = await axios.patch(`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}`, updatedLift);
			return response.data;
		} catch (error) {
			console.error(`Error updating lift with id ${liftId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async deleteLift(mountainId, liftId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting lift with id ${liftId} for mountain with id ${mountainId}`, error);
			throw error;
		}
	},

	async getAllLiftLineChecks(mountainId, liftId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}/linecheck`);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching line checks for lift with id ${liftId} for mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async createLiftLineCheck(mountainId, liftId, lineCheck) {
		try {
			const response = await axios.post(
				`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}/linecheck`,
				lineCheck
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error creating line check for lift with id ${liftId} for mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async getLiftLineCheck(mountainId, liftId, lineCheckId) {
		try {
			const response = await axios.get(
				`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}/linecheck/${lineCheckId}`
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching line check with id ${lineCheckId} for lift with id ${liftId} for mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async updateLiftLineCheck(mountainId, liftId, lineCheckId, updatedLineCheck) {
		try {
			const response = await axios.patch(
				`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}/linecheck/${lineCheckId}`,
				updatedLineCheck
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error updating line check with id ${lineCheckId} for lift with id ${liftId} for mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async deleteLiftLineCheck(mountainId, liftId, lineCheckId) {
		try {
			const response = await axios.delete(
				`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}/linecheck/${lineCheckId}`
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error deleting line check with id ${lineCheckId} for lift with id ${liftId} for mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async addLiftToArea(mountainId, liftId, areaId) {
		try {
			const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}/${areaId}`);
			return response.data;
		} catch (error) {
			console.error(
				`Error adding lift with id ${liftId} to area with id ${areaId} for mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

	async removeLiftFromArea(mountainId, liftId, areaId) {
		try {
			const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/lift/${liftId}/${areaId}`);
			return response.data;
		} catch (error) {
			console.error(
				`Error removing lift with id ${liftId} from area with id ${areaId} for mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},
};
