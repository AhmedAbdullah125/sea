import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useParams } from 'react-router-dom';
import HotelHeader from '../components/hotel/HotelHeader';
import { API_BASE_URL } from '../lib/apiConfig';
import HotelBook from '../components/hotel/HotelBook';
import HotelTabs from '../components/hotel/HotelTabs';
import HotelPayment from '../components/hotel/HotelPayment';
import Loading from '../components/loading/Loading';
import HotelRooms from '../components/hotel/HotelRooms';
import { useGetHotel } from './useGetHotel';
const Hotel = () => {
    // state for search params
    const { id } = useParams();
    const [trigger, setTrigger] = useState(false);
    const { data,isLoading } = useGetHotel(id);

        return (
        <section>
            <Header />
            {/* Start Page Content */}
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <HotelHeader data={data} />
                        <HotelBook data={data} />
                        <HotelRooms data={data} />
                        <div className="midd-section container mb-6">
                            <div className="tabs">
                                <HotelTabs data={data} trigger={trigger} setTrigger={setTrigger} />
                            </div>
                            <div className="payment">
                                <HotelPayment data={data} />
                            </div>
                        </div>

                    </div>
                )
            }
            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Hotel
