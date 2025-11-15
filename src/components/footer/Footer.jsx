import React from 'react'
import footerlogo from '../../../public/app/footerLogo.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import apple from '../../../public/app/apple.svg'
import google from '../../../public/app/google.svg'
import { Link } from 'react-router-dom'
import Loading from '../loading/Loading'
import { motion } from "framer-motion";
    import payImg1 from '../../../public/app/01.svg'
    import payImg2 from '../../../public/app/02.svg'
    import payImg3 from '../../../public/app/03.svg'
    import payImg4 from '../../../public/app/04.svg'
    import payImg5 from '../../../public/app/05.svg'
import { useGetSettings } from '@/components/global/useGetSettings';
const Footer = () => {
    const { data, isLoading, isError } = useGetSettings();
    return (
        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='footer'>
            {
                isLoading ? <Loading /> :
                    <div className="container">
                        <div className="upperfooter">

                            <div className="links-cont relative">
                                <div className="links-group">
                                    <div className="title">
                                        <h3>خدمـــــاتنا:</h3>
                                        <div className="dashh"></div>
                                    </div>
                                    <div className="links">
                                        <Link to="/hotels" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>فنــــادق وشقق فندقية</Link>
                                        <Link to="/packages" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i> بــاقات حول العالم </Link>
                                        <Link to="/visa" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>الـــتأشيرات</Link>
                                        <Link to="/transport" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>حجز النقل والمواصلات</Link>
                                    </div>
                                </div>
                                <div className="hagez_beltoot"></div>
                                <div className="links-group">
                                    <div className="title">
                                        <h3>روابط سريعة:</h3>
                                        <div className="dashh"></div>
                                    </div>
                                    <div className="links">
                                        <Link to="/add-house" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>أضف بــاقتك / سكنك</Link>
                                        <Link to="/blogs" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>المدونة</Link>
                                    </div>

                                </div>
                                <div className="hagez_beltoot"></div>
                                <div className="links-group">
                                    <div className="title">
                                        <h3>عن ســي:</h3>
                                        <div className="dashh"></div>
                                    </div>
                                    <div className="links">
                                        <Link to="/#about" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>من نحــــن؟</Link>
                                        <Link to="/#whySee" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>لماذا سي؟</Link>
                                        <Link to="/#bigoffers" className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>اعــرف عن عــروض SEA +</Link>
                                    </div>
                                </div>
                                <div className="hagez_beltoot"></div>

                                <div className="links-group">
                                    <div className="title">
                                        <h3>تواصل معنا وخلك قريب:</h3>
                                        <div className="dashh"></div>
                                    </div>
                                    <div className="links">
                                        <Link to={`mailto:${data.email}`} className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>{data.email}</Link>
                                        <Link to={`tel:${data.whatsapp}`} className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>{data.whatsapp}</Link>
                                        <div className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>تــابعنا:</div>
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
                                <div className="hagez_beltoot"></div>
                                <div className="links-group">
                                    <div className="title" id='contactusinfos'>
                                        <h3>حمل التطبيق الآن:</h3>
                                        <div className="dashh"></div>
                                    </div>
                                    <div className="links">
                                        <div className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>Apple Pay | Google Play</div>
                                        <Link to="#"><LazyLoadImage src={google} alt="logo" loading='lazy' /></Link>
                                        <Link to="#"><LazyLoadImage src={apple} alt="logo" loading='lazy' /></Link>
                                    </div>



                                </div>

                            </div>
                        </div>
                        <div className="lowerfooter">
                            <div className="logo-cont">
                                <LazyLoadImage src={footerlogo} alt="logo" loading='lazy' />
                                <p>منصّتنا تسهّل عليك حجز أماكن الإقامة حول العالم بأسعار منافسة، صور حقيقية، وخدمة موثوقة.</p>
                            </div>
                            {/* payments */}
                            <div className='flex items-center gap-4 flex-wrap justify-center'>
                                <div className='footer-link'> <i className="fa-solid fa-chevron-left text-xs text-[#4D4D4D]"></i>طــرق دفــع آمنــة:</div>
                                <div className="bullet"></div><img src={payImg1} alt="pay-img" className='w-14' /><div className="bullet"></div>
                                <img src={payImg2} alt="pay-img" className='w-14' /><div className="bullet"></div>
                                <img src={payImg3} alt="pay-img" className='w-14' /><div className="bullet"></div>
                                <img src={payImg4} alt="pay-img" className='w-14' /><div className="bullet"></div>
                                <img src={payImg5} alt="pay-img" className='w-14' />
                            </div>
                        </div>
                        <div className="lowerfooter">
                            <Link to="/terms">الشروط والأحكام</Link>
                            <p >جميع الحقوق محفوظة لشركة ســـي - SEA</p>
                            <Link to="/privacy">سياسة الشركة</Link>
                        </div>
                    </div>
            }
        </motion.footer>
    )
}
export default Footer