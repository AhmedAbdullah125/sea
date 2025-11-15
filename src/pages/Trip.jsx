import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import pay1img from '../../public/app/01.svg'
import pay2img from '../../public/app/02.svg'
import pay3img from '../../public/app/03.svg'
import pay4img from '../../public/app/04.svg'
import pay5img from '../../public/app/05.svg'
import PackageHeader from '../components/package/PackageHeader'
import PackagePrice from '../components/package/PackagePrice'
const Trip = () => {
    const payimggs = [pay1img, pay2img, pay3img, pay4img, pay5img]
    return (
        <section>
            <Header />
            {/* Start Page Content */}
            <PackageHeader />
            {/* End Page Content */}

            {/* package-section */}
            <PackagePrice   />
            {/* pay-section */}
            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">الدفع !</h6>
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
                    <h6 className="package-head">تفـــاصيل البـاقة !</h6>
                    <h3 className="package-title">وش نــوفر لك في الرحلــــة</h3>
                    <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
                </div>
            </section>

            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">ماذا يوجد في الباقة !</h6>
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
