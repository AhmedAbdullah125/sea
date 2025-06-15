import React, { useContext, useState } from 'react'
import img1 from '../../assets/s.svg'
import img2 from '../../assets/check.svg'
import { userContext } from '../../context/UserContext';
const HotelBook = ({ data }) => {
    const { token } = useContext(userContext);
    console.log(token);
    
    return (
        <section className="content-section">
            <div className="container">
                <div className="damans">
                    <div className="daman">
                        <div className="r-side">
                            <div className="img-cont">
                                <img src={img1} alt="" />
                            </div>
                            <div className="info">
                                <h3>ضمــــــــان سي / SEA. <img src={img2} alt="" /></h3>
                                <span>نضمن لك صحة المعلومات ونظافة المكان</span>
                            </div>
                        </div>
                        <div className="l-side">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                    </div>
                    <div className="daman">
                        <div className="r-side">
                            <div className="name-cont">
                                {/* first letter of the name */}
                                {data.ownerName.slice(0, 1)}
                            </div>
                            <div className="info">
                                <h3>{data.ownerName} <img src={img2} alt="" /></h3>
                                <div className="dets"><p><i className="fa-solid fa-star"></i> <span>{Number(data.ownerRating).toFixed(1)}</span></p> <div className="fasel"> <p><i className="fa-solid fa-house"></i> <span>{data.rentalPeriod}</span></p></div></div>
                            </div>
                        </div>
                        <div className="l-side">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HotelBook
