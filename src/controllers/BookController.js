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

    const [formData, setFormData] = useState({
        name: [''],
        phone: '',
        email:'',
        guests: 1,
        departure: '',
        destination: '',
        departureDate: '',
        returnDate: ''
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

                if (guestsCount > updatedNames.length) {
                    while (updatedNames.length < guestsCount) {
                        updatedNames.push('');
                    }
                 }else if (guestsCount < updatedNames.length) {
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

        if (name === 'departureDate' || name === 'returnDate') {
            validateDates(name === 'departureDate' ? value : formData.departureDate, name === 'returnDate' ? value : formData.returnDate);
        }

    };
    
    // ------------バスを検索-------------------
    const handleSearch = async () => {          
        const { name, phone, departure, destination, guests, departureDate, returnDate, email } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;
        const isNameValid = name.every((n) => n.trim() !== '');
      
        if (
            !isNameValid || 
            !phone || 
            !departure || 
            !destination || 
            guests <= 0 || 
            !departureDate || 
            !email || 
            !emailRegex.test(email) || 
            !phoneRegex.test(phone)
        ) {
            toast.dismiss();
            if (!name || !phone || !departure || !destination || !guests || !departureDate || !email) {
                toast.error("必須項目をすべて入力してください。");
            } else if (!isNameValid) {
                toast.error("すべての名前を入力してください。"); 
            } else if(guests <= 0 ) {
                toast.error('ゲストの人数は正の整数でなければなりません。');
            } else if (!emailRegex.test(email)) {
                toast.error("正しいメールアドレスを入力してください。");
            } else if (!phoneRegex.test(phone)) {
                toast.error("正しい電話番号を入力してください。");
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
        const { name, phone, guests, email, departureDate, returnDate, departure, destination } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;
        const isNameValid = name.every((n) => n.trim() !== '');
        const reservationData = {
            name,
            phone,
            email, 
            guests,
            departureDate,
            returnDate: returnDate || null,
            departure,
            destination,

            selectedBus : {
                busid: selectedBus.busid,
                busname: selectedBus.busname,
                rate: selectedBus.rate,
                type: selectedBus.bustype,
                departtime: selectedBus.departtime,
                arrivaltime: selectedBus.arrivaltime,
                cost: selectedBus.cost,
                seat: selectedBus.seat,
                image: selectedBus.image
            }
        };
        if (
            !isNameValid  || 
            !reservationData.phone || 
            !reservationData.departure || 
            !reservationData.destination || 
            reservationData.guests <= 0|| 
            !reservationData.departureDate || 
            !reservationData.email || 
            !emailRegex.test(reservationData.email) || 
            !phoneRegex.test(reservationData.phone)
        ) {
            toast.dismiss();
            if (!name || !phone || !departure || !destination || !guests || !departureDate || !email) {
                toast.error("必須項目をすべて入力してください。");
            } else if (!isNameValid) {
                toast.error("すべての名前を入力してください。"); 
            } else if(guests <= 0 ) {
                toast.error('ゲストの人数は正の整数でなければなりません。');
            } else if (!emailRegex.test(email)) {
                toast.error("正しいメールアドレスを入力してください。");
            } else if (!phoneRegex.test(phone)) {
                toast.error("正しい電話番号を入力してください。");
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