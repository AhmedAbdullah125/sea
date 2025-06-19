import React, { useState, useEffect } from 'react'
import plane from '../../assets/housing/plane-icon.svg'
import hotel1 from '../../assets/hotels/1.png'
import hotel2 from '../../assets/hotels/2.png'
import hotel3 from '../../assets/hotels/3.png'
import hotel4 from '../../assets/hotels/4.png'
import hotel5 from '../../assets/hotels/5.png'
import hotel6 from '../../assets/hotels/6.png'
import hotel7 from '../../assets/hotels/7.png'
import hotel8 from '../../assets/hotels/8.png'
const PackagesGrid = () => {

    const hotels = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8]
    return (
        <section className="content-section">
            <div className="grid-cont">

                {
                    hotels.map((item, index) => (
                        <div className="trip-item" key={index}>
                            <div className="trip-img">
                                <figure>
                                    <img src={item} alt="img" />
                                </figure>
                                <button className="fav-btn">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                            </div>
                            <a href={`package?id=${index + 1}`} className="card-content">
                                <div className="detail-flex">
                                    <div className="detail-period">جولة لمدة 06 أيــــام</div>
                                    <div className="detail-info-item rate">
                                        <i className="fa-solid fa-star"></i>
                                        <span>5.0 <span>( 500+ )</span></span>
                                    </div>
                                </div>
                                <div className="card-item-name">مدريــــــد - برشلـــونة</div>
                                <div className="card-place">سارية في 22 نوفمبر 2025</div>
                                <div className="item-price">
                                    EUR 999
                                    <span className="period"><span>/</span> للشخص الواحد</span>
                                </div>
                                <div className="item-btn">
                                    <a href="#" className="book-ancor">إحجـــز رحلتك الان</a>
                                    <a href="#" className="book-flight"
                                    ><img src={plane} alt="icon"
                                        /></a>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PackagesGrid
