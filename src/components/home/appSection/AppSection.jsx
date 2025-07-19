import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaGooglePlay } from "react-icons/fa";
import { GrApple } from "react-icons/gr";
import { motion } from 'framer-motion'
import { API_BASE_URL } from '../../../lib/apiConfig';
import Loading from '../../loading/Loading';

const AppSection = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/about-us`, {});
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
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='my-16  container'>
      {
        loading ? <Loading /> :
          <div className={`overflow-hidden bg-center bg-cover bg-no-repeat rounded-[105px] bg-main-blue/45`}
          style={{ backgroundImage: `url(${data?.imageApp})` }}
          >
            <div className=" flex items-center justify-between bg-main-blue/45">

              {/* content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='xl:w-1/2 w-full container !text-white xl:py-20 py-16'>
                <div className='xl:space-y-6 space-y-4 text-center xl:text-start'>
                  <p className='text-xs  font-bold'>التطبيق</p>
                  <h3 className='xl:text-5xl text-3xl font-bold '>تطبيق ســـي / SEA</h3>
                  <svg className='ms-auto max-xl:hidden' width="250" height="29" viewBox="0 0 383 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.99991 23.7725C52.5375 10.5523 193.772 -8.87522 378.409 19.1765" stroke="white" strokeWidth="9" stroke-linecap="round" />
                  </svg>

                  <p className='text-sm xl:text-nowrap font-bold'>استكشـــــــف، احجــــــــــز، واستمتــــــــــــــــــع... مــــــــــــــن جوالك!</p>
                </div>
                <div className="space-y-6 xl:mt-12 mt-6" >
                  <p className='text-xs  font-bold text-center xl:text-start'>عزيـــزنا العميل حمل التطبيـــق من هنا</p>
                  <div className="flex items-center max-xl:justify-center gap-3">
                    <a href="#" className='w-fit flex items-center gap-2  px-8 py-2 rounded-full bg-[#4c7083] hover:bg-main-navy transation-all duration-300'>
                      <div className="text-end">
                        <p className="text-[.5rem]">download on The</p>
                        <p className="text-xs font-semibold">Apple Store</p>
                      </div>
                      <GrApple size={20} />
                    </a>
                    <a href="#" className='w-fit flex items-center gap-2  px-8 py-2 rounded-full bg-[#4c7083] hover:bg-main-navy transation-all duration-300'>
                      <div className="text-end">
                        <p className="text-[.5rem]">download on The</p>
                        <p className="text-xs font-semibold">google play</p>
                      </div>
                      <FaGooglePlay size={20} />
                    </a>
                  </div>


                </div>
              </motion.div>
              {/* iphone */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='xl:w-1/2 w-0 self-end'>
                <img src="/app/iphone.png" alt="iphone" loading='lazy' className='w-full h-full object-contain' />
              </motion.div>
            </div>

          </div>
      }
    </motion.section>
  )
}

export default AppSection
