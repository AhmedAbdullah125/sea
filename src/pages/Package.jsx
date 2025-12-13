import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../lib/apiConfig'
import PlanHeader from '../components/plan/PlanHeader'
import Loading from '../components/loading/Loading'
import PlanPrices from '../components/plan/PlanPrices'
import PlanMarq from '../components/plan/PlanMarq'
import PlanComments from '../components/plan/PlanComments'
import PlanRateForm from '../components/plan/PlanRateForm'
import { useGetSettings } from '../components/global/useGetSettings'
import PlanList from '../components/plan/PlanList'
import PackageHotels from '../components/plan/PackageHotels'
const Package = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        //scroll to the top of page 
        window.scrollTo(0, 0);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/plan/${id}`, {});
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
    const { data: settings, isLoading, isError } = useGetSettings();

    return (
        <section>
            <Header />
            {
                loading || isLoading ? <Loading /> :
                    <>
                        <PlanHeader data={data} />
                        <PlanPrices data={data} settings={settings} />
                        <PlanList data={data} />
                        {
                            data?.hotels?.length > 0 &&
                            <PackageHotels data={data} />
                        }
                        <PlanMarq data={data} />
                        {/* <PlanFaqs data={data} /> */}
                        {/* <section className="package-section">
                            <div className="container">
                                <motion.div
                                    initial={{ opacity: 0, y: -50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                >
                                <h6 className="package-head">ماذا يوجد في الباقة !</h6>
                                <h3 className="package-title">تشمل البــــــاقة</h3>
                                <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                                </motion.div>
                                <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1 }}
                                
                                    className="package-list">
                                    <ul
                                    >

                                        {
                                            data.planComponents.map((component, index) => (
                                                <li className='bg-white p-4 rounded-xl flex flex-col '>
                                                    <LazyLoadImage src={component.icon} alt="package-img" className='package-icon !size-12' /><span>{component.name}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </motion.div>
                            </div>
                        </section> */}
                        <PlanComments data={data} />
                        <div className="container">
                            <PlanRateForm id={data.id} />
                        </div>
                    </>
            }

            <Footer />
        </section>
    )
}

export default Package
