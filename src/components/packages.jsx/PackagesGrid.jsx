import React, { useState, useEffect } from 'react'
import plane from '../../../public/app/plane-icon.svg'
import { toast } from 'sonner';
import { toggleFavourates } from '../../pages/toggleFavourates';
import { motion } from "framer-motion";
import { useGetSettings } from '../global/useGetSettings';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PackagesGrid = ({ mainData }) => {
    const { data, isLoading, isError } = useGetSettings();
    console.log(mainData);

    const [lovedPlans, setLovedPlans] = useState(localStorage.getItem('lovedPlans') ? JSON.parse(localStorage.getItem('lovedPlans')) : [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lovedPlans')) {
                setLovedPlans(localStorage.getItem('lovedPlans') ? JSON.parse(localStorage.getItem('lovedPlans')) : []);
            }
            else {
                localStorage.setItem('lovedPlans', []);
            }
        }
    }, [data])

    function formatArabicDate(dateStr) {
        const date = new Date(dateStr);
        const formatter = new Intl.DateTimeFormat('ar-EG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formatter.format(date);
    }

    return (
        <section className="content-section">
            {
                mainData.length > 0 ?

                    <div className="grid-cont">

                        {

                            mainData.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }} className="trip-item" key={index}>
                                    <a href={`package/${item.slug}`} className="card-content" style={{ padding: "0px" }}>
                                        <div className="trip-img">
                                            <Swiper
                                        pagination={{ clickable: true }}
                                        spaceBetween={0}
                                        navigation={{ nextEl: `#swiper-btn-next1a`, prevEl: `#swiper-btn-prev1a`, }}
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
                                            item.images.map((img, index) => (
                                                <SwiperSlide key={index}>
                                                    <figure>
                                                        <img src={img} alt="img" />
                                                    </figure>
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
                                            {/* <figure>
                                                <img src={item.thumbnail} alt="img" />
                                            </figure> */}
                                            <button className="fav-btn" onClick={
                                                () => {
                                                    if (sessionStorage.getItem('token')) {
                                                        if (lovedPlans.includes(item.id)) {
                                                            setLovedPlans(lovedPlans.filter(id => id !== item.id))
                                                            localStorage.setItem('lovedPlans', JSON.stringify(lovedPlans.filter(id => id !== item.id)))
                                                        }
                                                        else {
                                                            setLovedPlans([...lovedPlans, item.id])
                                                            localStorage.setItem('lovedPlans', JSON.stringify([...lovedPlans, item.id]))
                                                        }
                                                        toggleFavourates(item.id, 'Plan');
                                                    }
                                                    else {
                                                        toast.error('يجب تسجيل الدخول اولا')
                                                        window.location.href = '/login'
                                                    }
                                                }
                                            }
                                            >
                                                <i className={` fa-heart ${lovedPlans.includes(item.id) ? 'fa-solid text-[#a71755]' : 'fa-regular'}`}></i>
                                            </button>
                                        </div>

                                        <div className="detail-flex">
                                            <div className="detail-period">جولة لمدة {item.durationDays} أيــــام</div>
                                            <div className="detail-info-item rate">
                                                <i className="fa-solid fa-star"></i>
                                                <span>{Number(item.rating).toFixed(1)} <span>( {item.reviewsCount} )</span></span>
                                            </div>
                                        </div>
                                        <div className="card-item-name">{item.title}</div>
                                        <div className="card-place">سارية في {formatArabicDate(item.arrivalTime)}</div>
                                        <div className="item-price">
                                            {item.cost} {item.currencyName}  <span className="period"><span> / </span> {item.numberOfPerson > 1 ? `${item.numberOfPerson} شخص` : " للشخص الواحد "}</span>
                                        </div>
                                        <div className="item-btn">
                                            <a href={`https://wa.me/${data?.whatsapp}?text= مناقشتكم لإضافه لحجز الباقة ${item.title} `} className="book-ancor">احجـــز رحلتك الآن</a>
                                            <a href={`https://wa.me/${data?.whatsapp}?text= مناقشتكم لإضافه لحجز الباقة ${item.title} `} className="book-flight"><img src={plane} alt="icon" /></a>
                                        </div>
                                    </a>
                                </motion.div>
                            ))
                        }
                    </div>
                    :
                    <p className="text-center text-[#797979] font-semibold text-lg mt-10 bg-body p-10 rounded-xl">لا يوجد باقات</p>
            }
        </section>
    )
}

export default PackagesGrid
