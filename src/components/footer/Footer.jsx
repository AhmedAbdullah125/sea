import React, { useEffect, useState } from 'react'
import footerlogo from '../../../public/home/footerLogo.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import apple from '../../../public/home/apple.svg'
import google from '../../../public/home/google.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../lib/apiConfig'
import Loading from '../loading/Loading'
import { motion } from "framer-motion";
import payImg1 from '../../assets/pay-img/01.svg'
import payImg2 from '../../assets/pay-img/02.svg'
import payImg3 from '../../assets/pay-img/03.svg'
import payImg4 from '../../assets/pay-img/04.svg'
import payImg5 from '../../assets/pay-img/05.svg'
const Footer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, []);
    return (
        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='footer'>
            {
                loading ? <Loading /> :
                    <div className="container">
                        <div className="upperfooter">
                            <div className="logo-cont">
                                <LazyLoadImage src={footerlogo} alt="logo" loading='lazy' />
                                <p>منصّتنا تسهّل عليك حجز أماكن الإقامة حول العالم بأسعار منافسة، صور حقيقية، وخدمة موثوقة.</p>
                                <div className="social-cont">
                                    <h3>تـــابعنا على __</h3>
                                    <div className="ies">
                                        {data.facebook && <Link to="#"><i className="fa-brands fa-facebook-f"></i></Link>}
                                        {data.instagram && <Link to="#"><i className="fa-brands fa-instagram"></i></Link>}
                                        {data.tiktok && <Link to="#"><i className="fa-brands fa-tiktok"></i></Link>}
                                        {data.twitter && <Link to="#"><i className="fa-brands fa-x-twitter"></i></Link>}
                                        {data.linkedin && <Link to="#"><i className="fa-brands fa-linkedin-in"></i></Link>}
                                        {data.snapchat && <Link to="#"><i className="fa-brands fa-snapchat"></i></Link>}
                                    </div>
                                </div>
                            </div>
                            <div className="links-cont relative">
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
                                        <Link to="/blogs">المدونة</Link>
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
                                        <Link to={`mailto:${data.email}`}>{data.email}</Link>
                                        <Link to={`tel:${data.mobile}`}>{data.mobile}</Link>
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
                                {/* payments */}
                                <div className='flex items-center gap-4  md:absolute bottom-6  right-0'>
                                    <img src={payImg1} alt="pay-img" className='w-14' />
                                    <img src={payImg2} alt="pay-img" className='w-14' />
                                    <img src={payImg3} alt="pay-img" className='w-14' />
                                    <img src={payImg4} alt="pay-img" className='w-14' />
                                    <img src={payImg5} alt="pay-img" className='w-14' />
                                </div>
                            </div>
                        </div>
                        <div className="lowerfooter">
                            <Link to="/terms">الشروط و الأحكام</Link>
                            <p >جميع الحقوق محفوظة لشركة ســـي - SEA</p>
                            <Link to="/privacy">سياسة الشركة</Link>
                        </div>
                    </div>
            }
        </motion.footer>
    )
}
export default Footer