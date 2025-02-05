import { useEffect, useState } from "react";
import { createBooking } from "../models/BookModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmController = (reservationData, busRoutes, setBusRoutes) => {

    useEffect(() => {
        document.title = '確認';
    })
    const navigate = useNavigate();
    const [paypalDialogOpen, setPaypalDialogOpen] = useState(false); 
    const [formData, setFormData] = useState(reservationData);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    // -------------予約フォーム----------------------
    useEffect(() => {
        if (reservationData) {
            setFormData(reservationData);
        }
    }, [reservationData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'guests') {
            const guestsCount = parseInt(value) || 0;

            setFormData((prev) => {
                const updatedNames = [...prev.name];
                const updatedPhones = [...prev.phone];
                const updatedEmails = [...prev.email];
                const updatedGenders = [...prev.gender];

                if (guestsCount > updatedNames.length) {
                    while (updatedNames.length < guestsCount) {
                        updatedNames.push('');
                        updatedPhones.push('');
                        updatedEmails.push('');
                        updatedGenders.push('');
                    }
                 }else if (guestsCount < updatedNames.length) {
                    updatedNames.splice(guestsCount <= 0 ? 1 : guestsCount);
                    updatedPhones.splice(guestsCount <= 0 ? 1 : guestsCount);
                    updatedEmails.splice(guestsCount <= 0 ? 1 : guestsCount);
                    updatedGenders.splice(guestsCount <= 0 ? 1 : guestsCount);
                }
    
                return {
                    ...prev,
                    guests: guestsCount,
                    name: updatedNames,
                    phone: updatedPhones,
                    email: updatedEmails,
                    gender: updatedGenders,
                    receiveCode: guestsCount > 1 ? 1 : 0
                };
            });
        } else if (name.startsWith('name')) {
            const index = parseInt(name.replace('name', ''), 10); 
            setFormData((prev) => {
                const updatedNames = [...prev.name];
                updatedNames[index] = value;
                return { ...prev, name: updatedNames };
            });
        } else if (name.startsWith('phone')) {
            const index = parseInt(name.replace('phone', ''), 10);
            setFormData((prev) => {
                const updatedPhones = [...prev.phone];
                updatedPhones[index] = value;
                return { ...prev, phone: updatedPhones };
            });
        } else if (name.startsWith('email')) {
            const index = parseInt(name.replace('email', ''), 10);
            setFormData((prev) => {
                const updatedEmails = [...prev.email];
                updatedEmails[index] = value;
                return { ...prev, email: updatedEmails };
            });
        } else if (name.startsWith('gender')) {
            const index = parseInt(name.replace('gender', ''), 10);
            setFormData((prev) => {
                const updatedGenders = [...prev.gender];
                updatedGenders[index] = value;
                return { ...prev, gender: updatedGenders };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // ------------移動時間を計算する-------------------
    const calculateTravelTime = (departtime, arrivaltime) => {
        const [departHour, departMinute] = departtime.split(':').map(Number);
        const [arriveHour, arriveMinute] = arrivaltime.split(':').map(Number);

        const departDate = new Date(0, 0, 0, departHour, departMinute);
        const arriveDate = new Date(0, 0, 0, arriveHour, arriveMinute);

        let diffInMinutes = (arriveDate - departDate) / (1000 * 60);

        if (diffInMinutes < 0) {
            diffInMinutes += 24 * 60;
        }

        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return `${hours}h${minutes > 0 ? `${minutes}m` : ''}`;
    }

    // 6 文字のランダムな文字列を生成します
    const generateRandomString = (length = 6) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    // ------------予約を送信-------------------
    const handleSubmit = async () => {
        try {
            const confirmCode = generateRandomString();
            const updatedFormData = {
                ...formData,
                confirmCode,
                returnDate: formData.returnDate || null
            };
            const response = await createBooking(updatedFormData);
            if (response.status === 200) {
                toast.dismiss();
                toast.success('予約が成功しました！');
                const updatedBusRoutes = busRoutes.map(bus => {
                    if (bus.busid === formData.selectedBus.busid) {
                        return { ...bus, seat: bus.seat - formData.guests }; 
                    }
                    return bus;
                });

                setBusRoutes(updatedBusRoutes); 
            } else {
                alert(`エラー: ${response.data.message}`);
            }
        } catch (error) {
            console.error('予約の送信中にエラーが発生しました:', error);

            if (error.response) {
                alert(`エラー: ${error.response.data.message || '予約の送信に失敗しました。'}`);
            } else {
                alert('予約の送信に失敗しました。');
            }
        }
        setFormData('');
    };

    
    // ---------------------Paypal--------------------
    const handleOpenPaypal = () => {
        const { name, phone, guests, email, gender } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;
        const isNameValid = name.every((n) => n.trim() !== '');
        const isPhone = phone.every((n) => n.trim() !== '');
        const isEmail = email.every((n) => n.trim() !== '');
        const isPhoneValid = phone.every((p) => phoneRegex.test(p));
        const isEmailValid = email.every((e) => emailRegex.test(e));
        const isGender = gender.every((g) => g.trim() !== '');
        const hasDuplicatePhones = new Set(phone).size !== phone.length;
        const hasDuplicateEmails = new Set(email).size !== email.length;
        if (
            !isNameValid || 
            !isPhone ||           
            guests <= 0 || 
            !isEmail || 
            !isPhoneValid || 
            !isEmailValid ||
            !isGender
        ) {
            toast.dismiss();
            if (!name || !phone || !guests  || !email || !isGender) {
                toast.error("必須項目をすべて入力してください。");
            } else if (!isNameValid) {
                toast.error("すべての名前を入力してください。"); 
            } else if (!isGender) {
                toast.error("すべての性別を入力してください。"); 
            } else if (!isEmail) {
                toast.error("すべてのメールを入力してください。"); 
            } else if (!isPhone) {
                toast.error("すべての電話番号を入力してください。"); 
            } else if(guests <= 0) {
                toast.error('ゲストの人数は正の整数でなければなりません。');
            } else if (!isEmailValid) {
                toast.error("正しいメールアドレスを入力してください。");
            } else if (!isPhoneValid) {
                toast.error("正しい電話番号を入力してください。");
            } else if (hasDuplicatePhones) {
                toast.error("電話番号が重複しています。"); 
            } else if (hasDuplicateEmails) {
                toast.error("メールアドレスが重複しています。"); 
            }
            return;
        }
        setPaypalDialogOpen(true); 
    };
        
    const handlePaypalClose = () => {
        setPaypalDialogOpen(false);
    }

    const onPayPalApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            handleSubmit();
            setPaypalDialogOpen(false);
            navigate('/');
        });
    };

    const handleCancel = () => {
        setOpenCancelDialog(true); 
    }
    const handleConfirmCancel = () => {
        setOpenCancelDialog(false); // Đóng Dialog xác nhận
        navigate('/book'); // Chuyển hướng
    };

    return {
        calculateTravelTime,
        handleChange,
        formData,
        handleOpenPaypal,
        handlePaypalClose,
        paypalDialogOpen,
        onPayPalApprove,
        handleCancel,
        handleConfirmCancel,
        openCancelDialog
    }
}

export default ConfirmController;