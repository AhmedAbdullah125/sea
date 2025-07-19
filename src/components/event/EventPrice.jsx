import React from 'react'
const EventPrice = () => {
    return (
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
                                {item.price} <span> {item.currencyName}</span>
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
    )
}

export default EventPrice
