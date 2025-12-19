import { Link } from "react-router-dom"

export default function SeaPlusPlans() {
    const plans = [
        {
            id: 'elite',
            name: 'عضوية Sea Elite+',
            price: '10,000$',
            features: {
                cashback: '100$',
                airportReception: 'مرة واحدة',
                freeFarewell: 'مرة واحدة',
                simAllowance: '---',
                serviceUpgrade: 'مرة/سنتين',
                freeNight: '---',
                roomUpgrade: true,
                tourismPackages: true
            }
        },
        {
            id: 'prime',
            name: '🟣 عضوية Sea Prime',
            price: '20,000$',
            features: {
                cashback: '250$',
                airportReception: 'مرتين',
                freeFarewell: 'مرتين',
                simAllowance: '7 أيام',
                serviceUpgrade: 'مرة سنوياً',
                freeNight: 'مرة كل سنتين',
                roomUpgrade: true,
                tourismPackages: true
            }
        },
        {
            id: 'explorer',
            name: ' 🟡 عضوية Sea Explorer',
            price: '40,000$',
            features: {
                cashback: '500$',
                airportReception: 'غير محدود',
                freeFarewell: 'غير محدود',
                simAllowance: '(14-30) يوم',
                serviceUpgrade: 'فئة Elite (مرة سنوياً)',
                freeNight: 'مرة سنوياً',
                roomUpgrade: true,
                tourismPackages: true
            }
        }
    ]

    const featureLabels = [
        { key: 'price', label: 'حد السفر الأقصى:' },
        { key: 'cashback', label: 'كاش باك (Cashback):' },
        { key: 'airportReception', label: 'استقبال المطار' },
        { key: 'freeFarewell', label: 'توديع مجاني' },
        { key: 'simAllowance', label: 'ميزانية SIM' },
        { key: 'serviceUpgrade', label: 'ترقية الخدمة نفسها ومجانية' },
        { key: 'freeNight', label: 'ليلة مجانية' },
        { key: 'roomUpgrade', label: 'ترقية الغرف' },
        { key: 'tourismPackages', label: 'الباقات السياحية' },

    ]

    return (
        <div className="sea-plus-plans">
            <div className="container">
                <div className="plans-header">
                    <div className="r-side">
                        <h2>اختـــــر الخطة الأنسب لك !</h2>
                        <p>+ عضوية Sea</p>
                    </div>
                    <Link to="/sea-plus-offers" className="about-btn">
                        <span>إكتشف عروضنــا</span>
                        <div className="i-cont">
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>
                    </Link>
                </div>

                <div className="plans-table">
                    <div className="table-header">
                        <div className="feature-column">
                            <span>المزايــــا :</span>
                        </div>
                        {plans.map((plan) => (
                            <div key={plan.id} className={`plan-column ${plan.id}`}>
                                <h3>{plan.name}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="table-body">
                        {featureLabels.map((feature, index) => (
                            <div key={feature.key} className="table-row">
                                <div className="feature-label">
                                    {feature.label}
                                </div>
                                {plans.map((plan) => (
                                    <div key={`${plan.id}-${feature.key}`} className="feature-value">
                                        {feature.key === 'price' ? (
                                            <span className="price">{plan.price}</span>
                                        ) : feature.key === 'roomUpgrade' || feature.key === 'tourismPackages' ? (
                                            plan.features[feature.key] ? (
                                                <i className="fa-solid fa-circle-check check-icon"></i>
                                            ) : (
                                                <span>---</span>
                                            )
                                        ) : (
                                            <span>{plan.features[feature.key]}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}