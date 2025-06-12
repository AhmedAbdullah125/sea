import React from 'react'
import pay1img from '../../assets/pay-img/01.svg'
import pay2img from '../../assets/pay-img/02.svg'
import pay3img from '../../assets/pay-img/03.svg'
import pay4img from '../../assets/pay-img/04.svg'
import pay5img from '../../assets/pay-img/05.svg'
const EventPayments = () => {
    const payimggs = [pay1img, pay2img, pay3img, pay4img, pay5img]
    return (
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


    )
}

export default EventPayments
