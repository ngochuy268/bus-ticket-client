import { useNavigate } from 'react-router-dom';
import ResetPasswordModel from '../models/ResetPasswordModel';
import { toast } from 'react-toastify';

const ResetPasswordController = {
    handleResetPassword: async (email, newPassword, confirmPassword, navigate) => {
        if (!newPassword || !confirmPassword) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            const response = await ResetPasswordModel.updatePassword(email, newPassword);
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to reset password. Please try again.');
            } else if (error.request) {
                toast.error('No response from the server. Please check your connection.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    },
};

export default ResetPasswordController;