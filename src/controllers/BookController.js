import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const BookController = (busRoutes) => { 

    // ---------タイトル----------
    useEffect(() => {
        document.title = '予約';
    })

    const navigate = useNavigate();
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null);
    const [open, setOpen] = useState(false);
    const [filteredBuses, setFilteredBuses] = useState([]);
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
    const handleSearch = () => {          
        const { name, phone, departure, destination, guests, departureDate, returnDate, email } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;

        if (
            !name || 
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
            } else if(guests <= 0 ) {
                toast.error('ゲストの人数は正の整数でなければなりません。');
            } else if (!emailRegex.test(email)) {
                toast.error("正しいメールアドレスを入力してください。");
            } else if (!phoneRegex.test(phone)) {
                toast.error("正しい電話番号を入力してください。");
            }
            return;
        }

        const results = busRoutes.filter(bus => 
            bus.depart.toLowerCase() === departure.toLowerCase() &&
            bus.dest.toLowerCase() === destination.toLowerCase()
        );
        setSearchTriggered(true);
        setFilteredBuses(results);
    };

    const handleConfirm = () => {
        const { name, phone, guests, email, departureDate, returnDate, departure, destination } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;
        const reservationData = {
            name,
            phone,
            email, 
            guests,
            departureDate,
            returnDate,
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
            !reservationData.name || 
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
        handleConfirm,
        handleClickOpen, 
        handleClose, 
        handleChange,
        handleSearch, 
        calculateTravelTime, 
        searchTriggered,
        selectedBus, 
        open, 
        filteredBuses, 
        formData,
    };
}