import axios from 'axios';
const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;

export const api = {
    getAllAidRooms: async (mountainId) => {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/aidRoom`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createAidRoom: async (mountainId, aidRoomData) => {
        try {
            const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/aidRoom`, aidRoomData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAidRoom: async (mountainId, aidRoomId) => {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateAidRoom: async (mountainId, aidRoomId, updatedData) => {
        try {
            const response = await axios.patch(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}`, updatedData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteAidRoom: async (mountainId, aidRoomId) => {
        try {
            const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getAllAidRoomLogs(mountainId) {
		try {
			const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/logs`);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching first aid room logs mountain with id ${mountainId}`,
				error
			);
			throw error;
		}
	},

    getAidRoomLogs: async (mountainId, aidRoomId) => {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}/log`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAidRoomLog: async (mountainId, aidRoomId, logId) => {
        try {
            const response = await axios.get(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}/log/${logId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createAidRoomLog: async (mountainId, aidRoomId, logData) => {
        try {
            const response = await axios.post(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}/log`, logData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateAidRoomLog: async (mountainId, aidRoomId, logId, updatedData) => {
        try {
            const response = await axios.patch(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}/log/${logId}`, updatedData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteAidRoomLog: async (mountainId, aidRoomId, logId) => {
        try {
            const response = await axios.delete(`${IP}:${PORT}/mountain/${mountainId}/aidRoom/${aidRoomId}/log/${logId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};