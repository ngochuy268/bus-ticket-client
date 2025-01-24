import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const LoginModel = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, {
                username: username,
                password: password
            })
            return response
        } catch (error) {
            throw error; 
        }
    },
};

export default LoginModel;