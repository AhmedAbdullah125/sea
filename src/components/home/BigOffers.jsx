import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../lib/apiConfig';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from 'framer-motion'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

const BigOffers = ({ mainData }) => {
    const [data, setData] = useState([])
    const [Settings, setSettings] = useState([])
    const [loading, setLoading] = useState(true);
    const [fullParagraph, setFullParagraph] = useState([]);
    const swiperRef = useRef(null); // <-- Add ref to control Swiper autoplay

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return ` ${day}  /  ${month}  /  ${year}`;
    }

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/offers`);
                const responseSettings = await axios.get(`${API_BASE_URL}/settings`);
                setData(response.data.data);
                setSettings(responseSettings.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <section className="big-offers-section">
            <div className="container">
                <h2>عــروض رهيـبة ومميــزات كثيــرة</h2>
                <p>سواء كنت تحلم بالسفر إلى أوروبا، آسيا، إفريقيا، أستراليا أو أمريكا، نوفر لك خيارات إقامة متنوعة بأسعار تناسب ميزانيتك.</p>
                {
                    loading ? <Loading /> :
                        <div
                            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                            onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                        >
                            <Swiper
                                onSwiper={(swiper) => swiperRef.current = swiper} // <-- capture Swiper instance
                                pagination={false}
                                spaceBetween={20}
                                slidesPerView={4}
                                navigation={{ nextEl: `#swiper-btn-next1a`, prevEl: `#swiper-btn-prev1a`, }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                loop={true}
                                modules={[Autoplay, Navigation, Pagination]}
                                breakpoints={{
                                    1400: { slidesPerView: 4 },
                                    1024: { slidesPerView: 3 },
                                    768: { slidesPerView: 2 },
                                    640: { slidesPerView: 1 },
                                    320: { slidesPerView: 1 },
                                    100: { slidesPerView: 1 },
                                }}
                            >
                                {
                                    data.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div
                                                initial={{ opacity: 0, y: -30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5 }}
                                                className="offer"
                                            >
                                                <Link to={`https://wa.me/${Settings?.whatsapp}?text=اريد الاطلاع علي العرض ${item.title}`} className="offer-img">
                                                    <img src={item.image} alt="img" />
                                                </Link>
                                                <Link to={`https://wa.me/${Settings?.whatsapp}?text=اريد الاطلاع علي العرض ${item.title}`} className="offer-info">
                                                    <h3>{item.title}</h3>
                                                    <p style={
                                                        fullParagraph.includes(index)
                                                            ? { fontSize: '14px', WebkitLineClamp: 'unset', lineHeight: "unset", color: "#6F6F6F" }
                                                            : { fontSize: '22px', WebkitLineClamp: '2' }
                                                    }>
                                                        {item.description}
                                                    </p>
                                                    <span className='valid-date'>العــرض ســاري الــى : {formatDate(item.expire_date)} </span>
                                                    <div className="place mb-2">
                                                        <span>{item.city_name}, {item.country_name}</span>
                                                    </div>
                                                </Link>
                                                <button onClick={() => {
                                                    setFullParagraph(prev =>
                                                        prev.includes(index)
                                                            ? prev.filter(i => i !== index)
                                                            : [...prev, index]
                                                    )
                                                }}>
                                                    {fullParagraph.includes(index) ? 'أظهر اقل' : 'قراءة المزيد'}
                                                </button>
                                            </motion.div>
                                        </SwiperSlide>
                                    ))
                                }
                                <div className="swiper-btn-cont swiper-btn-2" id={`swiper-btn-prev1a`}>
                                    <div className="swiper-btn-prev swiper-btn">
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </div>

                                    <div className="swiper-btn-next swiper-btn" id={`swiper-btn-next1a`}>
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </div>
                                </div>
                            </Swiper>
                        </div>
                }
            </div>
        </section>
    )
}

export default BigOffers;
