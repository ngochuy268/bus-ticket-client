import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { BookController } from '../../../controllers/BookController';

const Book = ({routes}) => {

    const {
        handleClickOpen, 
        handleClose, 
        handleChange,
        handleSearch, 
        calculateTravelTime, 
        searchTriggered, 
        open, 
        formData,
        handleConfirm, 
        routesByDepartAndDest,
        uniqueDeparts,
        uniqueDests
    } = BookController(routes);
    
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
                                    {formData.guests > 1 && (
                                        <div className="col-lg-12 mb-3">
                                            <div className="alert alert-warning">
                                                <small>
                                                    <strong>注意:</strong> 黄色で強調表示されたフィールドは、予約を削除できる権限を持つゲストです。
                                                </small>
                                            </div>
                                        </div>
                                    )}                            
                                    <div className="col-lg-3" >
                                        <fieldset>
                                            <label htmlFor='name' className="form-label">名前</label>
                                                {formData.name.map((name, index) => {
                                                    const isDisabled = formData.guests === 0 || index >= formData.guests;
                                                    const isPrimaryGuest = index === 0 && formData.guests > 1;
                                                    return (
                                                        <input
                                                        key={index}
                                                        type="text"
                                                        name={`name${index}`}
                                                        className="Name"
                                                        value={name}
                                                        onChange={handleChange}
                                                        disabled={isDisabled}
                                                        style={isDisabled ? 
                                                            { cursor: 'not-allowed' } : 
                                                            isPrimaryGuest ? 
                                                                { backgroundColor: '#fff8e1', borderColor: '#ffc107', borderWidth: '2px' } : 
                                                                {}
                                                        }
                                                    />
                                                    )                                               
                                                })}
                                        </fieldset>
                                    </div>                                   
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <label htmlFor="phone" className="form-label">電話番号</label>
                                            {formData.phone.map((phone, index) => {
                                                const isDisabled = formData.guests === 0 || index >= formData.guests;
                                                const isPrimaryGuest = index === 0 && formData.guests > 1;
                                                return (
                                                    <input
                                                        key={index}
                                                        type="number"
                                                        name={`phone${index}`}
                                                        className="Number"
                                                        placeholder="Ex. +xxx xxx xxx"
                                                        value={phone}
                                                        onChange={handleChange}
                                                        disabled={isDisabled}
                                                        style={isDisabled ? 
                                                            { cursor: 'not-allowed' } : 
                                                            isPrimaryGuest ? 
                                                                { backgroundColor: '#fff8e1', borderColor: '#ffc107', borderWidth: '2px' } : 
                                                                {}
                                                        }
                                                    />
                                                );
                                            })}
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <label htmlFor="email" className="form-label">メール</label>
                                            {formData.email.map((email, index) => {
                                                const isDisabled = formData.guests === 0 || index >= formData.guests;
                                                const isPrimaryGuest = index === 0 && formData.guests > 1;
                                                return (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        name={`email${index}`}
                                                        className="Number"
                                                        placeholder="Ex. abc@gmail.com"
                                                        value={email}
                                                        onChange={handleChange}
                                                        disabled={isDisabled}
                                                        style={isDisabled ? 
                                                            { cursor: 'not-allowed' } : 
                                                            isPrimaryGuest ? 
                                                                { backgroundColor: '#fff8e1', borderColor: '#ffc107', borderWidth: '2px' } : 
                                                                {}
                                                        }
                                                    />
                                                );
                                            })}
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <label htmlFor="gender" className="form-label">性別</label>
                                            {formData.gender.map((gender, index) => {
                                                const isDisabled = formData.guests === 0 || index >= formData.guests;
                                                const isPrimaryGuest = index === 0 && formData.guests > 1;
                                                return (
                                                    <select
                                                        key={index}
                                                        name={`gender${index}`}
                                                        className="form-select"
                                                        value={gender}
                                                        onChange={handleChange}
                                                        disabled={isDisabled}
                                                        style={isDisabled ? 
                                                            { cursor: 'not-allowed' } : 
                                                            isPrimaryGuest ? 
                                                                { backgroundColor: '#fff8e1', borderColor: '#ffc107', borderWidth: '2px' } : 
                                                                {}
                                                        }
                                                    >
                                                        <option value="">性別を選択</option>
                                                        <option value="男">男</option>
                                                        <option value="女">女</option>
                                                        <option value="別">別</option>
                                                    </select>
                                                );
                                            })}
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="chooseGuests" className="form-label">ゲストの人数</label>
                                            <input type="number" name="guests" className="Number" autoComplete="on" min='0' required value={formData.guests} onChange={handleChange}/>
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
                                                {uniqueDeparts.map((item,index) => (
                                                    <option key={index} value={item}>{item}</option>
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
                                                {uniqueDests.map((item,index) => (
                                                    <option key={index} value={item}>{item}</option>
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
                                            {routesByDepartAndDest.length > 0 ? (
                                                <div className="col-lg-12">
                                                    <div className="bus-book-info-wrapper">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    {routesByDepartAndDest.map((bus, index) => {
                                                                        const totalCost = bus.cost * formData.guests * (formData.returnDate ? 2 : 1);
                                                                        return (
                                                                            <div className="bus-book-info" key={index}>
                                                                                <div className="container">
                                                                                    <div className="row">
                                                                                        <div className="col-lg-3">
                                                                                            <div className="bus-left">
                                                                                                <img src={
                                                                                                    bus.image.startsWith('data:image') 
                                                                                                    ? bus.image 
                                                                                                    : require(`../../../images/${bus.image}`) 
                                                                                                }
                                                                                                alt="Bus Image" className="bus-image" />  
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
                                                                                                    <span>{totalCost}￥</span>
                                                                                                    <div className="discount">VIP</div>
                                                                                                    {bus.seat > 0 ? 
                                                                                                    <p>まだ {bus.seat} 席空いています</p>  
                                                                                                    : <p style={{color: 'red'}}>もう席がありません</p>
                                                                                                    }                                                                    
                                                                                                </div>
                                                                                            {bus.seat > 0 ? 
                                                                                            <button className="book-button" onClick={() => handleClickOpen({ ...bus, totalCost })}>予約</button> 
                                                                                            :
                                                                                                <button className="book-button" disabled style={{ backgroundColor: '#ebebeb', border: 'none'}}>予約</button>}                                 
                                                                                            </div>
                                                                                        </div>         
                                                                                    </div>    
                                                                                </div>                                                                                                                        
                                                                            </div>    
                                                                        )
                                                                    })}                                                                                 
                                                                </div>                                                                                 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>    
                                    ): (
                                        <p style={{color: 'red'}}>一致するバスが見つかりません。</p>
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
        </>
    )

}

export default Book;