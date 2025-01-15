import { useLocation } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import ConfirmController from "../../../controllers/ConfirmController";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Confirm = ({busRoutes, setBusRoutes }) => {

    const location = useLocation();
    const reservationData = location.state?.reservationData;
    const { 
        calculateTravelTime, 
        handleChange, 
        formData,
        handleOpenPaypal,
        handlePaypalClose,
        paypalDialogOpen,
        onPayPalApprove,
    } = ConfirmController(reservationData, busRoutes, setBusRoutes);

    const style = {
        cursor: 'not-allowed',
        backgroundColor: '#ebebeb'
    }

    return (
       <>
           <div className="second-page-heading">
           </div>
           <div className="reservation-form">
                <div className="container">
                    <div className="row">                    
                        <div className="col-lg-12">
                            <div id="reservation-form" name="gs" method="submit" role="search">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4><em>予約確認</em>を<em>して</em>ください</h4>
                                    </div>
                                    <div className="col-lg-4">
                                        <fieldset>
                                            <label htmlFor="Name" className="form-label">名前</label>                                           
                                                {formData.name.map((name, index) => {
                                                    const isDisabled = formData.guests === 0 || index >= formData.guests;
                                                    return (                                                                                                             
                                                        <input
                                                            key={index}
                                                            type="text"
                                                            name={`name${index}`}
                                                            className="Name"
                                                            value={name}
                                                            onChange={handleChange}
                                                            disabled={isDisabled}
                                                            style={isDisabled ? { cursor: 'not-allowed' } : {}}
                                                        />
                                                    )                                               
                                                })}
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-4">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">電話番号</label>
                                            <input type="number" name="phone" className="Number" autoComplete="on" required value={formData.phone} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-4">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">メール</label>
                                            <input type="text" name="email" className="Number" autoComplete="on" required value={formData.email} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="chooseGuests" className="form-label">ゲストの人数</label>
                                            <input type="number" name="guests" className="Number" autoComplete="on" required value={formData.guests} onChange={handleChange}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">出発日</label>
                                            <input type="text" name="departureDate" className="date" disabled value={formData.departureDate} style={style}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">帰国日</label>
                                            <input type="text" name="returnDate" className="date" disabled value={formData.returnDate} style={style}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">出発地</label>
                                            <input type="text" name="departure" className="date" disabled value={formData.departure} style={style}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">行き先</label>
                                            <input type="text" name="destination" className="date" disabled value={formData.destination} style={style}/>
                                        </fieldset>
                                    </div>                                                
                                    <div className="col-lg-12">
                                        <div className="bus-book-info-wrapper">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="bus-book-info">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-lg-3">
                                                                        <div className="bus-left">
                                                                            <img src={require(`../../../images/${formData.selectedBus.image}`)} alt="Bus Image" className="bus-image" />  
                                                                            <div className="confirm-ticket">
                                                                                    即時確認    
                                                                                <div className="point"></div> 
                                                                            </div>       
                                                                                                                    
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="bus-middle">
                                                                            <h4>{formData.selectedBus.busname}</h4>
                                                                            <h6>{formData.selectedBus.bustype}</h6>
                                                                            <div className="rating">
                                                                                <span className="stars">⭐ {formData.selectedBus.rate}</span>
                                                                                <span className="reviews">(1349)</span>
                                                                            </div>
                                                                            <p>{formData.selectedBus.type}</p>
                                                                            <div className="schedule">
                                                                                <div className="time">
                                                                                    <span>🕒 {formData.selectedBus.departtime}</span> <span>• {formData.departure}</span>
                                                                                </div>
                                                                                <p style={{textAlign: 'center'}}>{calculateTravelTime(formData.selectedBus.departtime, formData.selectedBus.arrivaltime)}</p>
                                                                                <div className="time">
                                                                                    <span>🕒 {formData.selectedBus.arrivaltime}</span> <span>• {formData.destination}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <div className="bus-right">
                                                                            <div className="price">
                                                                                <span>{formData.selectedBus.cost}￥</span>
                                                                                <div className="discount">VIP</div>   
                                                                            </div>
                                                                        </div>
                                                                    </div>  
                                                                            
                                                                </div>    
                                                            </div>                                                                                                                        
                                                        </div>    
                                                    </div>                                                                                 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <button className="search-button" style={{marginBottom : '30px', width: 'fit-content'}}
                                                onClick={handleOpenPaypal}
                                            >
                                                予約
                                            </button>
                                        </div>     
                                    </div>                                                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
            {/* Dialog PayPal */}
            <Dialog 
                open={paypalDialogOpen} 
                onClose={handlePaypalClose}
            >
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
                                        value: formData.selectedBus ? formData.selectedBus.cost : "0", 
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
                <Button 
                    onClick={handlePaypalClose} 
                    color="secondary"
                >
                    キャンセル
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Confirm;