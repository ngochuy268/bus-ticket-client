import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteBooking, fetchBookings, updateBooking } from '../models/ManageModel';

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
    
  
    // ------delete booking--------
    const handleDelete = async () => {
        if (!selectedBookId || !phone ) return;
        try {
            const response = await deleteBooking(selectedBookId.bookid, phone);
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
            if (error.response?.data?.message === 'Phone does not match the guest with receiveCode = 1!') {
                toast.error('この予約を削除する権利がありません。');
            } else {
                toast.error(error.response?.data?.message || '予約を削除できませんでした!');
            }
            return;
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
    
    
    const handleClose = () => {
        setOpen(false);
    };

    // Edit------------
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editedData, setEditedData] = useState([]); 

    const handleEditClick = (booking) => {
        setSelectedBooking(booking);

        const names = booking.names.split(', ');
        const nameids = booking.nameids.split(', ');
        const genders = booking.genders.split(', ');
        const phones = booking.phones.split(', ');
        const emails = booking.emails.split(', ');

        const initialData = names.map((name, index) => ({
            nameid: nameids[index],
            name,          
            gender: genders[index],
            phone: phones[index],
            email: emails[index],
        }));

        setEditedData(initialData); 
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSave = async () => {

        for (const passenger of editedData) {
            if (!passenger.name || !passenger.gender || !passenger.phone || !passenger.email) {
                toast.error('すべてのフィールドを入力してください。');
                return;
            }
        }

        if (!selectedBooking.bookdeparttime || !selectedBooking.bookarrivaltime) {
            toast.error('出発日と到着日を入力してください。');
            return;
        }

        try {
            const updatedData = {
                passengers: editedData,
                commonInfo: {
                    bookdeparttime: selectedBooking.bookdeparttime, 
                    bookarrivaltime: selectedBooking.bookarrivaltime,
                },
            };

            await updateBooking(selectedBooking.bookid, updatedData);
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.bookid === selectedBooking.bookid
                        ? {
                            ...booking,
                            names: editedData.map((passenger) => passenger.name).join(', '),
                            genders: editedData.map((passenger) => passenger.gender).join(', '),
                            phones: editedData.map((passenger) => passenger.phone).join(', '),
                            emails: editedData.map((passenger) => passenger.email).join(', '),
                            bookdeparttime: updatedData.commonInfo.bookdeparttime,
                            bookarrivaltime: updatedData.commonInfo.bookarrivaltime,
                        }
                        : booking
                )
            );
            toast.success('予約が正常に更新されました！');   
            handleCloseDialog();
        } catch (error) {
            toast.error('予約の更新に失敗しました。');
            console.error('Error updating booking:', error);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedData = [...editedData];
        updatedData[index][field] = value;
        setEditedData(updatedData);
    };
    

    return {
        open, 
        searchTriggered, 
        phone, 
        email,
        bookings,
        handleClose, 
        handleDelete,
        fetchBookingsByPhone,
        setPhone,
        setEmail,
        setSelectedBookId,
        setOpen,
        setBookings,
        handleEditClick,
        selectedBooking,
        openDialog,
        setOpenDialog,
        editedData,
        handleChange,
        handleSave,
        setSelectedBooking
    };
}