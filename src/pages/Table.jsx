import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import HotelsTable from '../components/table/HotelsTable';
import Events from '../components/table/Events';
import BreadCrumb from '../components/global/BreadCrumb';
import Things from '../components/table/Things';
import { API_BASE_URL } from '../lib/apiConfig';
import axios from 'axios';



const Table = () => {
  const [data, setData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hotels`, {

        });
        setHotels(response.data.data);
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
  console.log(hotels);

  return (
    <section>
      <Header />
      <BreadCrumb data={[{ title: "الرئيــسية", href: "/" }, { title: "جدول عليـــنا", href: "#" }, { title: "إسطنبــول", href: "#" }]} />
      <HotelsTable data={[]} title="فعاليات الشهر الحالي." description={`يُقدم الموقع فعاليات الشهر الحالي ليستمتع المسافر بتجارب سياحية مميزة تشمل مهرجانات، جولات ثقافية، وعروض ترفيهية محلية حية.`} />
      <HotelsTable data={hotels} title="أشهــر فنــــادق تركيـــــا." description={`قدم الموقع قائمة "توب عشرة" لأفضل الأنشطة والفعاليات السياحية لتسهيل اختيار المسافر لأجمل التجارب في وجهته.`} />
      <Events />
      <Things />
      <Footer />
    </section>
  )
}

export default Table
