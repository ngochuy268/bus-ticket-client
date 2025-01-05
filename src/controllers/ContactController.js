import { toast } from "react-toastify";
import { mailModel } from "../models/ContactModel";
import { useRef, useEffect, useState } from "react";

export const useMailController = () => {

    useEffect(() => {
        document.title = '連絡';
    })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (data) => {
        try {
            const response = await mailModel(formData, data.captchaToken);
            toast.dismiss();
            toast.success('メールは正常に送信されました');
            setFormData({ name: '', email: '', subject: '', message: ''});
            resetCaptcha();
        } catch (error) {
            toast.dismiss();
            toast.error('メールの送信に失敗しました');
            console.error(error);
        }
    };

    // ----------------------- CAPTCHA-------------------------
    const [captchaToken, setCaptchaToken] = useState('');
    const recaptchaRef = useRef(null);

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const resetCaptcha = () => {
        setCaptchaToken(''); 
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!captchaToken) {
            toast.error('CAPTCHAを確認してください。');
            return;
        }
        handleSubmit({ ...formData, captchaToken });
    };

    return {
        formData,
        handleChange,
        recaptchaRef,
        handleCaptchaChange,
        handleFormSubmit
    }
}
