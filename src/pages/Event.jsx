import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import EventHeader from '../components/event/EventHeader'
import AboutPlace from '../components/event/AboutPlace'
import EventRateForm from '../components/event/EventRateForm'
import HotelsTable from '../components/table/HotelsTable'
const Event = () => {
    return (
        <section>
            <Header />
            {/* Start Page Content */}
            <EventHeader />
            <AboutPlace />
            <EventRateForm />
            <HotelsTable title="إكتشــف المزيــد." description={`يُقدم الموقع فعاليات الشهر الحالي ليستمتع المسافر بتجارب سياحية مميزة تشمل مهرجانات، جولات ثقافية، وعروض ترفيهية محلية حية.`} />
            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Event
