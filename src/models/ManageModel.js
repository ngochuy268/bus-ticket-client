import axios from 'axios';

export const deleteBooking = async (bookid) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/bookings/${bookid}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchBookings = async (phone, email) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings`, {
            params: {
                phone,
                email,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
