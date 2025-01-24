import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import SignUpController from '../../../../controllers/SignUpController';
import { useAuth } from '../../../../AuthContext'; 
import LoginController from '../../../../controllers/LoginController';

const LoginSingup = () => {
    
    const loginTextRef = useRef(null);
    const loginFormRef = useRef(null);
    const loginBtnRef = useRef(null);
    const signupBtnRef = useRef(null);
    const signupLinkRef = useRef(null);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [permission, setPermission] = useState(0);
    const [loginUsername, setLoginUsername] = useState(''); 
    const [loginPassword, setLoginPassword] = useState(''); 
    const navigate = useNavigate(); 
    const { login } = useAuth();

    useEffect(() => {
        const loginText = loginTextRef.current;
        const loginForm = loginFormRef.current;
        const loginBtn = loginBtnRef.current;
        const signupBtn = signupBtnRef.current;
        const signupLink = signupLinkRef.current;
    
        if (signupBtn && loginBtn && loginForm && loginText && signupLink) {
            signupBtn.onclick = () => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
          };
    
          loginBtn.onclick = () => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
          };
    
          signupLink.onclick = () => {
            signupBtn.click();
            return false;
          };
        }
    }, []);

    const resetForm = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setOtp('');
    };

    const handleSendOTP = () => {
        SignUpController.handleSendOTP(email, setOtpSent);
    };

    const handleSignUp = () => {
        SignUpController.handleSignUp(
            email,
            username,
            password,
            confirmPassword,
            otp,
            permission,
            setOtpSent,
            setOtp,
            resetForm,
            loginBtnRef
        );
    };

    const handleLogin = async () => {
        await LoginController.handleLogin(loginUsername, loginPassword, login, navigate);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(); 
        }
    };

    return (
        <div className='login-page'>
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login" ref={loginTextRef} style={{color: '#000'}}>Login Form</div>
                    <div className="title signup" style={{color: '#000'}}>Signup Form</div>
                </div>
                <div className="form-container" >
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" defaultChecked />
                        <input type="radio" name="slide" id="signup" />
                        <label htmlFor="login" className="slide login" ref={loginBtnRef}>Login</label>
                        <label htmlFor="signup" className="slide signup" ref={signupBtnRef}>Signup</label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form action="#" className="login" ref={loginFormRef}>
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="User Name"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    required
                                />
                            </div>
                            <div className="pass-link"><Link to="/forgot-password" className='login-link'>Forgot password?</Link></div>
                            <div className="field btn">
                                <input type="button" value="Login" onClick={handleLogin} />
                            </div>
                            <div className="signup-link">Not a member? <a href="" ref={signupLinkRef} className='login-link'>Signup now</a></div>
                            <div className="signup-link"> <a href="/" className='login-link'>Back to home</a></div>
                        </form>
                        <form className="signup" >
                            <div className="field">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="text"
                                    name="username" 
                                    placeholder="User Name" 
                                    required 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    required 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder="Confirm password" 
                                    required 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {otpSent && (
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            )}
                            <div className="field btn">
                                <input type="button" value="Send OTP" onClick={handleSendOTP}/>
                            </div>
                            <div className="field btn">
                                <input type="button" value="Signup" onClick={handleSignUp} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSingup;