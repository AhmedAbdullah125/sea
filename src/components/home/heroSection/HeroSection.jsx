import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../lib/apiConfig";
import axios from "axios";
import MainHeader from "../../header/MainHeader";
import FilterTabs from "../filterTabs/FilterTabs";
import styles from "./heroSection.module.css";
import Loading from "../../loading/Loading";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { motion } from "framer-motion";
const counters = [
  {
    number: "10k",
    title: "حجـــــز مكتمل",
  },
  {
    number: "47k",
    title: "عميــل سعيد!",
  },
];

const HeroSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/settings`, {});
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setLoading(false);
        throw new Error('Could not get data');
      }
    };
    getData();
  }, []);
  console.log(data)
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="min-h-[100vh] bg-[url('/home/hero.png')] bg-cover bg-center bg-no-repeat space-y-6 pb-6 flex flex-col justify-end">
      <MainHeader />
      {
        loading ? <Loading /> :
          <motion.div
            initial={{ opacity: 0 ,y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="  flex items-end justify-center ">
            <div className="container text-white space-y-6 ">
              {/* content */}
              <div className="w-full flex flex-col xl:flex-row justify-between items-end ">
                {/* title */}
                <div className=" xl:max-w-[45rem] me-auto  space-y-4">
                  <h1 className={`${styles.title} text-4xl md:text-5xl xl:text-6xl font-semibold`} >
                    رحلتك تبدأ من هنـــــا...
                    إحجــز بثقة.
                  </h1>
                  <p className="text-sm font-light xl:max-w-[70%] ">
                    منصة إلكترونية أوفلاين معتمدة للحجوزات الفندقية و الباقات السياحية
                    حول العالم والتواصل المباشر مع العملاء .
                  </p>
                </div>
                {/* counters */}
                <div className="hidden xl:flex flex-col  justify-center items-center gap-10 ">
                  <div >
                    <h2 className="text-5xl font-bold text-white">
                      <NumberTicker value={data?.compleated_bookings} className="text-5xl font-bold text-white" /> +</h2>
                    <p >حجـــــز مكتمل</p>
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold "><NumberTicker value={data?.happy_customers} className="text-5xl font-bold text-white" /> + </h2>
                    <p >عميــل سعيد!</p>
                  </div>
                </div>
              </div>
              {/* filter  */}
              <FilterTabs data={data} />

            </div>
          </motion.div>
      }

    </motion.section>
  )
}

export default HeroSection
