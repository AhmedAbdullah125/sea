import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import p1 from '../assets/housing/p1.svg'
import p2 from '../assets/housing/p2.svg'
import p3 from '../assets/housing/p3.svg'
import p4 from '../assets/housing/p4.svg'
import p5 from '../assets/housing/p5.svg'
import p6 from '../assets/housing/p6.svg'
import detail0 from '../assets/housing/det0.jpg'
import detail1 from '../assets/housing/det1.jpg'
import detail2 from '../assets/housing/det2.jpg'
import detail4 from '../assets/housing/house-icon.svg'
const AddHouse = () => {


    return (
        <section>
            <Header />
            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">أنشر الان !.</h6>
                    <h3 className="package-title">كيف تنشــــر في ســي</h3>
                    <p className="package-text">أنشر وأضف مصدر دخل جديـــد !.</p>
                    <div className="publishing-features">
                        <div className="publish-item">
                            <figure><LazyLoadImage src={p1} alt="icon" /></figure>
                            <span>ضــف تفاصيــل سكنك.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src={p2} alt="icon" /></figure>
                            <span>حدد السعــــر و الشروط.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src={p3} alt="icon" /></figure>
                            <span>أكثر من 500k نصف مليون زائــــــــر.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src={p4} alt="icon" /></figure>
                            <span>إحصـــل على مستحقــــاتك.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src={p5} alt="icon" /></figure>
                            <span>إستمتع بنمو دخــــل إضــــافي.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src={p6} alt="icon" /></figure>
                            <span>موافقة ضمـــــــان ســـــي.</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">تفاصيل ادق !.</h6>
                    <h3 className="package-title">وش نقدم لك في منصة ســـي</h3>
                    <p className="package-text">أنشر وأضف مصدر دخل جديـــد !.</p>
                    <div className="offer-cont">
                        <div className="offer-item">
                            <figure className="offer-img">
                                <img src={detail0} alt="" />
                            </figure>
                            <div className="offer-content">
                                <h3 className="offer-head">دخــل إضــافي بمجهـــود بسيـــط !</h3>
                                <p className="offer-pargh">
                                    من خلال هذا الموقع، تقدر تضيف سكنك بكل سهولة وتخليه متاح للكراء
                                    أو المشاركة. سواء كان عندك شقة، غرفة، أو حتى دار كاملة، تقدر
                                    تحقق دخل إضافي بدون تعقيدات. ما تحتاجش تكون خبير، فقط صوّر
                                    السكن، حمّل الصور، وحدد التفاصيل، والباقي علينا!
                                </p>
                            </div>
                        </div>
                        <div className="offer-item">
                            <figure className="offer-img">
                                <img src={detail1} alt="" />
                            </figure>
                            <div className="offer-content">
                                <h3 className="offer-head">ضمــــــــان سي</h3>
                                <p className="offer-pargh">
                                    من خلال هذا الموقع، تقدر تضيف سكنك بكل سهولة وتخليه متاح للكراء
                                    أو المشاركة. سواء كان عندك شقة، غرفة، أو حتى دار كاملة، تقدر
                                    تحقق دخل إضافي بدون تعقيدات. ما تحتاجش تكون خبير، فقط صوّر
                                    السكن، حمّل الصور، وحدد التفاصيل، والباقي علينا!
                                </p>
                            </div>
                        </div>
                        <div className="offer-item">
                            <figure className="offer-img">
                                <img src={detail2} alt="" />
                            </figure>
                            <div className="offer-content">
                                <h3 className="offer-head">حمـــاية لممتلكاتك</h3>
                                <p className="offer-pargh">
                                    من خلال هذا الموقع، تقدر تضيف سكنك بكل سهولة وتخليه متاح للكراء
                                    أو المشاركة. سواء كان عندك شقة، غرفة، أو حتى دار كاملة، تقدر
                                    تحقق دخل إضافي بدون تعقيدات. ما تحتاجش تكون خبير، فقط صوّر
                                    السكن، حمّل الصور، وحدد التفاصيل، والباقي علينا!
                                </p>
                            </div>
                        </div>
                    </div>
                    <a href={`https://wa.me/+201068389295?text=Hello, I am interested to add my house`} className="custom-link housing-ancor"
                    ><span>أسجل سكنك الان</span> <img src={detail4} alt="house" /></a>
                </div>
            </section>
            <Footer />
        </section>
    )
}

export default AddHouse
