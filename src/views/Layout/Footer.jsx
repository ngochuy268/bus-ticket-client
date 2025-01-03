import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="call-to-action">
                <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h2>旅行をお考えですか？</h2>
                        <h4>ボタンをクリックして予約をしましょう</h4>
                    </div>
                    <div className="col-lg-4">
                    <div className="border-button">
                        <Link to={`/book`}>今すぐご予約ください</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
           <footer>
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <p>著作権 © 2036 <a href="#">WoOx Travel</a> 会社。全著作権所有
                <br/>Design: <a href="https://templatemo.com" target="_blank" title="free CSS templates">TemplateMo</a></p>
                </div>
            </div>
            </div>
        </footer>
        </>
    )

}

export default Footer;