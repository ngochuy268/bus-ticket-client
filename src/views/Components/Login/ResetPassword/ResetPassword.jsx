import { useState } from 'react';
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'; 
import ResetPasswordController from '../../../../controllers/ResetPasswordController';

const ResetPW = () => {

    const location = useLocation();
    const { email } = location.state || {}; 
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        await ResetPasswordController.handleResetPassword(email, newPassword, confirmPassword, navigate);
    };

    return (
        <div className="reset-password">
            <div className="reset-password-wrapper">
                <div className="title-text">
                    <div className="title" style={{color: '#000'}}>Reset Password</div>
                </div>
                <div className="form-container">
                    <div className="form-inner">
                        <form action="/reset-password" className="reset-pw">
                            <div className="field">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="field btn">
                                <input
                                    type="button"
                                    value="Reset Password"
                                    onClick={handleResetPassword}
                                />
                            </div>
                            <div className="signup-link" style={{color: '#000'}}>
                            Remember your password? <a href="/login">Login now</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ResetPW;