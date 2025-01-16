import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteBooking, fetchBookings } from '../models/ManageModel';

export const useManageController = (busRoutes, setBusRoutes) => {

    useEffect(() => {
        document.title = '管理';
    })
    
    const [open, setOpen] = useState(false);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState(null);
    
    const handleEdit = (e) => {
        e.preventDefault();
        toast.dismiss();
        toast.warning('予約の変更については、カスタマーサービスにご連絡ください。'); 
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    
    // ------delete booking--------
    const handleDelete = async () => {
        if (!selectedBookId) return;
        try {
            const response = await deleteBooking(selectedBookId.bookid);
            if (response.status === 200) {
                toast.dismiss();
                toast.success('予約が正常に削除されました！');
                setBookings(prevBookings => prevBookings.filter(booking => booking.bookid !== selectedBookId.bookid));
                const updatedBusRoutes = busRoutes.map(bus => {
                    if (bus.busid === selectedBookId.busid) {
                        return { ...bus, seat: bus.seat + selectedBookId.bookguest }; 
                    }
                    return bus;
                });
                setBusRoutes(updatedBusRoutes); 
            }
        } catch (error) {
            console.error('予約の削除中にエラーが発生しました:', error);
            toast.error(error.response?.data?.message || '予約を削除できませんでした!');
        } finally {
            setOpen(false);
            setSelectedBookId(null);
            setSearchTriggered(false);
            setPhone('');
            setEmail('');
        }
    };
    
    
    // ------get bus information by phone--------  
    const fetchBookingsByPhone = async () => {
        if (!phone || !email) {
            toast.error('時報を入力してください。!');
            return;
        }
        try {
            const response = await fetchBookings(phone, email);
            setBookings(response.data);    
            setError(null); 
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('この電話番号に対する予約は見つかりませんでした！');
                setBookings([]);
            } else {
                setError('予約の取得中にエラーが発生しました！');
            }
        }
        setSearchTriggered(true);
    };

    return {
        open, 
        searchTriggered, 
        phone, 
        email,
        bookings,
        handleEdit, 
        handleClose, 
        handleDelete,
        fetchBookingsByPhone,
        setPhone,
        setEmail,
        setSelectedBookId,
        setOpen
    };
}