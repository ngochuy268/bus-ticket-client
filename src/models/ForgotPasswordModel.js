import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ForgotPasswordModel = {
    checkUserExists: async (email, username) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/check-user`, { email, username });
            return response.data; 
        } catch (error) {
            throw error;
        }
    },

    sendOTP: async (email) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/send-otp`, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    verifyOTP: async (email, otp) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/verify-otp`, { email, otp });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default ForgotPasswordModel;