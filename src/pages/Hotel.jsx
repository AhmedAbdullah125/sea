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
import { motion } from "framer-motion";

const Hotel = () => {
    // state for search params
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        setLoading(true);
        //scroll to the top of page 
        window.scrollTo(0, 0);
        const getData = async () => {
            try {

                const response = await axios.get(`${API_BASE_URL}/hotel/${id}`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, [trigger]);
        return (
        <section>
            <Header />
            {/* Start Page Content */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <div>
                        <HotelHeader data={data} />
                        <HotelBook data={data} />
                        <div className="midd-section container">
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
