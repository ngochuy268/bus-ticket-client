import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

import { useManageController } from '../../../controllers/ManageController';

const Manage = ({busRoutes, setBusRoutes}) => {

    const { 
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
    } = useManageController(busRoutes, setBusRoutes);

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
                                                        return (
                                                            <div className="bus-info-wrapper" key={index}> 
                                                                <div className="personal-info">
                                                                    <p><span>名前：</span></p>
                                                                    {namesArray.map((name, i) => (
                                                                        <div key={i} style={{ marginLeft: '40px' }}>
                                                                            {name}
                                                                        </div>
                                                                    ))}
                                                                    <p><span>電話番号：</span>{booking.bookphone}</p>
                                                                    <p><span>メール：</span>{booking.bookemail}</p>
                                                                </div>
                                                                <div className="bus-info-depart-dest">
                                                                    <div className="bus-info">
                                                                            <img src={require(`../../../images/${booking.bookimg}`)} alt="Bus" className="bus-image" />
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
                                                                                <i className="fa-solid fa-plane-arrival"></i> : {booking.returndate}
                                                                                </p>                                    
                                                                            </div>
                                                                        <div className="cost-guests">
                                                                                <h2 style={{textAlign: 'right', fontSize: '25px'}}>💰 {booking.bookcost}￥</h2>
                                                                                <h5 style={{color: '#afafaf', marginTop: '10px'}}>ゲストの数: {booking.bookguest}</h5>
                                                                            </div>       
                                                                    </div>        
                                                                </div>                                             
                                                                <div className="manage-btn">
                                                                    <button className="btn btn-warning" onClick={handleEdit}>修理</button>
                                                                    <button className="btn btn-danger" onClick={() => {setSelectedBookId({ bookid: booking.bookid, busid: booking.busid, bookguest: booking.bookguest }); setOpen(true); }}>削除</button>
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
        </>
    )

}

export default Manage;