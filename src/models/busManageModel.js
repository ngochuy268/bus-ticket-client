import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBusesWithRoutes = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/buses-with-routes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching buses with routes:', error);
        throw error;
    }
};

export const addBus = async (newBus) => {
    try {
        const response = await axios.post(`${API_URL}/api/buses`, newBus);
        return response.data.bus;
    } catch (error) {
        console.error('Error adding bus:', error);
        throw error;
    }
};

export const deleteBus = async (busid) => {
    try {
        await axios.delete(`${API_URL}/api/buses/${busid}`);
    } catch (error) {
        console.error('Error deleting bus:', error);
        throw error;
    }
};

export const updateBus = async (busid, updatedBus) => {
    try {
        const response = await axios.put(`${API_URL}/api/buses/${busid}`, updatedBus);
        return response.data.bus;
    } catch (error) {
        console.error('Error updating bus:', error);
        throw error;
    }
};

export const addRoute = async (newRoute) => {
    try {
        const response = await axios.post(`${API_URL}/api/routes`, newRoute);
        return response.data.route;
    } catch (error) {
        console.error('Error adding route:', error);
        throw error;
    }
};

export const updateRoute = async (routeid, updatedRoute) => {
    try {
        const response = await axios.put(`${API_URL}/api/routes/${routeid}`, updatedRoute);
        return response.data.route;
    } catch (error) {
        console.error('Error updating route:', error);
        throw error;
    }
};

export const deleteRoute = async (routeid) => {
    try {
        await axios.delete(`${API_URL}/api/routes/${routeid}`);
    } catch (error) {
        console.error('Error deleting route:', error);
        throw error;
    }
};

export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new Error('Failed to convert file to base64.'));
        };
        reader.readAsDataURL(file);
    });
};