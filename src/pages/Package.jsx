import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import payImg1 from '../assets/pay-img/01.svg'
import payImg2 from '../assets/pay-img/02.svg'
import payImg3 from '../assets/pay-img/03.svg'
import payImg4 from '../assets/pay-img/04.svg'
import payImg5 from '../assets/pay-img/05.svg'
import detailImg from '../assets/detail.jpg'
import imgIcon1 from '../assets/imgIcon-1.svg'
import imgIcon2 from '../assets/imgIcon-2.svg'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import playImg from '../assets/play.png'

const Hotels = () => {

    return (
        <section>
            <Header />
            <section className="content-section">
                <div className="container">
                    <h2 className="detail-title">بـــاقة مدريــــــد - برشلـــونة</h2>
                    <div className="detail-time">03 أيـــــــــام</div>
                    <div className="detail-info-cont">
                        <div className="detail-info">
                            <div className="detail-info-item rate">
                                <i className="fa-solid fa-star"></i>
                                <span>5.0 <span>( 500+ )</span></span>
                            </div>
                            <div className="detail-info-item">
                                <i className="fa-solid fa-bullseye"></i>
                                <span>رحلة لمـــــدة 03 ليــــــــالي</span>
                            </div>
                        </div>
                        <div className="detail-info-btn">
                            <button className="add-btn">
                                <i className="fa-solid fa-share-nodes"></i>
                            </button>
                            <button className="add-btn"><i className="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                    <div className="detail-cont">
                        <div className="detail-box">
                            <figure className="detail-img">
                                <img src={detailImg} className="img-fluid" alt="detail-img" />
                            </figure>
                            <div className="detail-img-btn">
                                <button className="add-btn">
                                    <img src={imgIcon1} alt="icon" />
                                </button>
                                <button className="add-btn">
                                    <img src={imgIcon2} alt="icon" />
                                </button>
                            </div>
                        </div>
                        <div className="detail-box">
                            <figure className="detail-img">
                                <img src={detailImg} className="img-fluid" alt="detail-img" />
                            </figure>
                        </div>
                        <div className="detail-box">
                            <figure className="detail-img">
                                <img src={detailImg} className="img-fluid" alt="detail-img" />
                            </figure>
                        </div>
                        <div className="detail-box">
                            <figure className="detail-img">
                                <img src={detailImg} className="img-fluid" alt="detail-img" />
                            </figure>
                        </div>
                        <div className="detail-box">
                            <figure className="detail-img">
                                <img src={detailImg} className="img-fluid" alt="detail-img" />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">البـــاقة !.</h6>
                    <h3 className="package-title">أسعــــــار البــاقة</h3>
                    <p className="package-text">قد تكون هذه البـــاقة ممتعةً لك !</p>
                    <div className="package-cont">
                        <div className="package-item">
                            <i className="fa-solid fa-crown"></i>
                            <h5 className="package-name">الأطفــــال</h5>
                            <span className="package-ele"
                            ><i className="fa-solid fa-circle-check"></i
                            ><span>0 - 2 سنـــوات ( مجــــــــــانا ).</span></span
                            >
                            <span className="package-ele"
                            ><i className="fa-solid fa-circle-check"></i
                            ><span>3 - 11 سنـــوات.</span></span
                            >
                            <div className="package-price">
                                250<span className="icon-saudi_riyal"></span>
                            </div>
                        </div>
                        <div className="package-item">
                            <i className="fa-solid fa-circle-star"></i>
                            <h5 className="package-name">الغرفة الثلاثيـــة</h5>
                            <span className="package-ele"
                            ><i className="fa-solid fa-circle-check"></i
                            ><span>0 - 2 سنـــوات ( مجــــــــــانا ).</span></span
                            >
                            <span className="package-ele"
                            ><i className="fa-solid fa-circle-check"></i
                            ><span>3 - 11 سنـــوات.</span></span
                            >
                            <div className="package-price">
                                650<span className="icon-saudi_riyal"></span>
                            </div>
                        </div>
                        <div className="package-item">
                            <i className="fa-solid fa-fire"></i>
                            <h5 className="package-name">الغرفة الثنـــائية</h5>
                            <span className="package-ele"
                            ><i className="fa-solid fa-fire"></i
                            ><span>0 - 2 سنـــوات ( مجــــــــــانا ).</span></span
                            >
                            <span className="package-ele"
                            ><i className="fa-solid fa-circle-check"></i
                            ><span>3 - 11 سنـــوات.</span></span
                            >
                            <div className="package-price">
                                750<span className="icon-saudi_riyal"></span>
                            </div>
                        </div>
                        <div className="package-item">
                            <i className="fa-solid fa-bolt"></i>
                            <h5 className="package-name">الغرفة المستقلة</h5>
                            <span className="package-ele"
                            ><i className="fa-solid fa-circle-check"></i
                            ><span>0 - 2 سنـــوات ( مجــــــــــانا ).</span></span
                            >
                            <span className="package-ele"
                            ><i className="fa-solid fa-circle-check"></i
                            ><span>3 - 11 سنـــوات.</span></span
                            >
                            <div className="package-price">
                                900<span className="icon-saudi_riyal"></span>
                            </div>
                        </div>
                    </div>
                    <a href="#" className="custom-link"
                    ><span>أحصل على بـــاقتك الان</span>
                        <i className="fa-brands fa-whatsapp"></i
                        ></a>
                </div>
            </section>

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

            <Footer />
        </section>
    )
}

export default Hotels
