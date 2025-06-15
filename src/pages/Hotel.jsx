import React , { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useSearchParams } from 'react-router-dom';
import HotelHeader from '../components/hotel/HotelHeader';
import { API_BASE_URL } from '../lib/apiConfig';
import HotelBook from '../components/hotel/HotelBook';
const Hotel = () => {
    // state for search params
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/hotel/${id}`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error( 'Error retrieving data:',error);
                setLoading(false);
                throw new Error( 'Could not get data');
            }
        };
        getData();
    }, []);
    console.log(data);
    return (
        <section>
            <Header />
            {/* Start Page Content */}
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <HotelHeader data={data} />
                        <HotelBook data={data} />
                    </div>
                )
            }

            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Hotel
