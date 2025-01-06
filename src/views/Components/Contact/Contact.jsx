import { useMailController } from "../../../controllers/ContactController";
import ReCAPTCHA from 'react-google-recaptcha';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const Contact = () => {

    const { formData, handleChange, handleFormSubmit, handleCaptchaChange, recaptchaRef } = useMailController();
    

    return (
        <>
            <div className="second-page-heading">
            </div>
            <div className="reservation-form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <form id="reservation-form" style={{'borderRadius' : '23px'}} name="gs" onSubmit={handleFormSubmit} role="search">
                                <div className="row">
                                    <div className="col-lg-12">                                       
                                        <h4>この<em>フォーム</em>を通じて<em>連絡</em>を取りましょう</h4>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Name" className="form-label">名前</label>
                                            <input type="text" name="name" 
                                                value={formData.name} 
                                                onChange={handleChange} 
                                                className="Name" placeholder="Ex. John Smithee" autoComplete="on" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="Number" className="form-label">メール</label>
                                            <input type="email" name="email" 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                className="Number" placeholder=".........@gmail.com" autoComplete="on" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="Subject" className="form-label">件名</label>
                                            <input type="text" name="subject" 
                                                value={formData.subject} 
                                                onChange={handleChange} 
                                                className="Number"  autoComplete="on" required />
                                        </fieldset>
                                    </div>                                
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="Message" className="form-label">メッセージ</label>
                                            <input type="text" name="message" className="Number"  autoComplete="on" required
                                                value={formData.message} 
                                                onChange={handleChange} />
                                        </fieldset>
                                    </div> 
                                    <div className="col-lg-12">
                                        <ReCAPTCHA
                                            style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}
                                            ref={recaptchaRef}
                                            sitekey="6LefuK4qAAAAAFSbFowPpF5psik_vqc5k3-nRQ8l" 
                                            onChange={handleCaptchaChange}                                           
                                        />
                                    </div>
                                    <div className="col-lg-12">                        
                                        <fieldset>
                                            <button className="main-button" type="submit">送信</button>
                                        </fieldset>
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )

}

export default Contact;