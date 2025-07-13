import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import HotelsTable from '../components/table/HotelsTable';
import Events from '../components/table/Events';
import BreadCrumb from '../components/global/BreadCrumb';
import Things from '../components/table/Things';
import { API_BASE_URL } from '../lib/apiConfig';
import axios from 'axios';
import ActivitiesTable from '../components/table/ActivitiesTable';
import Loading from '../components/loading/Loading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


const Table = () => {
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hotels`, {});
        const response2 = await axios.get(`${API_BASE_URL}/activities`, {});
        const response3 = await axios.get(`${API_BASE_URL}/events`, {});
        setHotels(response.data.data);
        setActivities(response2.data.data);
        setEvents(response3.data.data);
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

  return (
    <section>
      <Header />
      {
        loading ?
          <Loading />
          :
          <>
          <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="filter-btn">
                            تصفيــة وترتيــب<i className="fa-solid fa-arrow-down-arrow-up"></i>
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            <BreadCrumb data={[{ title: "الرئيــسية", href: "/" }, { title: "جدول عليـــنا", href: "#" }, { title: "إسطنبــول", href: "#" }]} />
            <ActivitiesTable data={events} title="فعاليات الشهر الحالي." description={`يُقدم الموقع فعاليات الشهر الحالي ليستمتع المسافر بتجارب سياحية مميزة تشمل مهرجانات، جولات ثقافية، وعروض ترفيهية محلية حية.`} />
            <HotelsTable data={hotels} title="أشهــر فنــــادق تركيـــــا." description={`قدم الموقع قائمة "توب عشرة" لأفضل الأنشطة والفعاليات السياحية لتسهيل اختيار المسافر لأجمل التجارب في وجهته.`} />
            <Events data={activities} />
            <Things />
          </>
      }
      <Footer />
    </section>
  )
}

export default Table
