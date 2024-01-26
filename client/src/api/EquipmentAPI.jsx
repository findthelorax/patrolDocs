import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

export const api = {
    async getAllEquipments(mountainId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/equipment`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching all equipments for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async createEquipment(mountainId, equipment) {
        try {
            const response = await axios.post(`${IP}:${PORT}/${mountainId}/equipment`, equipment);
            return response.data;
        } catch (error) {
            console.error(`Error creating equipment for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getEquipment(mountainId, id) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/equipment/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching equipment with id ${id} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateEquipment(mountainId, id, updatedEquipment) {
        try {
            const response = await axios.patch(`${IP}:${PORT}/${mountainId}/equipment/${id}`, updatedEquipment);
            return response.data;
        } catch (error) {
            console.error(`Error updating equipment with id ${id} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteEquipment(mountainId, id) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/${mountainId}/equipment/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting equipment with id ${id} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getEquipmentLog(mountainId, equipmentId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/equipment/${equipmentId}/log`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching log for equipment with id ${equipmentId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async addEquipmentLog(mountainId, equipmentId, log) {
        try {
            const response = await axios.post(`${IP}:${PORT}/${mountainId}/equipment/${equipmentId}/log`, log);
            return response.data;
        } catch (error) {
            console.error(`Error adding log for equipment with id ${equipmentId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getEquipmentLog(mountainId, equipmentId, logId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/${mountainId}/equipment/${equipmentId}/log/${logId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching log with id ${logId} for equipment with id ${equipmentId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateEquipmentLog(mountainId, equipmentId, logId, updatedLog) {
        try {
            const response = await axios.patch(`${IP}:${PORT}/${mountainId}/equipment/${equipmentId}/log/${logId}`, updatedLog);
            return response.data;
        } catch (error) {
            console.error(`Error updating log with id ${logId} for equipment with id ${equipmentId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteEquipmentLog(mountainId, equipmentId, logId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/${mountainId}/equipment/${equipmentId}/log/${logId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting log with id ${logId} for equipment with id ${equipmentId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },
};