import React from 'react'
import pay1img from '../../assets/pay-img/01.svg'
import pay2img from '../../assets/pay-img/02.svg'
import pay3img from '../../assets/pay-img/03.svg'
import pay4img from '../../assets/pay-img/04.svg'
import pay5img from '../../assets/pay-img/05.svg'
const EventFacilities = () => {
    const payimggs = [pay1img, pay2img, pay3img, pay4img, pay5img]
    return (
        <div className="">
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
        </div>


    )
}

export default EventFacilities
