import SignUpModel from '../models/SignUpModel';
import { toast } from 'react-toastify';

const SignUpController = {
    handleSendOTP: async (email, setOtpSent) => {
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        if (!email.includes('@')) {
            toast.error('Email must contain "@".');
            return;
        }

        try {
            const response = await SignUpModel.sendOTP(email);
            toast.success(response.message);
            setOtpSent(true);
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

    handleSignUp: async (email, username, password, confirmPassword, otp, permission, setOtpSent, setOtp, resetForm, loginBtnRef) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

        if (!email || !username || !password || !confirmPassword || !otp) {
            toast.error('Please fill in all fields.');
            setOtp('');
            return;
        }

        if (!email.includes('@')) {
            toast.error('Email must contain "@".');
            setOtp('');
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error('Password must contain at least 1 uppercase letter, 1 number, 1 special character and 8 character');
            setOtp('');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            setOtp('');
            return;
        }

        try {
            await SignUpModel.verifyOTP(email, otp);
            const response = await SignUpModel.registerUser(email, username, password, permission);
            
            toast.success(response.message);
            resetForm();
            setOtpSent(false);

            if (loginBtnRef.current) {
                loginBtnRef.current.click();
            }
        } catch (error) {
            console.error('Error during sign-up process:', error);
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

export default SignUpController;