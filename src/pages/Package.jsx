import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import payImg1 from '../assets/pay-img/01.svg'
import payImg2 from '../assets/pay-img/02.svg'
import payImg3 from '../assets/pay-img/03.svg'
import payImg4 from '../assets/pay-img/04.svg'
import payImg5 from '../assets/pay-img/05.svg'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import playImg from '../assets/play.png'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../lib/apiConfig'
import PlanHeader from '../components/plan/PlanHeader'
import Loading from '../components/loading/Loading'
import PlanPrices from '../components/plan/PlanPrices'

const Hotels = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('slug');
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

    return (
        <section>
            <Header />
            {
                loading ? <Loading /> :
                    <>
                        <PlanHeader data={data} />
                        <PlanPrices data={data} />

                        <section className="package-section">
                            <div className="container">
                                <h6 className="package-head">الدفع !.</h6>
                                <h3 className="package-title">نوفـــر لك أفضــل وســـائل الدفع</h3>
                                <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                            </div>
                            <div className="pay-cont">
                                <div className="pay-item">
                                    <img src={payImg1} alt="pay-img" />
                                </div>
                                <div className="pay-item">
                                    <img src={payImg2} alt="pay-img" />
                                </div>
                                <div className="pay-item">
                                    <img src={payImg3} alt="pay-img" />
                                </div>
                                <div className="pay-item">
                                    <img src={payImg4} alt="pay-img" />
                                </div>
                                <div className="pay-item">
                                    <img src={payImg5} alt="pay-img" />
                                </div>
                            </div>
                        </section>

                        <section className="package-section">
                            <div className="container">
                                <h6 className="package-head">تفـــاصيل البـاقة !.</h6>
                                <h3 className="package-title">وش نــوفر لك في الرحلــــة</h3>
                                <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                    defaultValue="item-1"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <div className="acc-triger">
                                                <img src={playImg} alt="img-icon" />
                                                <div className="o-side">
                                                    <h2>رحلـــــة الى ملعب مدريد العـــــالمي</h2>
                                                    <span>اليـــــوم الاول</span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            <p>
                                                Our flagship product combines cutting-edge technology with sleek
                                                design. Built with premium materials, it offers unparalleled
                                                performance and reliability.
                                            </p>
                                            <p>
                                                Key features include advanced processing capabilities, and an
                                                intuitive user interface designed for both beginners and experts.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>
                                            <div className="acc-triger">
                                                <img src={playImg} alt="img-icon" />
                                                <div className="o-side">
                                                    <h2>رحلـــــة الى ملعب مدريد العـــــالمي</h2>
                                                    <span>اليـــــوم الاول</span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            <p>
                                                We offer worldwide shipping through trusted courier partners.
                                                Standard delivery takes 3-5 business days, while express shipping
                                                ensures delivery within 1-2 business days.
                                            </p>
                                            <p>
                                                All orders are carefully packaged and fully insured. Track your
                                                shipment in real-time through our dedicated tracking portal.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>
                                            <div className="acc-triger">
                                                <img src={playImg} alt="img-icon" />
                                                <div className="o-side">
                                                    <h2>رحلـــــة الى ملعب مدريد العـــــالمي</h2>
                                                    <span>اليـــــوم الاول</span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            <p>
                                                We stand behind our products with a comprehensive 30-day return
                                                policy. If you&apos;re not completely satisfied, simply return the
                                                item in its original condition.
                                            </p>
                                            <p>
                                                Our hassle-free return process includes free return shipping and
                                                full refunds processed within 48 hours of receiving the returned
                                                item.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </section>

                        <section className="package-section">
                            <div className="container">
                                <h6 className="package-head">ماذا يوجد في الباقة !.</h6>
                                <h3 className="package-title">تشمل البــــــاقة</h3>
                                <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                                <div className="package-list">
                                    <ul>
                                        <li>
                                            <i className="fa-solid fa-house"></i
                                            ><span>الإقامة فندقية 7 ليالي.</span>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-mug-hot"></i><span>شامل الإفطار.</span>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-eye"></i><span>زيارة متحف اللوفر.</span>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-cart-shopping"></i
                                            ><span> رحلة إلى السوق التقليدي.</span>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-pot-food"></i><span>وجبة العشاء.</span>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-hand-wave"></i
                                            ><span>الاستقبال والتوديع بالمطار.</span>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-city"></i
                                            ><span>جولة سياحية في المدينة.</span>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-heart"></i><span>تأمين صحي للسفر.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </>
            }

            <Footer />
        </section>
    )
}

export default Hotels
