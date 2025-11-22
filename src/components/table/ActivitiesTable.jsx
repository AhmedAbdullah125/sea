import React from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRef } from "react";
import { Link } from 'react-router-dom';
import { toggleFavourates } from '../../pages/toggleFavourates';
import { toast } from 'sonner';
import RotatingTitle from './RotatingTitle';
import { useGetEvents } from '../global/useGetEvents';
import Loading from '../loading/Loading';
const ActivitiesTable = ({ selectedCountry, selectedCity, cityName, countryName, description, data }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { data: events, isLoading } = useGetEvents(selectedCountry, selectedCity);
    console.log(events);


    return (
        <>
            {
                isLoading ? <Loading /> :
                    <section className="related-section">
                        <div className="container">
                            <div className="section-header-cont">
                                {/* <h2 className="section-title">{title}</h2> */}
                                <RotatingTitle />
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
                        {
                            events?.length > 0 ?
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
                                            autoplay={false}
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
                                                events?.map((item, idx) => (

                                                    <SwiperSlide key={idx}>
                                                        <Link to={`/event?id=${item.id}`} className="related-item-cont" key={idx}>
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
                                                                        autoplay={false}
                                                                        loop={true}
                                                                        modules={[Autoplay, Navigation, Pagination]}
                                                                        breakpoints={{
                                                                            1400: {
                                                                                slidesPerView: 1,
                                                                            },

                                                                        }}
                                                                    >

                                                                        {
                                                                            item?.images?.map((img, index) => (
                                                                                <SwiperSlide key={index}>
                                                                                    <figure>
                                                                                        <img src={img} alt="img" />
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
                                                                <div className="related-content flex justify-between">
                                                                    {/* <div className="related-date">
                                                    <span>{item.startDate}</span>
                                                    <span>{item.endDate}</span>
                                                </div> */}
                                                                    <div className="related-btn">{
                                                                        item.discount ? <span>{Number(item.discount)}%</span> : null
                                                                    }

                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault();      // don't trigger <a> default
                                                                                e.stopPropagation();     // don't bubble to <Link>
                                                                                if (sessionStorage.getItem('token')) {
                                                                                    toggleFavourates(item?.id, 'Event');
                                                                                }
                                                                                else {
                                                                                    toast.error('يجب تسجيل الدخول اولا')
                                                                                    window.location.href = '/login'
                                                                                }
                                                                            }}
                                                                            onMouseDown={(e) => e.stopPropagation()}   // extra guard for some browsers
                                                                            onTouchStart={(e) => e.stopPropagation()}  // mobile guard
                                                                        >
                                                                            <i className={`${item.is_favourite ? 'fa-solid' : 'fa-regular'} fa-heart`}></i></button>
                                                                        {item?.rating ? <button className='flex items-center gap-1 px-1'><p className='leading-[40px] translate-y-[2px] text-sm'> {item?.reviewsCount ? `(${item?.reviewsCount})` : null} {Number(item?.rating).toFixed()}</p><i className="fa-solid fa-star text-[#FFD700] leading-[40px]"></i></button> : null}
                                                                    </div>

                                                                </div>

                                                            </div>
                                                            <div className="related-into flex justify-between">
                                                                <div className="item-location flex items-center w-full">
                                                                    {
                                                                        item?.city?.name ?
                                                                            <i className="fa-solid fa-location-dot"></i> :
                                                                            null
                                                                    }
                                                                    <div className='flex w-full gap-2'>
                                                                        {item?.city?.name ?
                                                                            ` ${item?.city?.name} - ${item?.country?.name}` :
                                                                            null
                                                                        }
                                                                        {
                                                                            item.type &&
                                                                            <span>( {item.type} )</span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="item-period">
                                                                    {item.nameEvents}
                                                                </div>
                                                                <div className="item-price">
                                                                    {item.description}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </SwiperSlide>
                                                ))

                                            }

                                        </Swiper>

                                    </div>

                                </div>
                                :
                                <div className="container rounded-3xl bg-black/20 p-4 text-center">
                                    لا يوجد نشاطات حالية في {cityName}
                                </div>
                        }
                    </section>
            }
        </>
    )
}

export default ActivitiesTable
