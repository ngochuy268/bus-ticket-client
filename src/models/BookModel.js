import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createBooking = async (reservationData) => {
    try {
        const response = await axios.post(`${API_URL}/api/booking`, reservationData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
