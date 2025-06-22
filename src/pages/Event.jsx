import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../lib/apiConfig';
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import EventHeader from '../components/event/EventHeader'
import AboutPlace from '../components/event/AboutPlace'
import EventRateForm from '../components/event/EventRateForm'
import HotelsTable from '../components/table/HotelsTable'
import { useSearchParams } from 'react-router-dom'
import ActivitiesTable from '../components/table/ActivitiesTable';
import Loading from '../components/loading/Loading';
const Event = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/event/${id}`, {});
                const response3 = await axios.get(`${API_BASE_URL}/events`, {});
                setEvents(response3.data.data);
                setData(response.data.data);

                setLoading(false);
            } catch (error) {
                console.error(
                    lang === 'ar' ? 'خطأ في استرجاع البيانات:' : 'Error retrieving data:',
                    error
                );
                setLoading(false);
                throw new Error(lang === 'ar' ? 'لا يمكن الحصول على البيانات' : 'Could not get data');
            }
        };
        getData();
    }, []);
    console.log(data);


    return (
        <section>
            <Header />
            {
                loading ?
                    <Loading />
                    : <>
                        {/* Start Page Content */}
                        <EventHeader data={data} />
                        <AboutPlace data={data} />
                        <EventRateForm data={data} />
                        <ActivitiesTable data={events} title="إكتشــف المزيــد." description={'يُقدم الموقع فعاليات الشهر الحالي ليستمتع المسافر بتجارب سياحية مميزة تشمل مهرجانات، جولات ثقافية، وعروض ترفيهية محلية حية.'} />
                        {/* End Page Content */}
                    </>

            }

            <Footer />
        </section>
    )
}

export default Event
