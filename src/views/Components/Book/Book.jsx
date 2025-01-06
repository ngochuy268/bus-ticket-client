import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookController } from '../../../controllers/BookController';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



const Book = ({busRoutes, setBusRoutes }) => {

    const {
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
        handleConfirm,
        paypalDialogOpen,
        handlePaypalClose,
        onPayPalApprove, 
    } = BookController(busRoutes, setBusRoutes);

   
    
    return (
        <>
           <div className="second-page-heading">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h4>お得なプランを予約する</h4>
                        <h2>ご予約はこちら</h2>
                        <p>最高の体験をお届けするために、私たちのサービスをご利用ください。新しい冒険があなたを待っています。</p>
                        <div className="main-button"><a href="#">さらに詳しく</a></div>
                    </div>
                </div>
                </div>
            </div>

            <div className="more-info reservation-info">
                <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                    <div className="info-item">
                        <i className="fa fa-phone"></i>
                        <h4>電話をかける</h4>
                        <a href="#">+123 456 789 (0)</a>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                    <div className="info-item">
                        <i className="fa fa-envelope"></i>
                        <h4>メールでお問い合わせください</h4>
                        <a href="#">company@email.com</a>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                    <div className="info-item">
                        <i className="fa fa-map-marker"></i>
                        <h4>私たちのオフィスにお越しください</h4>
                        <a href="#">24th Street North Avenue London, UK</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="reservation-form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18642.409438342682!2d106.67493686143673!3d10.804892360999961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c6b111c081%3A0x9545c9715dfe2cd7!2sHCMC%20Oncology%20Hospital!5e0!3m2!1sen!2s!4v1735223717359!5m2!1sen!2s" 
                                height="300" allowFullScreen="" style ={{'borderRadius': '10px', 'width': '100%', 'marginBottom':'100px'}} loading="lazy" referrerPolicy="no-referrer-when-downgrade">                       
                                </iframe>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div id="reservation-form" name="gs" method="submit" role="search">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4>この<em>フォーム</em>を通じて<em>予約</em>をしてください</h4>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Name" className="form-label">名前</label>
                                            <input type="text" name="name" className="Name" placeholder="Ex. John Smithee" autoComplete="on" required value={formData.name} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">電話番号</label>
                                            <input type="text" name="phone" className="Number"  placeholder="Ex. +xxx xxx xxx" autoComplete="on" required value={formData.phone} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="chooseGuests" className="form-label">ゲストの人数</label>
                                            <input type="text" name="guests" className="Number" autoComplete="on" required value={formData.guests} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">出発日</label>
                                            <input type="date" name="departureDate" className="date" required value={formData.departureDate} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">帰国日</label>
                                            <input type="date" name="returnDate" className="date" required value={formData.returnDate} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="chooseDestination" className="form-label">出発地</label>
                                            <select name="departure" 
                                                    className="form-select" 
                                                    value={formData.departure}
                                                    onChange={handleChange} 
                                                    aria-label="Default select example" 
                                                    id="chooseCategory"
                                            >
                                                <option value="">ex. 東京</option>
                                                {busRoutes.map((item,index) => (
                                                    <option key={index} value={item.depart}>{item.depart}</option>
                                                ))}                                               
                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="chooseDestination" className="form-label">行き先</label>
                                            <select name="destination" 
                                                    className="form-select" 
                                                    aria-label="Default select example" 
                                                    id="chooseCategory"
                                                    value={formData.destination}
                                                    onChange={handleChange}
                                            >
                                                <option value="">ex. 大阪</option>
                                                {busRoutes.map((item,index) => (
                                                    <option key={index} value={item.dest}>{item.dest}</option>
                                                ))}
                                            </select>
                                        </fieldset>
                                    </div>
                                   <div className="col-lg-12">
                                        <button className="search-button" style={{marginBottom : '30px', width: 'fit-content'}} onClick={handleSearch}>
                                            検索
                                        </button>
                                   </div>
                                    {searchTriggered && (
                                        <>
                                            {filteredBuses.length > 0 ? (
                                                <div className="col-lg-12">
                                                    <div className="bus-book-info-wrapper">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    {filteredBuses.map((bus, index) => (
                                                                        <div className="bus-book-info" key={index}>
                                                                            <div className="container">
                                                                                <div className="row">
                                                                                    <div className="col-lg-3">
                                                                                        <div className="bus-left">
                                                                                            <img src={require(`../../../images/${bus.image}`)} alt="Bus Image" className="bus-image" />  
                                                                                            <div className="confirm-ticket">
                                                                                                    即時確認    
                                                                                                <div className="point"></div> 
                                                                                            </div>       
                                                                                                                                    
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-lg-6">
                                                                                        <div className="bus-middle">
                                                                                            <h4>{bus.busname}</h4>
                                                                                            <h6>{bus.bustype}</h6>
                                                                                            <div className="rating">
                                                                                                <span className="stars">⭐ {bus.rate}</span>
                                                                                                <span className="reviews">(1349)</span>
                                                                                            </div>
                                                                                            <p>{bus.type}</p>
                                                                                            <div className="schedule">
                                                                                                <div className="time">
                                                                                                    <span>🕒 {bus.departtime}</span> <span>• {bus.depart}</span>
                                                                                                </div>
                                                                                                <p style={{textAlign: 'center'}}>{calculateTravelTime(bus.departtime, bus.arrivaltime)}</p>
                                                                                                <div className="time">
                                                                                                    <span>🕒 {bus.arrivaltime}</span> <span>• {bus.dest}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-lg-3">
                                                                                        <div className="bus-right">
                                                                                            <div className="price">
                                                                                                <span>{bus.cost}￥</span>
                                                                                                <div className="discount">VIP</div>
                                                                                                {bus.seat > 0 ? 
                                                                                                <p>まだ {bus.seat} 席空いています</p>  
                                                                                                : <p>もう席がありません</p>
                                                                                                }                                                                    
                                                                                            </div>
                                                                                           {bus.seat > 0 ? 
                                                                                           <button className="book-button" onClick={() => handleClickOpen(bus)}>予約</button> 
                                                                                           :
                                                                                            <button className="book-button" disabled>予約</button>}                                 
                                                                                        </div>
                                                                                    </div>         
                                                                                </div>    
                                                                            </div>                                                                                                                        
                                                                        </div>    
                                                                    ))}                                                                                 
                                                                </div>                                                                                 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>    
                                    ): (
                                        <p>No matching buses found.</p>
                                    )}  
                                        </>
                                    )}               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>確認</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ご予約を確定しますか?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleConfirm()} color="primary">
                        はい
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        いいえ
                    </Button>
                </DialogActions>
            </Dialog>
             {/* Dialog PayPal */}
            <Dialog open={paypalDialogOpen} onClose={handlePaypalClose}>
                <DialogTitle>PayPalによる支払い</DialogTitle>
                <DialogContent>
                <PayPalScriptProvider
                    options={{
                    "client-id": "AQyLUzcpJ2lPG0Qta_wocmPXMn-gubCn0olLfigIgkQfX_wXEyFPUgSAn7fP_HJfcezte4hVo8KW4cjY", 
                    currency: "JPY",
                    locale: "ja_JP" 
                    }}
                >
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: selectedBus ? selectedBus.cost : "0", 
                                    },
                                },
                            ],
                            });
                        }}
                        onApprove={onPayPalApprove}
                        onError={(err) => {
                            console.error("PayPalエラー:", err);
                            alert("支払い中にエラーが発生しました。もう一度試してください。");
                        }}
                    />
                </PayPalScriptProvider>
                </DialogContent>
                <DialogActions>
                <Button onClick={handlePaypalClose} color="secondary">
                    キャンセル
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default Book;