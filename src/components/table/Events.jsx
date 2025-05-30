import React from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from '../../assets/related.png'
import { useRef } from "react";
const Events = ({title, description}) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <section className="places-section">
                <div className="container">
                    <div className="section-header-cont">
                        <h2 className="section-title">فعاليات الشهر الحالي.</h2>
                    </div>
                    <div className="places-type">
                        <span>التصفيــة والتركيــب</span>
                        <span>الثقافة والتاريخ</span>
                        <span>مطاعم وكافيهات</span>
                        <span>التسوق والمــاركات</span>
                        <span>الملهى والالعــاب</span>
                        <span>أماكن الطبيعية</span>
                        <span>أماكن مميزة</span>
                        <span>الجولات والتجــارب</span>
                        <span>جميــع الفئــات</span>
                    </div>
                    <div className="places-cont">
                        <div className="places-item">
                            <div className="places-content">
                                <span className="place-type">مقهــى</span>
                                <span className="places-name">إسطنبـــول</span>
                                <span className="places-info">ســوبر مــاركت مشهور </span>
                            </div>
                            <figure>
                                <img src={img1} alt="img" />
                                <span className="places-status">متـــاح</span>
                            </figure>
                        </div>
                        <div className="places-item">
                            <div className="places-content">
                                <span className="place-type">مقهــى</span>
                                <span className="places-name">إسطنبـــول</span>
                                <span className="places-info">ســوبر مــاركت مشهور </span>
                            </div>
                            <figure>
                                <img src={img1} alt="img" />
                                <span className="places-status">متـــاح</span>
                            </figure>
                        </div>
                        <div className="places-item">
                            <div className="places-content">
                                <span className="place-type">مقهــى</span>
                                <span className="places-name">إسطنبـــول</span>
                                <span className="places-info">ســوبر مــاركت مشهور </span>
                            </div>
                            <figure>
                                <img src={img1} alt="img" />
                                <span className="places-status">متـــاح</span>
                            </figure>
                        </div>
                        <div className="places-item">
                            <div className="places-content">
                                <span className="place-type">مقهــى</span>
                                <span className="places-name">إسطنبـــول</span>
                                <span className="places-info">ســوبر مــاركت مشهور </span>
                            </div>
                            <figure>
                                <img src={img1} alt="img" />
                                <span className="places-status">متـــاح</span>
                            </figure>
                        </div>
                        <div className="places-item">
                            <div className="places-content">
                                <span className="place-type">مقهــى</span>
                                <span className="places-name">إسطنبـــول</span>
                                <span className="places-info">ســوبر مــاركت مشهور </span>
                            </div>
                            <figure>
                                <img src={img1} alt="img" />
                                <span className="places-status">متـــاح</span>
                            </figure>
                        </div>
                        <div className="places-item">
                            <div className="places-content">
                                <span className="place-type">مقهــى</span>
                                <span className="places-name">إسطنبـــول</span>
                                <span className="places-info">ســوبر مــاركت مشهور </span>
                            </div>
                            <figure>
                                <img src={img1} alt="img" />
                                <span className="places-status">متـــاح</span>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Events
