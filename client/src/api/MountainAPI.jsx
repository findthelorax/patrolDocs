import axios from 'axios';
const IP = process.env.REACT_APP_IP;
console.log("🚀 ~ file: MountainAPI.jsx:3 ~ IP:", IP)
const PORT = process.env.REACT_APP_BACKEND_PORT;
console.log("🚀 ~ file: MountainAPI.jsx:5 ~ PORT:", PORT)

export const api = {
    async getAllMountains() {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain`);
            console.log("🚀 ~ file: MountainAPI.jsx:16 ~ getAllMountains ~ response.data:", response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching mountains', error);
            throw error;
        }
    },

    async addMountain(mountain) {
        try {
            const response = await axios.post(`${IP}:${PORT}/mountain`, mountain);
            return response.data;
        } catch (error) {
            console.error('Error adding mountain', error);
            throw error;
        }
    },

    async getMountain(mountainId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateMountain(mountainId, updatedMountain) {
        try {
            const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}`, updatedMountain);
            return response.data;
        } catch (error) {
            console.error(`Error updating mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteMountain(mountainId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getAllAreas(mountainId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/areas`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching areas for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async addArea(mountainId, area) {
        try {
            const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/areas`, area);
            return response.data;
        } catch (error) {
            console.error(`Error adding area for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async getArea(mountainId, areaId) {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/areas/${areaId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching area with id ${areaId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async updateArea(mountainId, areaId, updatedArea) {
        try {
            const response = await axios.put(`${IP}:${PORT}/mountain/${mountainId}/areas/${areaId}`, updatedArea);
            return response.data;
        } catch (error) {
            console.error(`Error updating area with id ${areaId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },

    async deleteArea(mountainId, areaId) {
        try {
            const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/areas/${areaId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting area with id ${areaId} for mountain with id ${mountainId}`, error);
            throw error;
        }
    },
};