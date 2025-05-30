import React from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from '../../assets/related.png'
import { useRef } from "react";
const HotelsTable = ({title, description}) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <section className="related-section">
            <div className="container">
                <div className="section-header-cont">
                    <h2 className="section-title">{title}</h2>
                    <div className="swiper-btn-cont swiper-btn-1">
                        <div className="swiper-btn-prev swiper-btn" ref={prevRef}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                        <div className="swiper-btn-next swiper-btn" ref={nextRef}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                    </div>
                </div>
                <p className="related-text">{description}</p>
            </div>
            <div className="swiper-cont">
                <div className="related-slider">
                    <Swiper
                        pagination={false}
                        spaceBetween={20}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        slidesPerView={4.2}
                        autoplay={true}
                        loop={true}
                        modules={[Autoplay, Navigation, Pagination]}
                        breakpoints={{
                            1400: { slidesPerView: 4.2 },
                            1024: { slidesPerView: 3.2 },
                            768: { slidesPerView: 2.2 },
                            500: { slidesPerView: 1.2 },
                            100: { slidesPerView: 1.2 },
                        }}
                    >
                        {
                            Array.from({ length: 8 }).map((_, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="related-item-cont">
                                        <div className="related-item">
                                            <div className="swiper ">
                                                <Swiper
                                                    pagination={{ clickable: true }}
                                                    spaceBetween={0}
                                                    navigation={{
                                                        nextEl: `#swiper-btn-next${idx}a`,
                                                        prevEl: `#swiper-btn-prev${idx}a`,
                                                    }}
                                                    slidesPerView={1}
                                                    autoplay={true}
                                                    loop={true}
                                                    modules={[Autoplay, Navigation, Pagination]}
                                                    breakpoints={{
                                                        1400: {
                                                            slidesPerView: 1,
                                                        },

                                                    }}
                                                >

                                                    {
                                                        Array.from({ length: 3 }).map((_, index) => (
                                                            <SwiperSlide key={index}>
                                                                <figure>
                                                                    <img src={img1} alt="img" />
                                                                </figure>
                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                    <div className="swiper-btn-cont swiper-btn-2" id={`swiper-btn-prev${idx}a`}>
                                                        <div className="swiper-btn-prev swiper-btn">
                                                            <i className="fa-solid fa-chevron-right"></i>
                                                        </div>

                                                        <div className="swiper-btn-next swiper-btn" id={`swiper-btn-next${idx}a`}>
                                                            <i className="fa-solid fa-chevron-left"></i>
                                                        </div>
                                                    </div>
                                                </Swiper>
                                            </div>
                                            <div className="related-content">
                                                <div className="related-date">
                                                    <span>22 مايو 2025</span>
                                                    <span>16 ينــاير 2025</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="related-into">
                                            <div className="item-location">
                                                <i className="fa-solid fa-location-dot"></i>
                                                <span>
                                                    جدة
                                                    <span>( خيارات ترفيهية )</span>
                                                </span>
                                            </div>
                                            <div className="item-period">
                                                3 ليـــالي – رحلة نهـــاية الأسبــوع.
                                            </div>
                                            <div className="item-price">
                                                يبدأ من 1219 <span className="icon-saudi_riyal"></span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>

                </div>
                <button className="filter-btn">
                    تصفيــة وترتيــب<i className="fa-solid fa-arrow-down-arrow-up"></i>
                </button>
            </div>
        </section>
    )
}

export default HotelsTable
