import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

export const api = {
    async getAllLifts(mountainId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/lift`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching lifts for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async createLift(mountainId, lift) {
        try {
            const response = await axios.post(`${IP}:${PORT}/${mountainId}/lift`, lift);
            return response.data;
        } catch (error) {
            console.error(`Error creating lift for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getLift(mountainId, liftId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/lift/${liftId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateLift(mountainId, liftId, updatedLift) {
        try {
            const response = await axios.patch(`${IP}:${PORT}/${mountainId}/lift/${liftId}`, updatedLift);
            return response.data;
        } catch (error) {
            console.error(`Error updating lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteLift(mountainId, liftId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/${mountainId}/lift/${liftId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getAllLineChecks(mountainId, liftId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/lift/${liftId}/linecheck`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching line checks for lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async createLineCheck(mountainId, liftId, lineCheck) {
        try {
            const response = await axios.post(`${IP}:${PORT}/${mountainId}/lift/${liftId}/linecheck`, lineCheck);
            return response.data;
        } catch (error) {
            console.error(`Error creating line check for lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getLineCheck(mountainId, liftId, lineCheckId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/lift/${liftId}/linecheck/${lineCheckId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching line check with id ${lineCheckId} for lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateLineCheck(mountainId, liftId, lineCheckId, updatedLineCheck) {
        try {
            const response = await axios.patch(`${IP}:${PORT}/${mountainId}/lift/${liftId}/linecheck/${lineCheckId}`, updatedLineCheck);
            return response.data;
        } catch (error) {
            console.error(`Error updating line check with id ${lineCheckId} for lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteLineCheck(mountainId, liftId, lineCheckId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/${mountainId}/lift/${liftId}/linecheck/${lineCheckId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting line check with id ${lineCheckId} for lift with id ${liftId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async addLiftToArea(mountainId, liftId, areaId) {
        try {
            const response = await axios.post(`${IP}:${PORT}/${mountainId}/lift/${liftId}/${areaId}`);
            return response.data;
        } catch (error) {
            console.error(`Error adding lift with id ${liftId} to area with id ${areaId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async removeLiftFromArea(mountainId, liftId, areaId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/${mountainId}/lift/${liftId}/${areaId}`);
            return response.data;
        } catch (error) {
            console.error(`Error removing lift with id ${liftId} from area with id ${areaId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },
};