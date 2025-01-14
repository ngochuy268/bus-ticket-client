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
                if (guestsCount > updatedNames.length) {
                    while (updatedNames.length < guestsCount) {
                        updatedNames.push('');
                    }
                } else if (guestsCount < updatedNames.length) {
                    updatedNames.splice(guestsCount <= 0 ? 1 : guestsCount);
                }
                return {
                    ...prev,
                    guests: guestsCount,
                    name: updatedNames,
                };
            });
        } else if (name.startsWith('name')) {
            const index = parseInt(name.replace('name', ''), 10); 
            setFormData((prev) => {
                const updatedNames = [...prev.name];
                updatedNames[index] = value;
                return { ...prev, name: updatedNames };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

console.log(formData)
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
        const { name, phone, guests, email } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;

        if (
            !name || 
            !phone ||           
            guests <= 0 || 
            !email || 
            !emailRegex.test(email) || 
            !phoneRegex.test(phone)
        ) {
            toast.dismiss();
            if (!name || !phone || !guests  || !email) {
                toast.error("必須項目をすべて入力してください。");
            } else if(guests <= 0) {
                toast.error('ゲストの人数は正の整数でなければなりません。');
            } else if (!emailRegex.test(email)) {
                toast.error("正しいメールアドレスを入力してください。");
            } else if (!phoneRegex.test(phone)) {
                toast.error("正しい電話番号を入力してください。");
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

    return {
        calculateTravelTime,
        handleChange,
        formData,
        handleOpenPaypal,
        handlePaypalClose,
        paypalDialogOpen,
        onPayPalApprove
    }
}

export default ConfirmController;