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
        <section class="content-section">
            <div class="grid-cont">

                {
                    hotels.map((item, index) => (
                        <div class="trip-item" key={index}>
                            <div class="trip-img">
                                <figure>
                                    <img src={item} alt="img" />
                                </figure>
                                <button class="fav-btn">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                            <div class="card-content">
                                <div class="detail-flex">
                                    <div class="detail-period">جولة لمدة 06 أيــــام</div>
                                    <div class="detail-info-item rate">
                                        <i class="fa-solid fa-star"></i>
                                        <span>5.0 <span>( 500+ )</span></span>
                                    </div>
                                </div>
                                <div class="card-item-name">مدريــــــد - برشلـــونة</div>
                                <div class="card-place">سارية في 22 نوفمبر 2025</div>
                                <div class="item-price">
                                    EUR 999
                                    <span class="period"><span>/</span> للشخص الواحد</span>
                                </div>
                                <div class="item-btn">
                                    <a href="#" class="book-ancor">إحجـــز رحلتك الان</a>
                                    <a href="#" class="book-flight"
                                    ><img src={plane} alt="icon"
                                        /></a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PackagesGrid
