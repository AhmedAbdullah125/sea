import React, { useState, useEffect } from 'react'

const HotelPayment = ({ data }) => {
    console.log(data);

    return (
        <section className='hotel-payment-section'>
            <div className="price-discount">
                <div className="r-side">
                    <p className='price-details'>
                        <span className='old-price'>
                            {Number(data?.price) * (Number(data.discount) + 100) / 100}
                        </span>
                        <span className='new-price'>
                            {Number(data?.price)}
                        </span>
                        <div className="rs-t">
                            <span className='icon-saudi_riyal'></span> / لليلة الواحــــدة
                        </div>
                    </p>
                    <p className='total-price'>إجمالي ليلة واحدة {Number(data?.price).toFixed(2)} ر.س</p>
                </div>
                <div className="l-side">
                    <span className='discount'>
                        خصم %{Number(data?.discount).toFixed(0) || 0}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default HotelPayment
