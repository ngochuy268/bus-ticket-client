import banner1 from '../../../images/img_hero.jpg'
import banner2 from '../../../images/img_hero_2.jpg'
import banner3 from '../../../images/img_hero_3.jpg'
import banner4 from '../../../images/img_hero_4.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useHomeController } from '../../../controllers/HomeController';




const Home = ({busRoutes}) => {

    const { currentItems, totalPages, handlePageChange, currentPage, settings } = useHomeController(busRoutes);

    return (
        <>      
            <section id="section-1">
                <div className="content-slider" >        
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12" style={{marginTop: '150px'}}>
                                <Slider {...settings} className='banner-inner-wrapper'>
                                    <div>
                                        <img src={banner1} className='banner-img' />
                                    </div>
                                    <div>
                                        <img src={banner2} className='banner-img' />
                                    </div>
                                    <div>
                                        <img src={banner3} className='banner-img'/>
                                    </div>
                                    <div>
                                        <img src={banner4} className='banner-img'/>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>               
            </section>
                
            <div className="visit-country">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="section-heading">
                                <h2>今すぐ私たちの国を訪れてみてください</h2>
                                <p>人生で最高の経験をお届けするために、私たちはあなたをお待ちしています。</p>
                            </div>
                        </div>
                    </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="items">
                            <div className="row">
                                {currentItems.map((item, index) => (
                                    <div className="col-lg-12" key={index}>
                                        <div className="item">
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-5">
                                                    <div className="image">
                                                        <img src={require(`../../../images/${item.image}`)} alt=""/>
                                                        <div className="confirm-ticket">
                                                            即時確認    
                                                            <div className="point"></div> 
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-sm-7">
                                                    <div className="right-content">
                                                        <h4>{item.busname}</h4>
                                                        <span>{item.bustype}</span>
                                                        <p>{item.description}</p>
                                                        <ul className="info">
                                                            <li><i className="fa fa-user"></i>{item.seat}</li>
                                                            <li><i className="fa-solid fa-star"></i>{item.rate}/10</li>
                                                            <li><i className="fa-solid fa-coins"></i>{item.cost}￥</li>
                                                        </ul>                                    
                                                    </div>
                                                    <p className="extra-info" style={{marginBottom: '30px'}}>
                                                        もっと多くの冒険が待っています！予約して素晴らしい旅を始めましょう。
                                                    </p> 
                                                    <Link to='/book' className="main-button" >今すぐに予約！！</Link>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}                     
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <ul className="page-numbers">
                                <li>
                                    <button 
                                        disabled={currentPage === 1} 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <i className="fa fa-arrow-left"></i>
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                                    <button onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                </li>
                                ))}
                                <li>
                                    <button 
                                        disabled={currentPage === totalPages} 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="side-bar-map">
                        <div className="row">
                        <div className="col-lg-12">
                            <div id="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18642.409438342682!2d106.67493686143673!3d10.804892360999961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c6b111c081%3A0x9545c9715dfe2cd7!2sHCMC%20Oncology%20Hospital!5e0!3m2!1sen!2s!4v1735223717359!5m2!1sen!2s" 
                                width="400" height="550" allowFullScreen="" style ={{'borderRadius': '10px'}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )

}

export default Home;
