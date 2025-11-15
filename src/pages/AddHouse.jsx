import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import p1 from '../../public/app/p1.svg'
import p2 from '../../public/app/p2.svg'
import p3 from '../../public/app/p3.svg'
import p4 from '../../public/app/p4.svg'
import p5 from '../../public/app/p5.svg'
import p6 from '../../public/app/p6.svg'
import detail4 from '../../public/app/house-icon.svg'
import offer_d from '../../public/app/offer_d.svg'
import offer_tr from '../../public/app/offer_tr.svg'
import offer_m from '../../public/app/offer_m.svg'
import AppSection from '../components/home/appSection/AppSection'
import { useGetSettings } from '@/components/global/useGetSettings';
import { Link } from 'react-router-dom'

const AddHouse = () => {

    const { data } = useGetSettings();

    return (
        <section>
            <Header />
            <section className="package-section">
                <div className="container">
                    <h6 className="package-head">أنشر الان !</h6>
                    <h3 className="package-title">كيف تنشــــر في ســي</h3>
                    <p className="package-text">أنشر وأضف مصدر دخل جديـــد !</p>
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
                            <span>احصـــل على مستحقــــاتك.</span>
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
                    <h6 className="package-head">تفاصيل ادق !</h6>
                    <h3 className="package-title">وش نقدم لك في منصة ســـي</h3>
                    <p className="package-text">أنشر وأضف مصدر دخل جديـــد !</p>
                    <Link to={`/add-steps`} className="custom-link housing-ancor" ><span>سجل سكنك الان</span> <img src={detail4} alt="house" /></Link>
                    <div className="offer-cont">
                        <div className="offer-item">
                            <div className="icon-cont">
                                <img src={offer_d} alt="sea" />
                            </div>
                            <h4>دخــل إضــافي بمجهـــود بسيـــط !</h4>
                            <p>أضف سكنك بسهولة على الموقع وابدأ تحقق دخل إضافي، سواء عندك شقة أو غرفة أو بيت كامل، بدون خبرة ولا تعقيدات — صوّر، أضف التفاصيل، والباقي علينا.</p>
                        </div>
                        <div className="offer-item">
                            <div className="icon-cont">
                                <img src={offer_tr} alt="sea" />
                            </div>
                            <h4>ضمـــــــــــان سي / SEA !</h4>
                            <p>أضف سكنك بسهولة على الموقع وابدأ تحقق دخل إضافي، سواء عندك شقة أو غرفة أو بيت كامل، بدون خبرة ولا تعقيدات — صوّر، أضف التفاصيل، والباقي علينا.</p>
                        </div>
                        <div className="offer-item">
                            <div className="icon-cont">
                                <img src={offer_m} alt="sea" />
                            </div>
                            <h4>حمـــاية كــاملة لممتلكاتك !</h4>
                            <p>أضف سكنك بسهولة على الموقع وابدأ تحقق دخل إضافي، سواء عندك شقة أو غرفة أو بيت كامل، بدون خبرة ولا تعقيدات — صوّر، أضف التفاصيل، والباقي علينا.</p>
                        </div>

                    </div>

                </div>
            </section>
            <AppSection />

            <Footer />
        </section>
    )
}

export default AddHouse
