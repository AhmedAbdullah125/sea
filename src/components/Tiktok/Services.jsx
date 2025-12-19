import organizingIcon from "../../../public/app/organizing.svg"
import vipIcon from "../../../public/app/vip.svg"
import welcomingIcon from "../../../public/app/welcoming.svg"
import bookingIcon from "../../../public/app/booking.svg"
import toursIcon from "../../../public/app/tours.svg"
import visasIcon from "../../../public/app/visas.svg"
import religiousIcon from "../../../public/app/religious.svg"
import transportationIcon from "../../../public/app/transportation.svg"
import { Link } from "react-router-dom"

export default function TikTokServices() {
    const servicesData = [
        {
            id: 1,
            icon: organizingIcon,
            title: 'تنظيــــــم الرحـــــلات السياحيــــــة ..',
            description: 'باقات سياحية تناسب جميع الأذواق والميزانيات، تشمل رحلات إلى الوجهة السياحية واستكشافها.'
        },
        {
            id: 2,
            icon: welcomingIcon,
            title: 'الاستقبــــــال والتوديـــــــع ..',
            description: 'خدمة عالية من واعي جميع المطارات مع سائقين محترفين.'
        },
        {
            id: 3,
            icon: bookingIcon,
            title: 'الحجــــــز الفندقــــــي والكواليــه ..',
            description: 'حجزات فنادق واستضافة، من 5 نجوم إلى عروض خاصة على طوال العام الباسعة.'
        },
        {
            id: 4,
            icon: toursIcon,
            title: 'الجـــــولات الخاصــــــة ..',
            description: 'جولات متخصصة حسب احتياجاتك، مع مرشدين سياحيين من تجربة فريدة ومباشرة.'
        },
        {
            id: 5,
            icon: visasIcon,
            title: 'إصــــــدار التأشيـــــــرات ..',
            description: 'أحدث الاستشادات و التسهيل في إجراءات الحصول على المتابين.'
        },
        {
            id: 6,
            icon: religiousIcon,
            title: 'الرحـــــــــلات الدينيـــــــة ..',
            description: 'تنظيم جي وشامل مع إرشاد ديني وتدبيرة روحانية مميزة.'
        },
        {
            id: 7,
            icon: transportationIcon,
            title: 'النقــــــل والمواصــــــلات ..',
            description: 'أسطول نقل مع سائقين محترفين وذوات خاصة ومريحة.'
        },
        {
            id: 8,
            icon: vipIcon,
            title: 'خدمـــــــات الأعمــــــال (VIP) ..',
            description: 'تجربة فاخرة تشمل الإقامة، والمواعات الخاصة مع سائقين شخصيين.'
        }
    ]

    return (
        <div className="why-services ">
            <div className="container">
                <div className="services-header tiktok-body-form-header">
                    <div className="text">
                        <h2>مزايــــــا الحجـــز مـــع <span>ســـــــــــــــي</span> !</h2>
                        <p>نقدم لك مزايا فريدة لتجربة سياحية استثنائية ومريحة.</p>
                    </div>
                    <Link to={"/sea-plus-offers"} className="about-btn">
                        <span>إكتشف عروضنــا</span>
                        <div className="i-cont">
                            <i class="fa-solid fa-arrow-left"></i>
                        </div>
                    </Link>
                </div>

                <div className="services-grid">
                    {servicesData.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon">
                                <img src={service.icon} alt={service.title} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
