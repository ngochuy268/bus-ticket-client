import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ResetPasswordModel = {
    updatePassword: async (email, newPassword) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/reset-password`, { email, newPassword });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default ResetPasswordModel;