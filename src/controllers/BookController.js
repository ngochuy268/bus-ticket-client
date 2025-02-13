import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRoutesByDepartAndDest } from '../models/BookModel';

export const BookController = (routes) => { 

    // ---------タイトル----------
    useEffect(() => {
        document.title = '予約';
    })

    const navigate = useNavigate();
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null);
    const [open, setOpen] = useState(false);
    const [uniqueDeparts, setUniqueDeparts] = useState([]);
    const [uniqueDests, setUniqueDests] = useState([]);
    const [routesByDepartAndDest, setRoutesByDepartAndDest] = useState([]);
    const [error, setError] = useState(null);
    const initialGuests = 1; 
    const initialReceiveCode = Array(initialGuests).fill(0); 
    initialReceiveCode[0] = 1; 
    const [formData, setFormData] = useState({
        name: [''],
        phone: [''],
        email:[''],
        gender: [''],
        guests: initialGuests,
        departure: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        receiveCode: initialReceiveCode
    }); 

    // ---------------Route List--------------------
        useEffect(() => {
            const allDeparts = routes.map(route => route.depart);
            const allDests = routes.map(route => route.dest);
        
            const uniqueDeparts = [...new Set(allDeparts)];
            const uniqueDests = [...new Set(allDests)];
             
            setUniqueDeparts(uniqueDeparts);
            setUniqueDests(uniqueDests);
        }, [routes]);


        // -------------予約フォーム----------------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'guests') {
            const guestsCount = parseInt(value) || 0;

            setFormData((prev) => {
                const updatedNames = [...prev.name];
                const updatedPhones = [...prev.phone];
                const updatedEmails = [...prev.email];
                const updatedGenders = [...prev.gender];
                const updatedReceiveCodes = [...prev.receiveCode];

                if (guestsCount > updatedNames.length) {
                    while (updatedNames.length < guestsCount) {
                        updatedNames.push('');
                        updatedPhones.push('');
                        updatedEmails.push('');
                        updatedGenders.push('');
                        updatedReceiveCodes.push(0);
                    }
                 }else if (guestsCount < updatedNames.length) {
                    updatedNames.splice(guestsCount <= 0 ? 1 : guestsCount);
                    updatedPhones.splice(guestsCount <= 0 ? 1 : guestsCount);
                    updatedEmails.splice(guestsCount <= 0 ? 1 : guestsCount);
                    updatedGenders.splice(guestsCount <= 0 ? 1 : guestsCount);
                    updatedReceiveCodes.splice(guestsCount <= 0 ? 1 : guestsCount);
                }

                if (updatedReceiveCodes.length > 0) {
                    updatedReceiveCodes[0] = 1;
                }
    
                return {
                    ...prev,
                    guests: guestsCount,
                    name: updatedNames,
                    phone: updatedPhones,
                    email: updatedEmails,
                    gender: updatedGenders,
                    receiveCode: updatedReceiveCodes
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

        if (name === 'departureDate' || name === 'returnDate') {
            validateDates(name === 'departureDate' ? value : formData.departureDate, name === 'returnDate' ? value : formData.returnDate);
        }

    };
    
    // ------------バスを検索-------------------
    const handleSearch = async () => {          
        const { name, phone, gender, departure, destination, guests, departureDate, email } = formData;
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
            !isGender ||
            !departure || 
            !destination || 
            guests <= 0 || 
            !departureDate || 
            !isEmail || 
            !isEmailValid || 
            !isPhoneValid ||
            hasDuplicatePhones ||
            hasDuplicateEmails
        ) {
            toast.dismiss();
            if (!name || !phone || !gender || !departure || !destination || !guests || !departureDate || !email) {
                toast.error("必須項目をすべて入力してください。");
            } else if (!isNameValid) {
                toast.error("すべての名前を入力してください。"); 
            } else if (!isGender) {
                toast.error("すべての性別を入力してください。"); 
            } else if (!isEmail) {
                toast.error("すべてのメールを入力してください。"); 
            } else if (!isPhone) {
                toast.error("すべての電話番号を入力してください。"); 
            } else if(guests <= 0 ) {
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
        try {
            const response = await fetchRoutesByDepartAndDest(departure, destination);
            if (departure == destination) {
                toast.error('出発地と目的地を同じにすることはできません!');
                return;
            } 
            setSearchTriggered(true);
            setRoutesByDepartAndDest(response.data);    
            setError(null); 
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Error！');
                setRoutesByDepartAndDest([]);
            } else {
                setError('Error！');
            }
        }
    };

    const handleConfirm = () => {
        const { name, phone, email, gender, guests, departureDate, returnDate, departure, destination, receiveCode } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;       
        const reservationData = {
            name,
            phone,
            email, 
            gender,
            guests,
            departureDate,
            returnDate: returnDate || null,
            departure,
            destination,
            receiveCode,

            selectedBus : {
                busid: selectedBus.busid,
                busname: selectedBus.busname,
                rate: selectedBus.rate,
                type: selectedBus.bustype,
                departtime: selectedBus.departtime,
                arrivaltime: selectedBus.arrivaltime,
                cost: selectedBus.totalCost,
                seat: selectedBus.seat,
                image: selectedBus.image
            }
        };
        const isNameValid = reservationData.name.every((n) => n.trim() !== '');
        const isPhone = reservationData.phone.every((n) => n.trim() !== '');
        const isEmail = reservationData.email.every((n) => n.trim() !== '');
        const isPhoneValid = reservationData.phone.every((p) => phoneRegex.test(p));
        const isEmailValid = reservationData.email.every((e) => emailRegex.test(e));
        const isGender = reservationData.gender.every((g) => g.trim() !== '');
        const hasDuplicatePhones = new Set(reservationData.phone).size !== phone.length;
        const hasDuplicateEmails = new Set(reservationData.email).size !== email.length;
        if (
            !isNameValid  || 
            !isPhone || 
            !isGender ||
            !reservationData.departure || 
            !reservationData.destination || 
            reservationData.guests <= 0|| 
            !reservationData.departureDate || 
            !isEmail || 
            !isPhoneValid || 
            !isEmailValid ||
            hasDuplicateEmails ||
            hasDuplicatePhones
        ) {
            toast.dismiss();
            if (!name || !phone || !gender || !departure || !destination || !guests || !departureDate || !email) {
                toast.error("必須項目をすべて入力してください。");
            } else if (!isNameValid) {
                toast.error("すべての名前を入力してください。"); 
            } else if (!isGender) {
                toast.error("すべての性別を入力してください。"); 
            } else if (!isEmail) {
                toast.error("すべてのメールを入力してください。"); 
            } else if (!isPhone) {
                toast.error("すべての電話番号を入力してください。"); 
            } else if(guests <= 0 ) {
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

        if( guests > selectedBus.seat) {
            toast.dismiss();
            toast.error('座席数が足りません!');
            return;
        }
        navigate('/confirm', { state: { reservationData } });
    };

    // ----------ダイアログを開く/閉じる-----------------
    const handleClickOpen = (e) => {
        setSelectedBus(e);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedBus(null); 
        setOpen(false);
    };

    // ------------日付を検証する-------------------
    const validateDates = (departureDate, returnDate) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const depDate = new Date(departureDate);
        depDate.setHours(0, 0, 0, 0);
        const retDate = returnDate ? new Date(returnDate) : null;

        if (depDate < currentDate) {
            toast.dismiss();
            toast.error(' 出発日は今日または未来の日付でなければなりません。');
            setFormData({ ...formData, returnDate: '', departureDate: '' });
        } else if (returnDate && depDate >= retDate) {
            toast.dismiss();
            toast.error('出発日は到着日より前でなければなりません。');
            setFormData({ ...formData, returnDate: '', departureDate: '' });
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


    return { 
        routesByDepartAndDest,
        handleConfirm,
        handleClickOpen, 
        handleClose, 
        handleChange,
        handleSearch, 
        calculateTravelTime, 
        searchTriggered,
        selectedBus, 
        open, 
        formData,
        uniqueDeparts,
        uniqueDests
    };
}