import React from 'react'
import footerlogo from '../../../public/home/footerLogo.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import apple from '../../../public/home/apple.svg'
import google from '../../../public/home/google.svg'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="upperfooter">
                    <div className="logo-cont">
                        <LazyLoadImage src={footerlogo} alt="logo" loading='lazy' />
                        <p>منصّتنا تسهّل عليك حجز أماكن الإقامة حول العالم بأسعار منافسة، صور حقيقية، وخدمة موثوقة.</p>
                        <div className="social-cont">
                            <h3>تـــابعنا على __</h3>
                            <div className="ies">
                                <Link to="#"><i className="fa-brands fa-facebook-f"></i></Link>
                                <Link to="#"><i className="fa-brands fa-instagram"></i></Link>
                                <Link to="#"><i className="fa-brands fa-tiktok"></i></Link>
                                <Link to="#"><i className="fa-brands fa-x-twitter"></i></Link>
                                <Link to="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                                <Link to="#"><i className="fa-brands fa-snapchat"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="links-cont">
                        <div className="links-group">
                            <div className="title">
                                <h3>خدمـــــاتنا</h3>
                                <div className="dashh"></div>
                            </div>
                            <div className="links">
                                <Link to="/hotels">فنــــادق وشقق فندقية</Link>
                                <Link to="/packages">بــاقات حول العالم</Link>
                                <Link to="/transport">حجز النقل والمواصلات</Link>
                                <Link to="/visa">الـــتأشيرات</Link>
                                <Link to="/table">جدولك عليـــنا</Link>
                                <Link to="/add-house">أضف بــاقتك / سكنك</Link>
                            </div>

                        </div>
                        <div className="links-group">
                            <div className="title">
                                <h3>روابــــــط سريعة</h3>
                                <div className="dashh"></div>
                            </div>
                            <div className="links">
                                <Link to="/#about">بروفايل الشركة</Link>
                                <Link to="#">أعمالنا</Link>
                                <Link to="#">من نحــــن ؟</Link>
                                <Link to="blogs">المدونة</Link>
                                <Link to="#">تســـوق معنــا</Link>
                                <Link to="/#whySee">لماذا سي !</Link>
                            </div>

                        </div>
                        <div className="links-group">
                            <div className="title" id='contactusinfos'>
                                <h3>اتصل بنــــــــا </h3>
                                <div className="dashh"></div>
                            </div>
                            <div className="links">
                                <Link to="mailto:info@tarmeezcode">info@tarmeezcode.com</Link>
                                <Link to="tel:+966577080109">+966 577 080 109</Link>
                                <Link to="tel:+966122293475">+966 122 293 475</Link>
                            </div>

                            <div className="title">
                                <h3>تحميـــل التطبيق</h3>
                                <div className="dashh"></div>
                            </div>
                            <div className="links">
                                <Link to="#"><LazyLoadImage src={google} alt="logo" loading='lazy' /></Link>
                                <Link to="#"><LazyLoadImage src={apple} alt="logo" loading='lazy' /></Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="lowerfooter">
                    <Link to="/terms">الشروط و الأحكام</Link>
                    <p >جميع الحقوق محفوظة لشركة ســـي - SEA</p>
                    <Link to="/privacy">سياسة الشركة</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
