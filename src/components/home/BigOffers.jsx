
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../lib/apiConfig';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from 'framer-motion'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const BigOffers = ({ mainData }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return ` ${day}  /  ${month}  /  ${year}`;
    }
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/offers`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, [])

    console.log(data);
    return (
        <section className="big-offers-section">
            <div className="container">
                <h2>عــروض رهيـبة ومميــزات كثيــرة</h2>
                <p>سواء كنت تحلم بالسفر إلى أوروبا، آسيا، إفريقيا، أستراليا أو أمريكا، نوفر لك خيارات إقامة متنوعة بأسعار تناسب ميزانيتك.</p>
                <Swiper
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    // navigation={{ nextEl: `#swiper-btn-next1a`, prevEl: `#swiper-btn-prev1a`, }}
                    slidesPerView={4}
                    autoplay={true}
                    loop={true}
                    modules={[Autoplay, Navigation, Pagination]}
                    breakpoints={{
                        1400: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        320: {
                            slidesPerView: 1,
                        },
                        100: {
                            slidesPerView: 1,
                        }

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
                                    className="offer">
                                    <figure className="offer-img">
                                        <img src={item.image} alt="img" />
                                    </figure>
                                    <div className="offer-info">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <span className='valid-date'>العــرض ســاري الــى : {formatDate(item.expire_date)} </span>
                                        <div className="place">
                                            <span>{item.city_name}, {item.country_name}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </section>
    )
}

export default BigOffers
