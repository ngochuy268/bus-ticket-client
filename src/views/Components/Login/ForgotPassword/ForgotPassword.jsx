import { Link } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import ForgotPasswordController from '../../../../controllers/ForgtoPasswordController';
import { useNavigate } from 'react-router-dom'; 

const ForgotPW = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
    const handleSendOTP = async () => {
        await ForgotPasswordController.handleSendOTP(email, username, setOtpSent);
    };

    const handleVerifyOTP = async () => {
        await ForgotPasswordController.handleVerifyOTP(email, otp, navigate);
    };

    return (
        <div className="forgot-password">
            <div className="forgot-password-wrapper">
                <div className="title-text" style={{color: '#000'}}>
                    <div className="title">Forgot Password</div>
                </div>
                <div className="form-container">
                    <div className="form-inner">
                    <form action="#" className="forgot-pw">
                        {!otpSent ? (
                            <>
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="User Name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="field btn">
                                    <input
                                        type="button"
                                        value="Send OTP"
                                        onClick={handleSendOTP}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="field btn">
                                    <input
                                        type="button"
                                        value="Verify OTP"
                                        onClick={handleVerifyOTP}
                                    />
                                </div>
                            </>
                        )}
                        <div className="signup-link" style={{color: '#000'}}>
                            Remember your password? <Link to="/login" className='login-link'>Login now</Link>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default ForgotPW;