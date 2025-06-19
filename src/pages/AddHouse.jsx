import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
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
                            <figure><img src="assets/p1.svg" alt="icon" /></figure>
                            <span>ضــف تفاصيــل سكنك.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src="assets/p2.svg" alt="icon" /></figure>
                            <span>حدد السعــــر و الشروط.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src="assets/p3.svg" alt="icon" /></figure>
                            <span>أكثر من 500k نصف مليون زائــــــــر.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src="assets/p4.svg" alt="icon" /></figure>
                            <span>إحصـــل على مستحقــــاتك.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src="assets/p5.svg" alt="icon" /></figure>
                            <span>إستمتع بنمو دخــــل إضــــافي.</span>
                        </div>
                        <div className="publish-item">
                            <figure><img src="assets/p6.svg" alt="icon" /></figure>
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
                                <img src="assets/detail.jpg" alt="" />
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
                                <img src="assets/detail.jpg" alt="" />
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
                                <img src="assets/detail.jpg" alt="" />
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
                    <a href="#" className="custom-link housing-ancor"
                    ><span>أسجل سكنك الان</span> <img src="assets/house-icon.svg" alt="house" /></a>
                </div>
            </section>
            <Footer />
        </section>
    )
}

export default AddHouse
