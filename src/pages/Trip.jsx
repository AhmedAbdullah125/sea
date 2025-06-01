import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import img1 from '../assets/detail.jpg'
import imgicon1 from '../assets/imgIcon-1.svg'
import imgicon2 from '../assets/imgIcon-2.svg'
import pay1img from '../assets/pay-img/01.svg'
import pay2img from '../assets/pay-img/02.svg'
import pay3img from '../assets/pay-img/03.svg'
import pay4img from '../assets/pay-img/04.svg'
import pay5img from '../assets/pay-img/05.svg'
const Trip = () => {
    const payimggs = [pay1img, pay2img, pay3img, pay4img, pay5img]
    return (
        <section>
            <Header />
            {/* Start Page Content */}
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
                        {[...Array(5)].map((_, idx) => (
                            <div className="detail-box" key={idx}>
                                <figure className="detail-img">
                                    <img src={img1} className="img-fluid" alt="detail-img" />
                                </figure>
                                {idx === 0 && (
                                    <div className="detail-img-btn">
                                        <button className="add-btn">
                                            <img src={imgicon1} alt="icon" />
                                        </button>
                                        <button className="add-btn">
                                            <img src={imgicon2} alt="icon" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* End Page Content */}

            {/* package-section */}
            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">البـــاقة !.</h6>
                    <h3 className="package-title">أسعــــــار البــاقة</h3>
                    <p className="package-text">قد تكون هذه البـــاقة ممتعةً لك !</p>
                    <div className="package-cont">
                        {/* Repeatable Items */}
                        {[
                            { icon: "fa-crown", name: "الأطفــــال", price: 250 },
                            { icon: "fa-circle-star", name: "الغرفة الثلاثيـــة", price: 650 },
                            { icon: "fa-fire", name: "الغرفة الثنـــائية", price: 750 },
                            { icon: "fa-bolt", name: "الغرفة المستقلة", price: 900 },
                        ].map((item, i) => (
                            <div className="package-item" key={i}>
                                <i className={`fa-solid ${item.icon}`}></i>
                                <h5 className="package-name">{item.name}</h5>
                                <span className="package-ele">
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>0 - 2 سنـــوات ( مجــــــــــانا ).</span>
                                </span>
                                <span className="package-ele">
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>3 - 11 سنـــوات.</span>
                                </span>
                                <div className="package-price">
                                    {item.price}<span className="icon-saudi_riyal"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#" className="custom-link">
                        <span>أحصل على بـــاقتك الان</span>
                        <i className="fa-brands fa-whatsapp"></i>
                    </a>
                </div>
            </section>

            {/* pay-section */}
            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">الدفع !.</h6>
                    <h3 className="package-title">نوفـــر لك أفضــل وســـائل الدفع</h3>
                    <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                </div>
                <div className="pay-cont">
                    {payimggs.map((n, i) => (
                        <div className="pay-item" key={i}>
                            <img src={n} alt="pay-img" />
                        </div>
                    ))}
                </div>
            </section>

            {/* package-detail-section */}
            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">تفـــاصيل البـاقة !.</h6>
                    <h3 className="package-title">وش نــوفر لك في الرحلــــة</h3>
                    <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                </div>
            </section>

            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">ماذا يوجد في الباقة !.</h6>
                    <h3 className="package-title">تشمل البــــــاقة</h3>
                    <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                    <div className="package-list">
                        <ul>
                            {[
                                ["fa-house", "الإقامة فندقية 7 ليالي."],
                                ["fa-mug-hot", "شامل الإفطار."],
                                ["fa-eye", "زيارة متحف اللوفر."],
                                ["fa-cart-shopping", "رحلة إلى السوق التقليدي."],
                                ["fa-pot-food", "وجبة العشاء."],
                                ["fa-hand-wave", "الاستقبال والتوديع بالمطار."],
                                ["fa-city", "جولة سياحية في المدينة."],
                                ["fa-heart", "تأمين صحي للسفر."],
                            ].map(([icon, text], idx) => (
                                <li key={idx}>
                                    <i className={`fa-solid ${icon}`}></i>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            {/* package-detail-section */}

            <Footer />
        </section>
    )
}

export default Trip
