import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import HotelsTable from '../components/table/HotelsTable';
import Events from '../components/table/Events';
import BreadCrumb from '../components/global/BreadCrumb';
import Things from '../components/table/Things';

const Table = () => {
    return (
        <section>
            <Header />
            <BreadCrumb data={[{ title: "الرئيــسية", href: "/" }, { title: "جدول عليـــنا", href: "#" }, { title: "إسطنبــول", href: "#" }]} />
            <HotelsTable title="أشهــر فنــــادق تركيـــــا." description={`قدم الموقع قائمة "توب عشرة" لأفضل الأنشطة والفعاليات السياحية لتسهيل اختيار المسافر لأجمل التجارب في وجهته.`} />
            <HotelsTable title="فعاليات الشهر الحالي." description={`يُقدم الموقع فعاليات الشهر الحالي ليستمتع المسافر بتجارب سياحية مميزة تشمل مهرجانات، جولات ثقافية، وعروض ترفيهية محلية حية.`} />
            <Events />
            <Things />
            <Footer />
        </section>
    )
}

export default Table
