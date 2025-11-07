import React, { useState, useEffect } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import HotelsTable from '../components/table/HotelsTable';
import Events from '../components/table/Events';
import BreadCrumb from '../components/global/BreadCrumb';
import Things from '../components/table/Things';
import { API_BASE_URL } from '../lib/apiConfig';
import axios from 'axios';
import ActivitiesTable from '../components/table/ActivitiesTable';
import Loading from '../components/loading/Loading';

const Table = () => {
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hotels`);
        const response2 = await axios.get(`${API_BASE_URL}/activities`);
        const response3 = await axios.get(`${API_BASE_URL}/events`);
        setHotels(response.data.data);
        setActivities(response2.data.data);
        setEvents(response3.data.data);
        setLoading(false);
      } catch (error) {
        console.error('خطأ في استرجاع البيانات:', error);
        setLoading(false);
        throw new Error('لا يمكن الحصول على البيانات');
      }
    };
    getData();
  }, []);
  console.log(events);

  return (
    <section>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <BreadCrumb data={[   { title: "الرئيــسية", href: "/" },   { title: "جدول عليـــنا", href: "#" },   { title: "إسطنبــول", href: "#" }, ]}/>
          <ActivitiesTable data={events} title="فعاليات الشهر الحالي." description="يُقدم الموقع فعاليات الشهر الحالي ليستمتع المسافر بتجارب سياحية مميزة تشمل مهرجانات، جولات ثقافية، وعروض ترفيهية محلية حية."/>
          <Events data={activities} />
          <HotelsTable data={hotels} title={`أشهــر فنــــادق ${localStorage.getItem('userCountry') || 'تركيـــــا'}.`} description="قدم الموقع قائمة 'توب عشرة' لأفضل الأنشطة والفعاليات السياحية لتسهيل اختيار المسافر لأجمل التجارب في وجهته."/>
          <Things />
        </>
      )}
      <Footer />
    </section>
  );
};

export default Table;
