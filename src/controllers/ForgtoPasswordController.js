import ForgotPasswordModel from '../models/ForgotPasswordModel';
import { toast } from 'react-toastify';

const ForgotPasswordController = {
    handleSendOTP: async (email, username, setOtpSent) => {
        if (!email || !username) {
            toast.error('Please enter both email and username.');
            return;
        }

        try {
            // Kiểm tra xem email và username có tồn tại trong database không
            const userExists = await ForgotPasswordModel.checkUserExists(email, username);
            if (!userExists) {
                toast.error('Email or username does not exist.');
                return;
            }

            // Nếu tồn tại, gửi OTP
            const response = await ForgotPasswordModel.sendOTP(email);
            toast.success(response.message);
            setOtpSent(true); // Hiển thị input nhập OTP
        } catch (error) {
            console.error('Error sending OTP:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to send OTP. Please try again.');
            } else if (error.request) {
                toast.error('No response from the server. Please check your connection.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    },

    handleVerifyOTP: async (email, otp, navigate) => {
        if (!otp) {
            toast.error('Please enter the OTP.');
            return;
        }

        try {
            const response = await ForgotPasswordModel.verifyOTP(email, otp);
            if (response.status === 200) {
                toast.success('OTP verified successfully.');
                navigate('/reset-password', { state: { email } }); // Điều hướng sang trang reset password
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred. Please try again.');
            } else if (error.request) {
                toast.error('No response from the server. Please check your connection.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    },
};

export default ForgotPasswordController;