import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useManageController } from '../../../controllers/ManageController';

const Manage = ({busRoutes, setBusRoutes}) => {

    const { 
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
        selectedBooking,
        openDialog,
        setOpenDialog,
        editedData,
        handleChange,
        handleSave,
        setSelectedBooking,
        handleEditClick
    } = useManageController(busRoutes, setBusRoutes);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <div className="second-page-heading">
            </div>
            <div className="reservation-form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="reservation-form" style={{'borderRadius' : '23px'}}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4>この<em>フォーム</em>を通じて<em>予約</em>を検索</h4>
                                    </div>                                    
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">電話番号</label>
                                            <input type="text" name="phone" 
                                                    className="Number" placeholder="電話番号" 
                                                    autoComplete="on" required 
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">予約ID</label>
                                            <input type="text" name="bookID" 
                                                    className="Number" placeholder="予約ID" 
                                                    autoComplete="on" required 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">                        
                                        <fieldset>
                                            <button className="main-button"　style={{width: 'fit-content'}} onClick={fetchBookingsByPhone}>Search</button>
                                        </fieldset>
                                    </div>                                   
                                </div>
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <div className="reservation-form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {searchTriggered && (bookings.length > 0 ? (
                                <div id="reservation-form" style={{'borderRadius' : '23px'}}>
                                    <div className="row">                                       
                                            <div className="col-lg-12 bus-info">                                        
                                            <fieldset >
                                                <h4>バス予約情報</h4>
                                                <div className="bus-info-super-wrapper">
                                                    {bookings.map((booking, index) => {
                                                        const namesArray = booking.names.split(', ');
                                                        const phonesArray = booking.phones.split(', ');
                                                        const emailsArray = booking.emails.split(', ');
                                                        const gendersArray = booking.genders.split(', ');
                                                        return (
                                                            <div className="bus-info-wrapper" key={index}> 
                                                                <div className="personal-info">
                                                                    {isMobile ? (
                                                                        <div>
                                                                            {namesArray.map((name, i) => (
                                                                                <div key={i} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                                                                    <div><strong>名前:</strong> {name}</div>
                                                                                    <div><strong>性別:</strong> {gendersArray[i]}</div>
                                                                                    <div><strong>電話番号:</strong> {phonesArray[i]}</div>
                                                                                    <div><strong>メール:</strong> {emailsArray[i]}</div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <TableContainer component={Paper}>
                                                                            <Table>
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>名前</TableCell>
                                                                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>性別</TableCell>
                                                                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>電話番号</TableCell>
                                                                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>メール</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {namesArray.map((name, i) => (
                                                                                        <TableRow key={i} sx={{ 
                                                                                            '&:hover': { backgroundColor: '#f9f9f9' }, // Hiệu ứng hover
                                                                                            borderBottom: '1px solid #ddd'
                                                                                        }}>
                                                                                            <TableCell>{name}</TableCell>
                                                                                            <TableCell>{gendersArray[i]}</TableCell>
                                                                                            <TableCell>{phonesArray[i]}</TableCell>
                                                                                            <TableCell>{emailsArray[i]}</TableCell>
                                                                                        </TableRow>
                                                                                    ))}
                                                                                </TableBody>
                                                                            </Table>
                                                                        </TableContainer>
                                                                    )}
                                                                </div>
                                                                <div className="bus-info-depart-dest">
                                                                    <div className="bus-info">
                                                                            <img src={
                                                                                    booking.bookimg.startsWith('data:image') 
                                                                                    ? booking.bookimg 
                                                                                    : require(`../../../images/${booking.bookimg}`) 
                                                                                }                           
                                                                            alt="Bus" className="bus-image" />
                                                                        <div className="bus-details">
                                                                            <h4 style={{marginBottom: '15px'}}>{booking.bookbusname}</h4>
                                                                            <h6>{booking.bookbustype}</h6>
                                                                            <div className="rating">⭐ {booking.bookrate}/10</div>
                                                                            <p style={{textAlign: 'left', marginTop: '10px'}}>🕒 {booking.bookdeparttime} • {booking.bookdepart}</p>
                                                                            <p style={{textAlign: 'left'}}>🕒 {booking.bookarrivaltime} • {booking.bookdest}</p>                                                                                           
                                                                        </div> 
                                                                    </div>  
                                                                    <div className="depart-dest-cost-wrapper">
                                                                            <div className="depart-dest">
                                                                                <p>
                                                                                <i className="fa-solid fa-plane-departure"></i> : {booking.departdate}  <br/>
                                                                                ---- <br/>
                                                                                <i className="fa-solid fa-plane-arrival"></i> : {booking.returndate == '0000-00-00' ? '' : booking.returndate}
                                                                                </p>                                    
                                                                            </div>
                                                                        <div className="cost-guests">
                                                                                <h2 style={{textAlign: 'right', fontSize: '25px'}}>💰 {booking.bookcost}￥</h2>
                                                                                <h5 style={{color: '#afafaf', marginTop: '10px'}}>ゲストの数: {booking.bookguest}</h5>
                                                                            </div>       
                                                                    </div>  
                                                                    <div className="manage-btn">
                                                                        <button className="btn btn-warning" onClick={() => handleEditClick(booking)}>修理</button>
                                                                        <button className="btn btn-danger" onClick={() => {setSelectedBookId({ bookid: booking.bookid, busid: booking.busid, bookguest: booking.bookguest }); setOpen(true); }}>削除</button>
                                                                    </div>        
                                                                </div>                                                                                                                                                           
                                                            </div>    
                                                        )                                                                                                               
                                                    })}                                                                                                   
                                                </div>                                                                              
                                            </fieldset>                                        
                                        </div>                                      
                                    </div>
                                </div>
                            ) : <p>予約情報が見つかりませんでした！</p>)}
                        </div>           
                    </div>
                </div>              
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>確認</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    本当にこの予約を削除してもよろしいですか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary">
                        はい
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        いいえ
                    </Button>
                </DialogActions>
            </Dialog>

            {selectedBooking && (
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md">
                    <DialogTitle style={{fontWeight: '700', fontSize: '30px'}}>予約編集</DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>名前</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>性別</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>電話番号</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>メール</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {editedData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <TextField
                                                    value={row.name}
                                                    onChange={(e) =>
                                                        handleChange(index, 'name', e.target.value)
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={row.gender}
                                                    onChange={(e) =>
                                                        handleChange(index, 'gender', e.target.value)
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={row.phone}
                                                    onChange={(e) =>
                                                        handleChange(index, 'phone', e.target.value)
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={row.email}
                                                    onChange={(e) =>
                                                        handleChange(index, 'email', e.target.value)
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TextField
                            margin="dense"
                            sx={{ marginTop: '16px' }}
                            label="出発日"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={selectedBooking.bookdeparttime}
                            onChange={(e) => setSelectedBooking({ ...selectedBooking, bookdeparttime: e.target.value })}

                        />
                        <TextField
                            margin="dense"
                            label="帰国日"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={selectedBooking.bookarrivaltime}
                            onChange={(e) => setSelectedBooking({ ...selectedBooking, bookarrivaltime: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="secondary">キャンセル</Button>
                        <Button onClick={handleSave} color="primary">保存</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )

}

export default Manage;