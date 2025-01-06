import { createBooking } from '../models/BookModel';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';


export const BookController = (busRoutes, setBusRoutes) => { 

    // ---------タイトル----------
    useEffect(() => {
        document.title = '予約';
    })

    const [searchTriggered, setSearchTriggered] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null);
    const [open, setOpen] = useState(false);
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        guests: '',
        departure: '',
        destination: '',
        departureDate: '',
        returnDate: ''
    });

    // ----------ダイアログを開く/閉じる-----------------
    const handleClickOpen = (e) => {
        setSelectedBus(e);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedBus(null); 
        setOpen(false);
    };


    // -------------予約フォーム----------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'departureDate' || name === 'returnDate') {
            validateDates(name === 'departureDate' ? value : formData.departureDate, name === 'returnDate' ? value : formData.returnDate);
        }
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

    // ------------バスを検索-------------------
    const handleSearch = () => {          
        const {name, phone, departure, destination, guests, departureDate, returnDate } = formData;
        if (!name || !phone || !departure || !destination || !guests || !departureDate) {
            toast.dismiss();
            toast.error("必須項目をすべて入力してください。");
            return;
        }

        const results = busRoutes.filter(bus => 
            bus.depart.toLowerCase() === departure.toLowerCase() &&
            bus.dest.toLowerCase() === destination.toLowerCase()
        );
        setSearchTriggered(true);
        setFilteredBuses(results);
    };

    // ------------予約を送信-------------------
    const handleSubmit = async () => {
        const { name, phone, guests, departureDate, returnDate, departure, destination } = formData;
        const reservationData = {
            name,
            phone,
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

        if( guests > selectedBus.seat) {
            toast.dismiss();
            toast.error('座席数が足りません!');
            return;
        }

        try {
            const response = await createBooking(reservationData);

            if (response.status === 200) {
                toast.dismiss();
                toast.success('予約が成功しました！');
                const updatedBusRoutes = busRoutes.map(bus => {
                    if (bus.busid === selectedBus.busid) {
                        return { ...bus, seat: bus.seat - guests }; 
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
            setOpen(false);
            setSearchTriggered(false);
            setFormData({ name: '', phone: '', guests: '', departure: '', destination: '', departureDate: '', returnDate: '' });
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

    // ---------------------Paypal---------------------
    const [paypalDialogOpen, setPaypalDialogOpen] = useState(false); 
    
    const handleConfirm = () => {
        setPaypalDialogOpen(true); 
    };

    const handlePaypalClose = () => {
        setPaypalDialogOpen(false);
    }

    const onPayPalApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert(`${details.payer.name.given_name}による支払い成功 `);
            handleSubmit();
            setPaypalDialogOpen(false);
            handleClose(); 
        });
    };

    return { 
        handleConfirm,
        paypalDialogOpen,
        handlePaypalClose,
        onPayPalApprove,
        handleClickOpen, 
        handleClose, 
        handleChange,
        handleSearch, 
        handleSubmit, 
        calculateTravelTime, 
        searchTriggered,
        selectedBus, 
        open, 
        filteredBuses, 
        formData 
    };
}