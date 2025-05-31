import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from '../assets/related.png'
import HotelsTable from '../components/table/HotelsTable';
import Events from '../components/table/Events';

const Table = () => {
    return (
        <section>
            <Header />
            <section className="breadcrumb-sec">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="item-home">
                            <a className="bread-link bread-home" href="index.html">الرئيــسية </a>
                        </li>
                        <li>
                            <span className="bread-current"> جدول عليـــنا</span>
                        </li>
                        <li className="active">
                            <span className="bread-current"> إسطنبــول</span>
                        </li>
                    </ol>
                </div>
            </section>
            <HotelsTable title="أشهــر فنــــادق تركيـــــا." description={`قدم الموقع قائمة "توب عشرة" لأفضل الأنشطة والفعاليات السياحية لتسهيل اختيار المسافر لأجمل التجارب في وجهته.`} />
            <HotelsTable title="فعاليات الشهر الحالي." description={`يُقدم الموقع فعاليات الشهر الحالي ليستمتع المسافر بتجارب سياحية مميزة تشمل مهرجانات، جولات ثقافية، وعروض ترفيهية محلية حية.`} />
            <Events />
            <section className="trip-things-section">
                <div className="container">
                    <div className="section-header-cont">
                        <h2 className="section-title">حــاجات قد تهمك في إسطنبــول.</h2>
                    </div>

                </div>
            </section>
            <Footer />
        </section>
    )
}

export default Table
