import LoginModel from '../models/LoginModel';
import { toast } from 'react-toastify';

const LoginController = {
    handleLogin: async (username, password, login, navigate) => {
        if (!username || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const response = await LoginModel.login(username, password);
            if (response.status === 200) {
                toast.success('Login successful!');
                const { user } = response.data;
                
                login(user); 

                if (user.permission === 1) {
                    navigate('/bus-manage');
                } else if (user.permission === 0) {
                    navigate('/ticket-manage');
                }
            } else {     
                toast.error('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to login. Please try again.');
            } else if (error.request) {
                toast.error('No response from the server. Please check your connection.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    },
};

export default LoginController;