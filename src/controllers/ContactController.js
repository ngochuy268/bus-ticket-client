import { toast } from "react-toastify";
import { mailModel } from "../models/ContactModel";
import React, { useEffect, useState } from "react";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await mailModel(formData);
            toast.dismiss();
            toast.success('メールは正常に送信されました');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.dismiss();
            toast.error('メールの送信に失敗しました');
            console.error(error);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit
    }
}
