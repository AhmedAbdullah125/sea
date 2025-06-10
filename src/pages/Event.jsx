import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import EventHeader from '../components/event/EventHeader'
import AboutPlace from '../components/event/AboutPlace'
const Event = () => {
    return (
        <section>
            <Header />
            {/* Start Page Content */}
            <EventHeader />
            <AboutPlace />
            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Event
