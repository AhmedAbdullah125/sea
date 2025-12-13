import React, { useState } from 'react'
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
import HotelsPagination from '../hotels/HotelsPagination';
const Activities = ({ selectedCountry, selectedCity, cityName, countryName, description }) => {
    const [page, setPage] = useState(1);
    const { data: events, isLoading } = useGetEvents(selectedCountry, selectedCity, page);
    return (
        <>
            {
                isLoading ? <Loading /> :
                    <section className="related-section">
                        <div className="container">
                            <div className="section-header-cont">
                                {/* <h2 className="section-title">{title}</h2> */}
                                <RotatingTitle />

                            </div>
                            <p className="related-text">{description}</p>
                        </div>
                        {
                            events.data?.length > 0 ?
                                <div className="container">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {
                                            events.data?.map((item, idx) =>
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
                                                                {item?.rating ? <button className='flex items-center gap-1 px-1 glassy'><p className='leading-[40px] translate-y-[2px] text-sm'> {item?.reviewsCount ? `(${item?.reviewsCount})` : null} {Number(item?.rating).toFixed()}</p><i className="fa-solid fa-star text-[#FFD700] leading-[40px]"></i></button> : null}
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
                                            )
                                        }
                                    </div>
                                </div>

                                :
                                <div className="container rounded-3xl bg-black/20 p-4 text-center">
                                    لا يوجد نشاطات حالية في {cityName ? cityName : (countryName || 'الموقع')}
                                </div>
                        }

                    </section>
            }
            <HotelsPagination data={events?.pagination} setPage={setPage} />
        </>
    )
}

export default Activities
